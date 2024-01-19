import logo from './logo.svg';
import './App.css';
import React from 'react';
import RangeSlider from './RangeSlider.js';
import { Tab, Tabs, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material/';
import { TabPanel, TabContext} from '@mui/lab/';
import './RangeSlider.css';
import axios from "axios";

/* source: https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn */

/*const RangeSlider = ({ min, max, value, step, onChange }) => {
  const [minValue, setMinValue] = React.useState(value ? value.min : min);
  const [maxValue, setMaxValue] = React.useState(value ? value.max : max);

  React.useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange = e => {
    e.preventDefault();
    const newMinVal = Math.min(+e.target.value, maxValue - step);
    if (!value) setMinValue(newMinVal);
    onChange({ min: newMinVal, max: maxValue });
  };

  const handleMaxChange = e => {
    e.preventDefault();
    const newMaxVal = Math.max(+e.target.value, minValue + step);
    if (!value) setMaxValue(newMaxVal);
    onChange({ min: minValue, max: newMaxVal });
  };

  const minPos = ((minValue - min) / (max - min)) * 124;
  const maxPos = ((maxValue - min) / (max - min)) * 124;

  return (
    <div class="wrapper">
      <div class="input-wrapper">
        <input
          class="input"
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          class="input"
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>

      <div class="control-wrapper">
        <div class="control" style={{ left: `${minPos}%` }} />
        <div class="rail">
          <div
            class="inner-rail" 
            style={{ left: `${minPos}%`, right: `${124 - maxPos}%` }}
          />
        </div>
        <div class="control" style={{ left: `${maxPos}%` }} />
      </div>
    </div>
  );
};

const SliderBar = () => {
  const [value, setValue] = React.useState({ min: 0, max: 124 });

  return (
    <div>
      <RangeSlider min={0} max={124} step={1} value={value} onChange={setValue} />
      <p>Showing albums from <span>{value.min + 1900}</span> to <span>{value.max + 1900}</span>.</p>
    </div>
  );
}*/



function App() {
  const CLIENT_ID = "3046f5477d6f4534bd1bedf8c4e61a38"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const SCOPE = "user-top-read"
const RESPONSE_TYPE = "token"

let low = document.getElementById("lowBound");
if(low === null){ low = 1960;}
else{low = parseInt(document.getElementById("lowBound").innerHTML);}
  
let high = document.getElementById("highBound");
if(high === null){ high = 2024;}
else{high = parseInt(document.getElementById("highBound").innerHTML);}
let years = [];
for(let i = 1900; i <= 2024; i++){
  years[i-1900] = i;
}

const listYears = years.map((d) => <button type="submit" onClick={e => setSearchKey("year:"+d)} class="yrList"><small><b><li>{d}</li></b></small></button>);


  const [value, setValue] = React.useState({ min: 0, max: 124 });
  const [token, setToken] = React.useState("");
  const [selected, setSelected] = React.useState(Array(125).fill(null));
  const [tempLineup, setTempLineup] = React.useState(Array(125).fill(null));
  let albumSet = true;

  
  

const handleCallback = (yearToSearch) => {
    this.setState({ year: yearToSearch });
};

    React.useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token);
        console.log(low);
        console.log(high);

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const [searchKey, setSearchKey] = React.useState("")
    const [albums, setAlbums] = React.useState([])
    const [tracks, setTracks] = React.useState([])

const searchAlbums = async (e) => {
  if(searchKey === ""){
    setAlbums([]);
  }
  // if(searchKey !== document.getElementById("searchBar").value){
  //   setSearchKey(document.getElementById("searchBar").value);
  // }
  else{
    e.preventDefault()
    
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "album"
        }
    })
    setAlbums(data.albums.items)
  }
}

const getTracks = async (e) => {
  // if(searchKey !== document.getElementById("searchBar").value){
  //   setSearchKey(document.getElementById("searchBar").value);
  // }
  console.log("TERM: " + term);
  e.preventDefault()
    if(term !== document.getElementById("term-select").value){
      console.log(document.getElementById("term-select"));
    }
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=" + term + "&limit=50&offset=0", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    setTracks(data.items)
    //console.log(tracks)
    var yrs = Array(125).fill(null);
    for(let i = 0; i < 50; i++){
      if(yrs[parseInt(tracks[i].album.release_date.substring(0, 4)) - 1900] === null){
        yrs[parseInt(tracks[i].album.release_date.substring(0, 4)) - 1900] = tracks[i].album;
        setAlbum(tracks[i].album)
      }
      else{
        var inArr = 0;
        var outArr = 0;
        for(let j = 0; j < 50; j++){
          if(tracks[j].album !== null && tracks[j].album.id === yrs[parseInt(tracks[i].album.release_date.substring(0, 4)) - 1900].id){
            inArr++;
          }
          if(tracks[j].album !== null && tracks[j].album.id === tracks[i].album.id){
            outArr++;
          }
        }
        if(outArr > inArr){
          setAlbum(tracks[i].album)
        }
        console.log(i + " out: " + outArr + " in: " + inArr)
      }
    }
    // for(let i = 0; i < 50; i++){
    //   if(tracks[i].album !== null){
    //     setAlbum(tracks[i].album)
    //   }
    // }
  
}




const setAlbum = (album) => {
  selected[parseInt(album.release_date.substring(0, 4)) - 1900] = album;
  setSelected(selected);
  //console.log(selected);
}

const [seed, setSeed] = React.useState(1);
       const reset = () => {
        low = parseInt(document.getElementById("lowBound").innerHTML);
        high = parseInt(document.getElementById("highBound").innerHTML);
        console.log(document.getElementById("lowBound"));
        console.log(high);
            setSeed(Math.random());
        }

        const [tab, tabValue] = React.useState('1');

  const handleTab = (event, newValue) => {
    tabValue(newValue);
  };

  const [term, setTerm] = React.useState('');

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };


const renderAlbums = () => {
  
  return albums.map(album => (
      <div class="searchRow" key={album.id} onClick={reset}>
        <div type="submit" onClick={() => { setAlbum(album) }}>
          
          <div class="searchCol">{album.images.length ? <img width={"100%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}</div>
          <div class="searchCol">{album.name}</div>
          <div class="searchCol">{album.release_date_precision !== "year" ? album.release_date.substring(0, 4) : album.release_date}</div>
        </div>
      </div>
  ))
}
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
    <div className="App">
      <form name="searchForm" onSubmit={searchAlbums}>
      <div class="searchContainer">
      {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                        to Spotify</a>
                    : <div><button onClick={logout}>Logout</button>
      
      <TabContext value={tab}>
      <Tabs value={tab} onChange={handleTab} aria-label="basic tabs example">
      <Tab label="Search Albums" value="1" />
            <Tab label="Use Stats" value="2" />
  </Tabs>
  
  <TabPanel value="1"><input id="searchBar" class="searchBar" placeholder="Search Spotify..." type="text" onInputCapture={e => setSearchKey(e.target.value)} onChange={searchAlbums} /></TabPanel>
  <TabPanel value="2" style={{maxHeight: 50, overflow: 'auto'}}>
    {/*listYears*/}
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="term-label">Term Length</InputLabel>
        <Select
          labelId="term-label"
          id="term-select"
          value={term}
          label="Term Length"
          onChange={handleTermChange}
        >
          <MenuItem value={"short_term"}>Last Month</MenuItem>
          <MenuItem value={"medium_term"}>Last Six Months</MenuItem>
          <MenuItem value={"long_term"}>All Time</MenuItem>
        </Select>
      </FormControl>
    </Box>
    { term !== "" ? <button onClick={getTracks}>Fill from Top Tracks of {term}</button> : <br></br>}
  </TabPanel>
  </TabContext>

    {/* <button type={"submit"}>Search</button> */}


<div class="render" >{renderAlbums()}</div></div>}</div>
      <div class="container">
      
      <RangeSlider key={seed} arr={selected} setSearchKey={setSearchKey} low={low === undefined ? 1960 : low} high={high === undefined ? 2024 : high}/>

      
      </div>
      </form>
      {/* <div id="slider-root">
        <SliderBar />
      </div> */}
      
    </div>
  );
}


export default App;
