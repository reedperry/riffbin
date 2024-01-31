import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

export type SequenceProps = {
  startTime?: Tone.Unit.Time;
  division?: Tone.Unit.Time;
  notes: (string[] | string)[];
};

export const defaultDivision: Tone.Unit.Time = '8n';

export function useSequence(props: SequenceProps): void {
  const division = props.division || defaultDivision;
  const reverb = useRef(new Tone.Reverb(0.1).toDestination());
  const synth = useRef(new Tone.Synth().connect(reverb.current));
  const startTime = props.startTime || '+0.1';
  const seq = useRef(
    new Tone.Sequence(
      (time, note) => {
        if (note) {
          synth.current.triggerAttackRelease(note, division, time);
        }
      },
      props.notes,
      division
    )
  );

  useEffect(() => {
    seq.current.events = props.notes;
  }, [props.notes]);

  seq.current.start(startTime);
}
