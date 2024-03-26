import { useState } from 'react';
import * as Tone from 'tone';
import { ActionFunctionArgs, json, LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';

import sequencerStyles from '~/styles/sequencer.css';
import globalStyles from '~/styles/global.css';
import { SequenceEditor } from '~/components/SequenceEditor';
import { SequenceData, SequenceStep } from '~/models/sequence.models';
import { useLoaderData } from '@remix-run/react';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'stylesheet', href: sequencerStyles },
];

export async function loader({
}: LoaderFunctionArgs) {
  return json({
    tempo: 160,
    playLength: 12,
    steps: [
      { note: 'G#4', enabled: true },
      { note: 'F4', enabled: true },
      { note: 'C4', enabled: true },
      { note: 'D#3', enabled: true },
      { note: 'G#3', enabled: true },
      { note: 'C#3', enabled: true },
      { note: 'A#3', enabled: true },
      { note: 'F2', enabled: true },
      { note: 'G3', enabled: true },
      { note: 'G#3', enabled: true },
      { note: 'G#2', enabled: true },
      { note: 'C3', enabled: true },
    ],
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();
  console.log('Not really saving your sequence, but received this:');
  console.log(data);
  return json({ ok: true });
}

export default function SequencerPage() {
  const fetcher = useFetcher();
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // TODO Do we split up sequence parts to avoid updating all every time?
  const savedSequence = useLoaderData<typeof loader>();
  const [bpm, setBpm] = useState<SequenceData['tempo']>(savedSequence.tempo);
  // TODO Should playLength be passed into SequenceEditor?
  // Worth it if we allow easy dragging of loopStart/loopEnd points in SequenceEditor
  const [sequence, setSequence] = useState<SequenceData>(savedSequence);

  const playButtonLabel = isPlaying ? 'Stop ⏹' : 'Play ▶️';

  function togglePlaying() {
    if (!canPlayAudio) {
      Tone.start().then(() => {
        Tone.Transport.bpm.setValueAtTime(bpm, Tone.now());
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
    Tone.Transport.bpm.rampTo(evt.currentTarget.valueAsNumber, 0.1);
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

  function updateSequence(): void {
    fetcher.submit({
      ...sequence,
      tempo: bpm
    }, {
      method: "POST",
      encType: "application/json"
    });
  }

  return (
    <>
      <h2>Sequence</h2>
      <button id="sequencer-play" type="button" onClick={togglePlaying}>
        {playButtonLabel}
      </button>
      <button onClick={updateSequence}>Save</button>
      <input
        type="range"
        id="sequencer-tempo"
        value={bpm}
        min="10"
        max="240"
        onChange={handleTempoChange}
      />
      <label htmlFor="sequencer-tempo">Tempo (BPM): {bpm}</label>
      <input
        min="1"
        max="32"
        step="1"
        type="number"
        value={sequence.playLength}
        onChange={handleSequenceLengthChange}
      />
      <label>Sequence Length</label>
      <SequenceEditor
        onStepsChanged={handleSequenceStepsChanged}
        sequence={sequence}
      />
    </>
  );
}
