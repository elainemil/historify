import logo from './logo.svg';
import './App.css';
import React from 'react';
import RangeSlider from './RangeSlider.js';
import { Tab, Tabs } from '@mui/material/';
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

const searchAlbums = async (e) => {
  if(searchKey === ""){
    setAlbums([]);
  }
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



const setAlbum = (album) => {
  selected[parseInt(album.release_date.substring(0, 4)) - 1900] = album;
  setSelected(selected);
  console.log(selected);
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
      <div class="searchContainer">
      {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <div><button onClick={logout}>Logout</button>
      <form onSubmit={searchAlbums}>
      <TabContext value={tab}>
      <Tabs value={tab} onChange={handleTab} aria-label="basic tabs example">
      <Tab label="Search Albums" value="1" />
            <Tab label="Browse by Year" value="2" />
  </Tabs>
  
  <TabPanel value="1"><input id="searchBar" placeholder="Search Spotify..." type="text" onInputCapture={e => setSearchKey(e.target.value)} onChange={searchAlbums} /></TabPanel>
  <TabPanel value="2" style={{maxHeight: 50, overflow: 'auto'}}>
    {listYears}
  </TabPanel>
  </TabContext>
    
    {/* <button type={"submit"}>Search</button> */}
</form>

{renderAlbums()}</div>}</div>
      <div class="container">
      
      <RangeSlider key={seed} arr={selected} low={low === undefined ? 1960 : low} high={high === undefined ? 2024 : high}/>
      
      
      </div>
      {/* <div id="slider-root">
        <SliderBar />
      </div> */}
      
    </div>
  );
}


export default App;
