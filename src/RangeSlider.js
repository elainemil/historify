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
  
  export default function RangeSlider(props) {
    const [checked, setChecked] = React.useState(true);
    const [selected, setArr] = React.useState(props.arr);
    let albums = [];

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  React.useEffect( () => {
    setArr(props.arr);
}, [props.arr]);

  
    
    
    const [value, setValue] = React.useState([props.low, props.high]);
    //const initArray = Array(125).fill(null);
    let decades = [12];
    
    const [style, setStyle] = React.useState({id: -1, display: 'none'});

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const removeAlbum = (i) => {
      if(i === -1){
        console.log("in the clear");
        for(let i = 0; i < 125; i++){
          selected[i] = null;
        }
      }
      else{
        selected[i] = null;
      }
      setStyle({id: i, display: 'none'});
    }

    let min = value[0]-1900;
    let max = value[1]-1900;
    let startRow = min-(min%10);
    let endRow = max+(10-(max%10));
    for(let i = startRow; i < min; i++){
        albums[i] = <div class="yearEntry"><div class="emptyBox"></div><div></div></div>;
    }
    for(let i = min; i <= max; i++){
        albums.push(<div class="yearEntry" onMouseEnter={e => {
          setStyle({id: i, display: 'block'});
      }}
      onMouseLeave={e => {
          setStyle({id: i, display: 'none'});
      }}
      ><div class="albumBox">{selected[i] !== null ? <a href={selected[i] !== null ? selected[i].uri : ""}><img class="albumImg" src={selected[i].images[0].url}></img></a> : <br></br>}</div><div>{checked ? <b class="yearTag">{i+1900}</b> : ''}</div>
      {style.id === i && selected[i] !== null ? <button class="yearDelete" style={style} onClick={() => { removeAlbum(i)}}></button> : <br></br>}</div>);
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
          
          Showing albums from <b id="lowBound">{value[0]}</b> to <b id="highBound">{value[1]}</b>.
          <div>
          <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheck}/>} label="Show year labels" />
          </div>
          <button class="clearButton" onClick={() => { removeAlbum(-1)}}>Clear Chart</button>
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