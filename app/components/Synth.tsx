import { SynthProps, useSynth } from '../hooks/use-synth';

export function Synth(props: SynthProps) {
  useSynth(props);
  return <pre>Synth: {JSON.stringify(props)}</pre>;
}
