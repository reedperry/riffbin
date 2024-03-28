<script setup lang="ts">
import { useSynth } from '@/composables/useSynth'
import * as Tone from 'tone'
import { ref } from 'vue'

const audioEnabled = ref(false)

async function enableAudio() {
  try {
    await Tone.start()
    audioEnabled.value = true
  } catch (err) {
    alert('Failed to initialize audio 😦')
  }
}

const { isPlaying, frequency, filterCutoff, oscillatorType } = useSynth()

function play(): void {
  isPlaying.value = true
}

function stop(): void {
  isPlaying.value = false
}
</script>

<template>
  <div class="synth">
    <h1>Synth</h1>
    <button v-show="!audioEnabled" @click="enableAudio">Enable Audio</button>
    <button v-show="audioEnabled" @click="play">Play</button>
    <button v-show="audioEnabled" @click="stop">Stop</button>
    <p>Is Playing: {{ isPlaying }}</p>
    <p>Oscillator: {{ oscillatorType }}</p>
    <p>Freq: {{ frequency }}</p>
    <input type="range" min="16" max="5000" step="10" v-model="frequency" />
    <p>Filter Cutoff: {{ filterCutoff }}</p>
    <input type="range" min="16" max="5000" step="10" v-model="filterCutoff" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .synth {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

button {
  margin: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
}
</style>
