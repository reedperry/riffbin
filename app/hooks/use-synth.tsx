import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

export interface SynthProps {
  isPlaying: boolean;
  frequency: Tone.Unit.Frequency;
  filterCutoff: number;
  gain: number;
}

export function useSynth({
  frequency,
  filterCutoff,
  gain,
  isPlaying,
}: SynthProps): void {
  const gainNode = useRef<Tone.Gain>(new Tone.Gain(gain));
  const filterNode = useRef<Tone.Filter>(new Tone.Filter(4000, 'lowpass'));
  const oscillator = useRef<Tone.Oscillator>(
    new Tone.Oscillator(frequency, 'sawtooth').chain(
      filterNode.current,
      gainNode.current,
      Tone.Destination
    )
  );

  const now = Tone.now();

  useEffect(() => {
    if (isPlaying) {
      oscillator.current.start();
    } else {
      oscillator.current.stop();
    }
  }, [isPlaying]);

  useEffect(() => {
    filterNode.current.frequency.setValueAtTime(filterCutoff, now);
  }, [filterCutoff]);

  useEffect(() => {
    gainNode.current.set({ gain });
  }, [gain]);

  useEffect(() => {
    oscillator.current.frequency.setValueAtTime(frequency, now);
  }, [frequency]);
}
