import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

export interface SynthProps {
  isPlaying: boolean;
  frequency: number;
  filterCutoff: number;
  gain: number;
}

export function useSynth({
  frequency,
  filterCutoff,
  gain,
  isPlaying,
}: SynthProps): void {
  const filterNode = useRef<Tone.Filter>(new Tone.Filter(filterCutoff, 'lowpass'));
  const gainNode = useRef<Tone.Gain>(new Tone.Gain(gain));
  const oscillator = useRef<Tone.Synth>(
    new Tone.Synth({ oscillator: { type: 'sawtooth' } }).chain(
      filterNode.current,
      gainNode.current,
      Tone.Destination
    )
  );
  const now = Tone.now();

  useEffect(() => {
    if (isPlaying) {
      oscillator.current.triggerAttack(frequency, now);
    } else {
      oscillator.current.triggerRelease(now);
    }
  }, [isPlaying]);

  useEffect(() => {
    oscillator.current.setNote(frequency);
    gainNode.current.set({gain});
    filterNode.current.set({ frequency });
  }, [frequency, filterCutoff, gain]);
}
