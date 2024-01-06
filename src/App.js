import logo from './logo.svg';
import './App.css';
import React from 'react';
import RangeSlider from './RangeSlider.js';
import './RangeSlider.css';

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
  const [value, setValue] = React.useState({ min: 0, max: 124 });
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
      <div class="container">
        <RangeSlider />
      </div>
      {/* <div id="slider-root">
        <SliderBar />
      </div> */}
      
    </div>
  );
}

export default App;
