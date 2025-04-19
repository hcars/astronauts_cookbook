//App.js

import axios from 'axios';
import CoordinateConverter from "./calcalutorComponents/coordinates"
import ZuluTimeCalculator from './calcalutorComponents/zuluTimeCalculator';
import JDayCalculator from './calcalutorComponents/jdayCalculator';
import RadarEquation from './calcalutorComponents/radarEq';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Select, MenuItem } from '@mui/material';
import {  LocalizationProvider} from '@mui/x-date-pickers';
import './App.css';
import {  useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';








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
      onChange={(e) => props.setCurrSelected(e.target.value)}
     >
      <MenuItem value={"jday"}>JDayCalculator</MenuItem>
      <MenuItem value={"zulu"}>Zulu Time Converter</MenuItem>
      <MenuItem value={"dms2dec"}>Lat Long Converter</MenuItem>
      <MenuItem value={'radarEq'}>Radar Equation</MenuItem>
    </Select>
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
    case "radarEq":
      return <RadarEquation/>;
    default:
      return null
  }
}

function App() {
  const [currSelected, setCurrSelected] = useState(undefined);

  
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="App">
      <header className="App-header">

      <SelectFeature currSelected={currSelected} setCurrSelected={setCurrSelected}/>

      
      </header>
      <div className='App-body'>

      {getCalculator(currSelected)}
      </div>
    </div>
    </LocalizationProvider>
  );
}

export default App;