import { useState } from 'react';
import * as Tone from 'tone';
import { LinksFunction } from '@remix-run/node';

import styles from '~/styles/sequencer.css';
import { SequenceEditor, SequenceEvent } from '~/components/SequenceEditor';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function SequencerPage() {
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequenceLength, setSequenceLength] = useState(8);
  const [bpm, setBpm] = useState(120);
  const [division, setDivision] = useState('8n');
  const [sequence, setSequence] = useState([
    'G#4',
    'B-2',
    '',
    'E3',
    'G#3',
    '',
    'A#3',
    '',
  ]);

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

  function handleSequenceLengthChange(
    evt: React.ChangeEvent<HTMLInputElement>
  ): void {
    setSequenceLength(evt.currentTarget.valueAsNumber);
  }

  function handleSequenceChanged(newSequence: SequenceEvent[]): void {
    setSequence(newSequence);
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
      <input
        min="1"
        max="64"
        step="1"
        type="number"
        onChange={handleSequenceLengthChange}
      />
      <label>Sequence Length</label>
      <SequenceEditor
        length={sequenceLength}
        onSequenceChanged={handleSequenceChanged}
        steps={sequence}
      />
    </>
  );
}
