import { useState } from 'react';
import * as Tone from 'tone';
import { LinksFunction } from '@remix-run/node';

import sequencerStyles from '~/styles/sequencer.css';
import globalStyles from '~/styles/global.css';
import { SequenceEditor, SequenceEvent } from '~/components/SequenceEditor';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'stylesheet', href: sequencerStyles },
];

export default function SequencerPage() {
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequenceLength, setSequenceLength] = useState(8);
  const [bpm, setBpm] = useState(120);
  const [division, setDivision] = useState('8n');
  const [sequence, setSequence] = useState([
    {note: 'G#4', enabled: true },
    {note: 'B2', enabled: true },
    {note: '', enabled: false },
    {note: 'E3', enabled: true },
    {note: 'G#3', enabled: true },
    {note: '', enabled: false },
    {note: 'A#3', enabled: true },
    {note: '', enabled: false },
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
