<script setup lang="ts">
import * as Tone from 'tone'
import { ref } from 'vue'
import { Riff, Track } from '../models/Riff'

const audioEnabled = ref(false)

const t: Track = ref({
  id: 'track-123',
  name: 'Main Melody',
  muted: false,
  sequence: {playLength: 8, steps: [
    { note: 'C3', volume: 100, enabled: true },
    { note: 'D3', volume: 60, enabled: true },
    { note: 'E3', volume: 80, enabled: true },
    { note: 'F3', volume: 100, enabled: false },
    { note: 'G3', volume: 60, enabled: true },
    { note: 'A3', volume: 80, enabled: true },
    { note: 'B3', volume: 100, enabled: true },
    { note: 'C4', volume: 60, enabled: true },
    { note: 'G4', volume: 80, enabled: true },
  ]}
})

const t2: Track = ref({
  id: 'track-456',
  name: 'Bass',
  muted: false,
  sequence: {playLength: 8, steps: [
    { note: 'C2', volume: 100, enabled: true },
    { note: 'D2', volume: 60, enabled: true },
    { note: 'E2', volume: 80, enabled: true },
    { note: 'F2', volume: 100, enabled: false },
    { note: 'G2', volume: 60, enabled: true },
    { note: 'A2', volume: 80, enabled: true },
    { note: 'B2', volume: 100, enabled: true },
    { note: 'C2', volume: 60, enabled: true },
    { note: 'G2', volume: 80, enabled: true },
  ]}
})

const riff: Riff = ref({
  id: 'riff-123',
  name: 'My Riff',
  tracks: [t, t2],
  tempo: 120
});


async function enableAudio() {
  try {
    await Tone.start()
    audioEnabled.value = true
  } catch (err) {
    alert('Failed to initialize audio 😦')
  }
}

</script>

<template>
  <div class="riff-page">
    <h1>Riff</h1>
    <button v-show="!audioEnabled" @click="enableAudio">Enable Audio</button>
    <details><summary>View Riff</summary><pre>{{JSON.stringify(riff, null, 2)}}</pre></details>
    <h2>{{riff.name}}</h2>
    <p><small>Tempo: {{riff.tempo}}</small></p>
    <div class="riff-editor">
      <div class="track" v-for="track in riff.tracks">
        <div class="track-name" :title="track.value.name">{{track.value.name}}</div>
        <div class="sequence-step" v-for="step in track.value.sequence.steps">{{step.note}}</div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .riff-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.riff-editor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
}

.track {
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  gap: 1.5rem;
}

.track-name {
  flex-basis: 4rem;
  flex-shrink: 0;
}

.sequence-step {
  cursor: pointer;
  padding: 5px; 
}

button {
  margin: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
}
</style>
