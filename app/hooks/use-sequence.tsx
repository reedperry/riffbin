import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

export type SequenceProps = {
  division?: Tone.Unit.Time;
  notes: (string[] | string)[];
};

export const defaultDivision: Tone.Unit.Time = '8n';

export function useSequence(props: SequenceProps): void {
  const division = props.division || defaultDivision;
  const startTime = '+0.05';
  const reverb = useRef<Tone.Reverb | null>(null);
  if (reverb.current === null) {
    reverb.current = new Tone.Reverb(0.1).toDestination();
  }
  const synth = useRef<Tone.Synth | null>(null);
  if (synth.current === null) {
    synth.current = new Tone.Synth().connect(reverb.current);
  }
  const sequence = useRef<Tone.Sequence | null>(null);
  if (sequence.current === null) {
    sequence.current = new Tone.Sequence(
      (time, note) => {
        if (note) {
          synth.current.triggerAttackRelease(note, division, time);
        }
      },
      props.notes,
      division
    ).start(startTime);
  }

  useEffect(() => {
    sequence.current.events = props.notes;

    return () => {
      sequence.current.cancel();
      sequence.current.clear();
    };
  }, [props.notes]);
}
