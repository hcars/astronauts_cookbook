
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import dayOfYear from 'dayjs/plugin/dayOfYear'
import {Table, TableCell, TableRow } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import '../App.css';
import { useEffect, useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

dayjs.extend(dayOfYear);
dayjs.extend(utc);

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
        <Table>
          <TableRow>
            <TableCell>
          <TimePicker
            label="Local"
            value={userTime}
            onChange={(newTime) => setUserTime(newTime)}
            defaultValue={dayjs()}
            format='hh:mm:ss'
            timezone={"system"}
            ampm={false}
          />
          </TableCell>
          <TableCell>
          <TimePicker
            label="Zulu"
            value={userTime}
            onChange={(newTime) => setUserTime(newTime)}
            defaultValue={dayjs()}
            format='hh:mm:ss'
            timezone={'UTC'}
            ampm={false}
          />
          </TableCell>
          </TableRow>
        </Table>
      </div>
    );
  }


  export default ZuluTimeCalculator;