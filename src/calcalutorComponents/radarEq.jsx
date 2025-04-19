import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 100px;
`;

function InputSlider({paramName, value, setValue}) {
  const MAX = 100000;
  const MIN = 0;



  const handleInputChange = (event) => {
    if (event.target.value !== ''){
        setValue(Number(event.target.value))
    }
  };



  return (
    <Box sx={{ width: 400 }}>
      <Typography id="input-slider" gutterBottom>
        {paramName}
      </Typography>
        <Grid>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 1,
              min: MIN,
              max: MAX,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
    </Box>
  );
}

function RadarEquation(){
    const [powerTransmit, setPowerTransmit] = React.useState(0);
    const [gainTransmit, setGainTransmit] = React.useState(0);
    const [range, setRange] = React.useState(0);
    const [RCS, setRCS] = React.useState(0);
    const [powerAtRadar, setPowerAtRadar] = React.useState(0);
    const [affectiveReceiverArea, setAffectiveReceiverArea] = React.useState(0);

    const dBToLin = (db) => {return Math.pow(10, (db/ 10))}

    React.useEffect(
        ()=>{
            const freeSpaceLoss = (4 * Math.PI * range * range);
            const powerAtTarget = ((powerTransmit * dBToLin(gainTransmit)) / freeSpaceLoss) * RCS;
            const powerAtRecv = affectiveReceiverArea / freeSpaceLoss;
            setPowerAtRadar(powerAtTarget*powerAtRecv)
        },
        [powerTransmit, gainTransmit, range, RCS]
    )

    const identity = (val)=> val;


    return (
        <div>
            <InputSlider paramName={<p>P<sub>t</sub>  (W)</p>}   value={powerTransmit} setValue={setPowerTransmit}/>
            <InputSlider paramName={<p>G<sub>t</sub> (dB)</p> }  value={gainTransmit} setValue={setGainTransmit}/>
            <InputSlider paramName={<p>R (km)</p>}  value={range} setValue={setRange}/>
            <InputSlider paramName={<p>RCS (m<sup>2</sup>)</p>}  value={RCS} setValue={setRCS}/>
            <InputSlider paramName={<p>A<sub>e</sub> (m<sup>2</sup>)</p>} value={affectiveReceiverArea} setValue={setAffectiveReceiverArea}/>
            <Typography>
                <p>Power At Radar (W): {powerAtRadar}</p>
            </Typography>
        </div>
    );
}

export default RadarEquation;