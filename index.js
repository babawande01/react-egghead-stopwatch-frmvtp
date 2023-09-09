import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

const StopWatch = () => {
  const [lapse, setLapse] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let timer;
    if (running) {
      clearInterval(timer);
    } else {
      const startTime = Date.now() - lapse;
      timer = setInterval(() => {
        setLapse(Date.now() - startTime);
      }, 0);
    }
    return () => clearInterval(timer);
  }, [running, lapse]);
  const handleRunClick = () => {
    setRunning(!running);
  };

  const handleClearClick = () => {
    setLapse(0);
    setRunning(true);
  };

  const buttonStyles = {
    border: '1px solid #ccc',
    background: '#fff',
    fontSize: '2em',
    padding: 25,
    margin: 15,
    width: 200,
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <label style={{ fontSize: '5em', display: 'block' }}>{lapse}ms</label>
      <button style={buttonStyles} onClick={handleRunClick}>
        {running ? 'Start' : 'Stop'}
      </button>
      <button style={buttonStyles} onClick={handleClearClick}>
        Clear
      </button>
    </div>
  );
};

const App = () => {
  const [display, setDisplay] = useState(true);
  return (
    <div>
      Click here to hide
      <input
        checked={display}
        onClick={() => setDisplay(!display)}
        type="checkbox"
      />
      {display && <StopWatch />}
    </div>
  );
};
render(<App />, document.getElementById('root'));
