import { h, Component } from "preact";
import Tone from "tone";
import "./styles.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World from Preact! 📦 🚀</h1>
        <ul>
          {Object.entries(instruments).map(([name, S]) => (
            <li key={name}>
              <button onClick={() => play(S)}>Play {name}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class SynthA extends Tone.Synth {
  constructor() {
    super({
      oscillator: {
        type: "fmsquare",
        modulationType: "sawtooth",
        modulationIndex: 3,
        harmonicity: 3.4
      },
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.1,
        release: 0.1
      }
    });
  }
}

class SynthB extends Tone.Synth {
  constructor() {
    super({
      oscillator: {
        type: "triangle8"
      },
      envelope: {
        attack: 2,
        decay: 1,
        sustain: 0.4,
        release: 4
      }
    });
  }
}

const distortion = new Tone.Distortion(0.6);
const tremolo = new Tone.Tremolo().start();

const PolyA = new Tone.PolySynth(4, SynthB).chain(
  distortion,
  tremolo,
  Tone.Master
);

const instruments = {
  "Tone.Synth": Tone.Synth,
  SynthA,
  SynthB,
  PolyA
};

function play(S) {
  if (typeof S === "function") {
    S = new S();
  }
  S.toMaster().triggerAttackRelease("C4", "8n");
}
