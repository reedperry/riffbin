import * as Tone from 'tone'
import type { NonCustomOscillatorType } from 'tone/build/esm/source/oscillator/OscillatorInterface'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { Ref } from 'vue'

export interface SynthControls {
  isPlaying: Ref<boolean>
  oscillatorType: Ref<NonCustomOscillatorType>
  frequency: Ref<number>
  filterCutoff: Ref<number>
}

export function useSynth(): SynthControls {
  let synth: Tone.Synth
  let filter: Tone.Filter

  const isPlaying = ref<boolean>(false)
  const oscillatorType = ref<NonCustomOscillatorType>('square')
  const frequency = ref<number>(300)
  const filterCutoff = ref<number>(2000)

  onMounted(() => {
    filter = new Tone.Filter(filterCutoff.value, 'lowpass').toDestination()
    filter.set({ Q: 8 })
    synth = new Tone.Synth({
      oscillator: { type: oscillatorType.value },
      envelope: { attack: 0.1 },
    }).connect(filter)
  })

  watch(isPlaying, async playing => {
    if (playing) {
      synth.triggerAttack(frequency.value)
    } else {
      synth.triggerRelease()
    }
  })

  watch(frequency, async frequency => {
    synth.frequency.setValueAtTime(frequency, Tone.now())
  })

  watch(filterCutoff, async cutoffFreq => {
    filter.frequency.setValueAtTime(cutoffFreq, Tone.now())
  })

  watch(oscillatorType, async oscType => {
    synth.oscillator.type = oscType
  })

  onUnmounted(() => {
    synth.disconnect()
    synth.dispose()
  })

  return { isPlaying, oscillatorType, frequency, filterCutoff }
}
