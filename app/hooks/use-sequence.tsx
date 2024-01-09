import { useRef } from "react";
import * as Tone from 'tone';

export type SequenceProps = {
  startTime: Tone.Unit.Time;
  notes?: ([]|string)[];
}

export function useSequence(props: SequenceProps): void {
  const reverb = useRef(new Tone.Reverb(0.1).toDestination());
  const synth = useRef(new Tone.Synth().connect(reverb.current));
  const seq = useRef(
    new Tone.Sequence(
      (time, note) => {
        synth.current.triggerAttackRelease(note, '8n', time);
      },
      props.notes || ['C4', ['E4', 'D4', 'E4'], 'G4', ['A4', 'G4']]
    )
  );
  seq.current.start(props.startTime);
}