import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import AlbumArray from './AlbumArray.js'
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import html2canvas from 'html2canvas';

import { FaTrashAlt, FaSearch, FaFileDownload, FaEdit } from "react-icons/fa";

/* source: https://www.robinwieruch.de/react-component-to-image/ */

const initArray = Array(125).fill(null);



// function SimpleDialog(props) {
//   const { onClose, selectedValue, open } = props;

//   const handleClose = () => {
//     onClose(selectedValue);
//   };

//   const handleListItemClick = (value) => {
//     onClose(value);
//   };

//   return (
//     <Dialog onClose={handleClose} open={open}>
//       <DialogTitle>In which year does this album belong?</DialogTitle>
//       {editId !== -1 ? <a href={albums[editId] !== null ? albums[editId].uri : ""}><img id="smallGrid" class="albumImg" src={albums[editId].images[0].url}></img></a> : <br></br>}
//       <FormControl sx={{ mt: 2, minWidth: 120 }}>
//               <Select
//                 autoFocus
//                 // onChange={setAlbumYear}
//                 value={editId+1900}
//                 inputProps={{
//                   name: 'max-width',
//                   id: 'max-width',
//                 }}
//               >
//                 <MenuItem value="1990">1990</MenuItem>
//                 <MenuItem value="1991">1991</MenuItem>
//                 <MenuItem value="1992">1992</MenuItem>
//                 <MenuItem value="1993">1993</MenuItem>
//                 <MenuItem value="1994">1994</MenuItem>
//               </Select>
//             </FormControl>
      
//     </Dialog>
//   );
// }

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };



function valuetext(value) {
    return `${value}`;
  }
  
  

  export default function RangeSlider(props) {
    const printRef = React.useRef();
    const [checked, setChecked] = React.useState(true);
    const [showList, setShowList] = React.useState(false);
    const [selected, setArr] = React.useState(props.arr);
    const [open, setOpen] = React.useState(false);
    let albums = [];
    let titles = [];

    // const handleClickOpen = (i) => {
    //   setOpen(true);
    //   editId = i;
    // };
  
    // const handleClose = (value) => {
    //   setOpen(false);
    // };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleShowList = (event) => {
    setShowList(event.target.checked);
  };

  React.useEffect( () => {
    setArr(props.arr);
}, [props.arr]);

  
const handleDownloadImage = async () => {
  setShowList(true);
  const element = printRef.current;
  const canvas = await html2canvas(element);

  html2canvas(document.body,
    {
    useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
    allowTaint: true,
    onrendered: function (canvas) {
      
     }
    });

    // document.getElementById("smallGrid").append(canvas);
  const data = canvas.toDataURL('historify/jpg');
  const link = document.createElement('a');

  if (typeof link.download === 'string') {
    link.href = data;
    link.download = 'historify.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(data);
  }
};


    
    const [value, setValue] = React.useState([props.low, props.high]);
    //const initArray = Array(125).fill(null);
    let decades = [12];
    
    const [style, setStyle] = React.useState({id: -1, display: 'none'});
    const [year, setYear] = React.useState(-1);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleBrowse = (y) => {
      console.log("BROWSE");
      if(document.getElementById("searchBar") !== null){
        console.log("BAR");
        document.getElementById("searchBar").value = "year:"+y;
      }
      setYear(y);
      // this.props.yearCallback("year:"+y);
    };

    const removeAlbum = (i) => {
      console.log("in remove function");
      if(i === -1){
        console.log("in the clear");
        for(let i = 0; i < 125; i++){
          selected[i] = null;
        }
      }
      else{
        console.log("in else");
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
          setStyle({id: -1, display: 'none'});
          /*setYear(-1);*/
          console.log(i);
      }}
      ><div class="albumBox">{selected[i] !== null ? <a href={selected[i] !== null ? selected[i].uri : ""}><img id="smallGrid" class="albumImg" src={selected[i].images[0].url}></img></a> : <br></br>}</div><div>{checked && style.id !== i ? <b class="yearTag">{i+1900}</b> : ''}</div>
      {/* {style.id === i && selected[i] === null ? <Tooltip title="Browse"
      placement="right"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset:  [91, -70],
              },
            },
          ],
        },
      }}><div style={style} onClick={() => { }}><FaSearch class="yearBrowse" /></div></Tooltip> : <br></br>} */}

{style.id === i  ? <button class="btn" onClick={props.setSearchKey("year:"+(i+1900))} type="submit"><FaSearch class="iconTagBr" onClick={() => { handleBrowse(i+1900)}}  /></button> : <br></br>}
{style.id === i && selected[i] !== null ? <button class="btn"><FaTrashAlt style={style} class="iconTagDel" onClick={() => { removeAlbum(i)}}/></button> : <br></br>}
{/* {style.id === i && selected[i] !== null ? <button class="btn"><FaEdit style={style} class="iconTagEdit" onClick={handleClickOpen(i)}/></button> : <br></br>} */}
      </div>);
    }
    for(let i = max+1; i < endRow; i++){
        albums[i] = <div class="yearEntry"><div class="emptyBox"></div><div></div></div>;
    }
    console.log(albums)
    console.log(selected)
    for(let i = min; i <= max; i++){
      if(selected[i] !== null){
      titles.push(<a class="listAlbums" href={selected[i].uri}><div>{i+1900}: {selected[i].artists[0].name} - {selected[i].name}</div></a>)
      }
      else{
        titles.push(<div>{i+1900}:</div>);
      }
    
    }
  
    return (
      <Box sx={{ width: 1200 }}>
          
          <div class="sliderContainer">
          <h1>Welcome to Historify!</h1>
        <h2>Pick your favorite album of each year</h2>
          <div class="caption">
          
          Showing albums from <b id="lowBound">{value[0]}</b> to <b id="highBound">{value[1]}</b>.
          <div>
          <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheck}/>} label="Show year labels" />
          <FormControlLabel control={<Checkbox checked={showList} onChange={handleShowList}/>} label="Show album titles" />
          </div>
          <div class="clearButton" onClick={() => { removeAlbum(-1)}}>Clear Chart <FaTrashAlt /></div><div class="downloadBtn" onClick={handleDownloadImage}>Save Image <FaFileDownload /></div>
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

        <div>
          <div id="bigGrid" class="grid"><div class="albumsContainer"><div>{albums}</div></div></div>
          {/* {year !== -1 ? <div id="year" >{year}</div> : <br></br>} */}
          <div ref={printRef}>{showList ? <div class="list"><b>{titles}</b><br></br></div> : <br></br>}</div>
        </div>
        {/* <SimpleDialog
        open={open}
        onClose={handleClose}
      /> */}

      </Box>
    );
  }