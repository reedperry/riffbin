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

const riff: Riff = ref({
  id: 'riff-123',
  name: 'My Riff',
  tracks: [t],
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
        <div class="track-name">{{track.value.name}}</div>
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
  display: flex;
  flex-flow: column nowrap;
}

.track {
  display: flex;
  flex-flow: row nowrap;
}

.sequence-step {
  padding: 5px;
}

button {
  margin: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
}
</style>
