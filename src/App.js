//App.js

import axios from 'axios';
import dayjs from 'dayjs';
import logo from "./galaxy-view-svgrepo-com.svg"
import utc from 'dayjs/plugin/utc';
import CoordinateConverter from "./coordinates"
import dayOfYear from 'dayjs/plugin/dayOfYear'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Select, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import './App.css';
import { useEffect, useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

dayjs.extend(dayOfYear);
dayjs.extend(utc);






//data will be the string we send from our server
// const apiCall = () => {
//   axios.get('http://localhost:8080').then((data) => {
//     //this console.log will be in our frontend console
//     console.log(data)
//   })
// }
function SelectFeature(props){


  return (
  <div>
      <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={props.currSelected}
      label="Calculator Selection"
      defaultValue={"zulu"}
      onChange={(e) => props.setCurrSelected(e.target.value)}
     >
      <MenuItem value={"jday"}>JDayCalculator</MenuItem>
      <MenuItem value={"zulu"}>Zulu Time Converter</MenuItem>
      <MenuItem value={"dms2dec"}>Lat Long Converter</MenuItem>
      {/* <MenuItem value={30}>Thirty</MenuItem> */}
    </Select>
    </div>
  );
}


function ZuluTimeCalculator(){
  const [userTime, setUserTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => setUserTime(dayjs()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div className='Date-display'>
      <TimePicker
        label="Local"
        value={userTime}
        onChange={(newTime) => setUserTime(newTime)}
        defaultValue={dayjs()}
        format='hh:mm:ss'
        timezone={"system"}
        ampm={false}
      />
      <TimePicker
        label="Zulu"
        value={userTime}
        onChange={(newTime) => setUserTime(newTime)}
        defaultValue={dayjs()}
        format='hh:mm:ss'
        timezone={'UTC'}
        ampm={false}
      />
    </div>
  );
}

function JDayCalculator(){
  const [userDate, setUserDate] = useState(dayjs());



  return (
    <div>
      <DatePicker
        label="Current Gregorian Date"
        value={userDate}
        onChange={(newDate) => setUserDate(newDate)}
      />
      <p>{userDate.dayOfYear().toString().padStart(3, '0')}</p>
    </div>
  );
}

function getCalculator(currSelected){
  switch (currSelected) {
    case "jday":
      return <JDayCalculator/>
    case "zulu":
      return <ZuluTimeCalculator/>
    case "dms2dec":
      return <CoordinateConverter/>;
    default:
      return null
  }
}

function App() {
  const [currSelected, setCurrSelected] = useState(undefined);

  console.log(currSelected)
  
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="App">
      <header className="App-header">
      {/* <div className='App-logo'>
        <img src={logo}></img>
      </div> */}
      <SelectFeature currSelected={currSelected} setCurrSelected={setCurrSelected}/>

      
      </header>
      <div className='App-body'>
      {/* {currSelected === "jday" && <JDayCalculator/>}
      {currSelected === 'zulu' && <ZuluTimeCalculator/>}
      <CoordinateConverter/> */}
      {getCalculator(currSelected)}
      </div>
    </div>
    </LocalizationProvider>
  );
}

export default App;