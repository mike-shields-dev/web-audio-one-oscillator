import "./App.css";
import Osc1 from "./components/Osc1";
import { useState } from "react";

const actx = new AudioContext();

let osc1 = actx.createOscillator();
const gain1 = actx.createGain();
const masterOut = actx.destination;
osc1.connect(gain1);
gain1.connect(masterOut);

function App() {
  const [osc1State, setOsc1State] = useState({
    isPlaying: false,
    params: {
      frequency: {
        value: osc1.frequency.value,
        inputType: "range",
        min: 20,
        max: 20000,
      },
      detune: {
        value: osc1.detune.value,
        inputType: "range",
        min: -100,
        max: 100,
      },
      gain: {
        value: gain1.gain.value,
        inputType: "range",
        min: 0,
        max: 1,
        step: 0.01,
      },
      waveform: {
        value: "sine",
        inputType: "radio",
        choices: ["sine", "square", "sawtooth", "triangle"],
      },
    },
  });

  console.log(osc1State.params.waveform.value);

  function changeParam(e) {
    const { name: paramName, value } = e.target;

    if (paramName === "gain") {
      gain1[paramName].value = value;
    } else if (paramName === "waveform") {
      osc1.type = value;
    } else {
      osc1[paramName].value = value;
    }

    setOsc1State((prevState) => {
      const newParams = { ...prevState.params };
      newParams[paramName].value = value;

      return { ...prevState, ...newParams };
    });
  }

  function spawnOsc1() {
    dropOsc1();
    const waveform = osc1State.params.waveform.value;
    const frequency = osc1State.params.frequency.value;
    const detune = osc1State.params.detune.value;
    
    osc1 = actx.createOscillator();
    osc1.type = waveform
    osc1.frequency.value = frequency;
    osc1.detune.value = detune;
    osc1.connect(gain1);
    osc1.start();
    
    osc1State.isPlaying = true;

    setOsc1State((prevState) => {
      const newParams = { ...prevState.params };
      newParams.waveform.value = waveform;
      return { ...prevState, ...newParams };
    });
  }

  function dropOsc1() {
    if (osc1State.isPlaying) {
      osc1.stop();
      osc1State.isPlaying = false;
      osc1.disconnect(gain1);
    }
  }

  return (
    <div className="App">
      <h1>sliders</h1>
      <button onClick={spawnOsc1}>start</button>
      <button onClick={dropOsc1}>stop</button>
      <Osc1 changeParam={changeParam} params={osc1State.params} />
    </div>
  );
}

export default App;
