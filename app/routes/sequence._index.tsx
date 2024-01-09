import { useState } from 'react';
import { ClientOnly } from '~/components/ClientOnly';
import * as Tone from 'tone';
import { Sequence } from '~/components/Sequence';

export default function Sequencer() {
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [division, setDivision] = useState('4n');
  const [sequence, setSequence] = useState([]);

  const playButtonLabel = isPlaying ? 'Stop' : 'Play';

  function togglePlaying() {
    if (!canPlayAudio) {
      Tone.start().then(() => {
        setCanPlayAudio(true);
        setIsPlaying(true);
        Tone.Transport.start();
      });
    } else if (isPlaying) {
      setIsPlaying(!isPlaying);
      Tone.Transport.stop();
    } else {
      setIsPlaying(true);
      Tone.Transport.start();
    }
  }

  function handleTempoChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    setBpm(evt.currentTarget.valueAsNumber);
    Tone.Transport.bpm.rampTo(evt.currentTarget.valueAsNumber, 1);
  }

  return (
    <>
      <h2>Sequence</h2>
      <fieldset>
        <input
          type="range"
          id="tempo"
          value={bpm}
          min="20"
          max="220"
          onChange={handleTempoChange}
        />
        <label htmlFor="tempo">Tempo (BPM): {bpm}</label>
      </fieldset>
      <button type="button" onClick={togglePlaying}>
        {playButtonLabel}
      </button>
      <ClientOnly>
        <Sequence startTime={0} />
        <Sequence startTime={'8n'} />
      </ClientOnly>
    </>
  );
}
