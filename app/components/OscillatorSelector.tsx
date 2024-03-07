import { WaveSawtooth, WaveSine, WaveSquare, WaveTriangle } from "@phosphor-icons/react";

interface Props {
  onChanged: (oscType: string) => void;
  value: string;
}

const oscillatorToIconMap: Record<string, React.ReactNode> = {
  sine: <WaveSine size={32} color="red" />,
  sawtooth: <WaveSawtooth size={32} color="pink" />,
  square: <WaveSquare size={32} color="teal" />,
  triangle: <WaveTriangle size={32} color="lightblue" />,
};

export function OscillatorSelector({ onChanged, value }: Props): React.ReactNode {
  return (
    <div>
      <select onChange={evt => onChanged(evt.currentTarget.value)} value={value}>
        <option value={'sine'}>Sine</option>
        <option value={'sawtooth'}>Sawtooth</option>
        <option value={'square'}>Square</option>
        <option value={'triangle'}>Triangle</option>
      </select>
      {oscillatorToIconMap[value]}
    </div>);
}
