import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import dayOfYear from 'dayjs/plugin/dayOfYear'
import { DatePicker} from '@mui/x-date-pickers';
import '../App.css';
import { useEffect, useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

dayjs.extend(dayOfYear);

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


  export default JDayCalculator;