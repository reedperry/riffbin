import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

export type SequenceProps = {
  division?: Tone.Unit.Time;
  notes: (string[] | string)[];
};

export const defaultDivision: Tone.Unit.Time = '8n';

export function useSequence(props: SequenceProps): void {
  const division = props.division || defaultDivision;
  const startTime = 0;
  const reverb = useRef<Tone.Reverb | null>(null);
  const synth = useRef<Tone.Synth | null>(null);
  const filter = useRef<Tone.Filter | null>(null);
  const lfo = useRef<Tone.LFO | null>(null);
  const sequence = useRef<Tone.Sequence | null>(null);

  console.log('useSequence');

  useEffect(() => {
    if (reverb.current === null && synth.current === null && filter.current === null) {
      filter.current = new Tone.Filter(4500, 'lowpass');
      lfo.current = new Tone.LFO("3m", 900, 4500);
      reverb.current = new Tone.Reverb(0.1);
      synth.current = new Tone.Synth({
        envelope: {
          attack: 0.03
        },
        oscillator: {
          type: 'sawtooth'
        }
      }).chain(filter.current, reverb.current, Tone.Destination);
      lfo.current.start().connect(filter.current.frequency);
    }
    if (sequence.current === null) {
      sequence.current = new Tone.Sequence(
        (time, note) => {
          if (note && synth.current) {
            synth.current.triggerAttackRelease(note, division, time);
          }
        },
        props.notes,
        division
      ).start(startTime);
      sequence.current.debug = true;
    }

    return () => {
      sequence.current?.dispose();
      reverb.current?.dispose();
      synth.current?.dispose();
      filter.current?.dispose();
      sequence.current = null;
      synth.current = null;
      filter.current = null;
      reverb.current = null;
    }
  }, []);

  useEffect(() => {
    if (sequence.current) {
      sequence.current.cancel();
      sequence.current.clear();
      sequence.current.events = props.notes;
    }
  }, [props.notes]);
}
