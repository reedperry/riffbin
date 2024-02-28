import { useState } from 'react';
import * as Tone from 'tone';
import { LinksFunction } from '@remix-run/node';

import sequencerStyles from '~/styles/sequencer.css';
import globalStyles from '~/styles/global.css';
import { SequenceEditor } from '~/components/SequenceEditor';
import { SequenceData, SequenceStep } from '~/models/sequence.models';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'stylesheet', href: sequencerStyles },
];

export default function SequencerPage() {
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [division, setDivision] = useState('8n');
  const [sequence, setSequence] = useState<SequenceData>({
    playLength: 8,
    steps: [
      { note: 'G#4', enabled: true },
      { note: 'B2', enabled: true },
      { note: 'C3', enabled: false },
      { note: 'E3', enabled: true },
      { note: 'G#3', enabled: true },
      { note: 'D#3', enabled: true },
      { note: 'A#3', enabled: true },
      { note: 'A#2', enabled: false },
    ],
  });

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
    const newLength = evt.currentTarget.valueAsNumber || 0;
    if (newLength < 0 || newLength > 32) {
      return;
    }
    setSequence({
      ...sequence,
      playLength: newLength,
    });
  }

  function handleSequenceStepsChanged(newSteps: SequenceStep[]): void {
    setSequence({
      ...sequence,
      steps: newSteps,
    });
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
      <fieldset>
        <div>
          <button type="button" onClick={togglePlaying}>
            {playButtonLabel}
          </button>
        </div>
        <input
          min="1"
          max="32"
          step="1"
          type="number"
          value={sequence.playLength}
          onChange={handleSequenceLengthChange}
        />
        <label>Sequence Length</label>
      </fieldset>
      <SequenceEditor
        onStepsChanged={handleSequenceStepsChanged}
        sequence={sequence}
      />
    </>
  );
}
