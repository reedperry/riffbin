import { useState } from 'react';
import * as Tone from 'tone';

export default function ToneDebugger(): React.ReactNode {
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const buttonLabel = canPlayAudio
    ? 'Done - Tone.js assigned to window'
    : 'Start';

  function allowAudio() {
    if (!canPlayAudio) {
      window['Tone'] = Tone;
      Tone.start().then(() => {
        setCanPlayAudio(true);
        console.log('Debug Tone.js here, using the global on window - `Tone`');
        console.log(`Sample code:
        const synth = new Tone.Synth().toDestination();
        const seq = new Tone.Sequence((time, note) => {
	        synth.triggerAttackRelease(note, 0.1, time);
        }, ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]]).start(0);
        Tone.Transport.start();
        Tone.Transport.stop('+5')
        `);
      });
    }
  }

  return (
    <button disabled={canPlayAudio} onClick={allowAudio}>
      {buttonLabel}
    </button>
  );
}
