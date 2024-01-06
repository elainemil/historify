import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import AlbumArray from './AlbumArray.js'
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

const initArray = Array(125).fill(null);



function valuetext(value) {
    return `${value}`;
  }
  
  export default function RangeSlider() {
    const [checked, setChecked] = React.useState(true);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
    
    
    const [value, setValue] = React.useState([1960, 2024]);
    //const initArray = Array(125).fill(null);
    let decades = [12];
    let albums = [];

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    let min = value[0]-1900;
    let max = value[1]-1900;
    let startRow = min-(min%10);
    let endRow = max+(10-(max%10));
    for(let i = startRow; i < min; i++){
        albums[i] = <div class="yearEntry"><div class="emptyBox"></div><div></div></div>;
    }
    for(let i = min; i <= max; i++){
        albums.push(<div class="yearEntry"><div class="albumBox"></div><div>{checked ? <b>{i+1900}</b> : ''}</div></div>);
    }
    for(let i = max+1; i < endRow; i++){
        albums[i] = <div class="yearEntry"><div class="emptyBox"></div><div></div></div>;
    }
  
    return (
      <Box sx={{ width: 1200 }}>
          
          <div class="sliderContainer">
          <h1>Welcome to Historify!</h1>
        <h2>Pick your favorite album of each year:</h2>
          <div class="caption">
          
          Showing albums from {value[0]} to {value[1]}.
          <div>
          <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheck}/>} label="Show year labels" />
          </div>
        </div>
        <Slider
          getAriaLabel={() => 'Date range'}
          value={value}
          min={1900}
          max={2024}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
        </div>
          <div class="albumsContainer"><div>{albums}</div></div>
      </Box>
    );
  }