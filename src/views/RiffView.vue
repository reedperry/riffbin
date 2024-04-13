<script setup lang="ts">
import * as Tone from 'tone'
import { ref } from 'vue'
import { Riff, Track } from '../models/Riff'

const audioEnabled = ref(false)

const track: Track = ref({
  id: 'abc-123',
  name: 'Main Melody',
  muted: false,
  cycle: [{playLength: 8, steps: [
    { note: 'C3', volume: 100, enabled: true },
    { note: 'D3', volume: 100, enabled: true },
    { note: 'E3', volume: 100, enabled: true },
    { note: 'F3', volume: 100, enabled: true },
    { note: 'G3', volume: 100, enabled: true },
    { note: 'A3', volume: 100, enabled: true },
    { note: 'B3', volume: 100, enabled: true },
    { note: 'C4', volume: 100, enabled: true },
  ]}]
})

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
  <div class="riff-editor">
    <h1>Riff</h1>
    <button v-show="!audioEnabled" @click="enableAudio">Enable Audio</button>
    <div><pre>{{JSON.stringify(track, null, 2)}}</pre><div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .riff-editor {
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
