import { useState } from 'react';
import { ClientOnly } from '~/components/ClientOnly';
import { Synth } from '~/components/Synth';
import * as Tone from 'tone';
import styles from '~/styles/global.css';
import { LinksFunction } from '@remix-run/node';
import { OscillatorSelector } from '~/components/OscillatorSelector';

enum SynthParameterType {
  FREQUENCY,
  FILTER_CUTOFF,
  FILTER_Q,
  GAIN,
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function DefaultSynthPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [oscillator, setOscillator] = useState('sine');
  const [frequency, setFrequency] = useState(440);
  const [filterCutoff, setFilterCutoff] = useState(2500);
  const [filterQ, setFilterQ] = useState(4);
  const [gain, setGain] = useState(0.5);
  const [canPlayAudio, setCanPlayAudio] = useState(false);

  const playButtonLabel = isPlaying ? 'Stop' : 'Play';

  function togglePlaying() {
    if (!canPlayAudio) {
      Tone.start().then(() => {
        setCanPlayAudio(true);
        setIsPlaying(true);
      });
    } else {
      setIsPlaying(!isPlaying);
    }
  }

  function handleParamChange(
    paramType: SynthParameterType,
    evt: React.ChangeEvent<HTMLInputElement>
  ) {
    switch (paramType) {
      case SynthParameterType.FREQUENCY: {
        setFrequency(evt.currentTarget.valueAsNumber);
        break;
      }
      case SynthParameterType.FILTER_CUTOFF: {
        setFilterCutoff(evt.currentTarget.valueAsNumber);
        break;
      }
      case SynthParameterType.FILTER_Q: {
        setFilterQ(evt.currentTarget.valueAsNumber);
        break;
      }
      case SynthParameterType.GAIN: {
        setGain(evt.currentTarget.valueAsNumber);
        break;
      }
    }
  }

  return (
    <>
      <h2>Synthesizer</h2>
      <OscillatorSelector value={oscillator} onChanged={setOscillator} />
      <fieldset>
        <div>
          <input
            type="range"
            id="frequency"
            min="16"
            max="3000"
            value={frequency}
            onChange={(evt) =>
              handleParamChange(SynthParameterType.FREQUENCY, evt)
            }
          />
          <label htmlFor="frequency">Oscillator Frequency (Hz)</label>
        </div>
        <div>
          <input
            type="range"
            id="filter-cutoff"
            min="16"
            max="4000"
            value={filterCutoff}
            onChange={(evt) =>
              handleParamChange(SynthParameterType.FILTER_CUTOFF, evt)
            }
          />
          <label htmlFor="filter-cutoff">Filter Cutoff (Hz)</label>
        </div>
        <div>
          <input
            type="range"
            id="filter-q"
            min="0"
            max="100"
            value={filterQ}
            onChange={(evt) =>
              handleParamChange(SynthParameterType.FILTER_Q, evt)
            }
          />
          <label htmlFor="filter-Q">Filter Resonance</label>
        </div>
        <div>
          <input
            type="range"
            id="gain"
            min="0"
            max="1.0"
            step="0.01"
            value={gain}
            onChange={(evt) => handleParamChange(SynthParameterType.GAIN, evt)}
          />
          <label htmlFor="gain">Gain</label>
        </div>
      </fieldset>
      <button type="button" onClick={togglePlaying}>
        {playButtonLabel}
      </button>
      <DefaultSynthDebugger
        isPlaying={isPlaying}
        frequency={frequency}
        filterCutoff={filterCutoff}
        gain={gain}
      />
      <ClientOnly>
        <Synth
          isPlaying={isPlaying}
          frequency={frequency}
          filterCutoff={filterCutoff}
          filterQ={filterQ}
          gain={gain}
          oscillatorType={oscillator}
        />
      </ClientOnly>
    </>
  );
}

function DefaultSynthDebugger({
  frequency,
  filterCutoff,
  filterQ,
  gain,
  isPlaying,
}: any) {
  return (
    <pre style={{ border: '1px solid gray', margin: '5px', padding: '10px' }}>
      {isPlaying ? 'Playing' : 'Stopped'}
      <br />
      Frequency: {frequency}
      <br />
      Filter Cutoff: {filterCutoff}
      <br />
      Filter Q: {filterQ}
      <br />
      Gain: {gain}
      <br />
    </pre>
  );
}
