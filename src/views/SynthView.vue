<script setup>
import * as Tone from 'tone'
import { ref } from 'vue'

const synth = new Tone.Synth().toDestination()
const audioEnabled = ref(false)

async function enableAudio() {
  try {
    await Tone.start()
    audioEnabled.value = true
  } catch (err) {
    alert('Failed to initialize audio 😦')
  }
}

function playNote() {
  synth.triggerAttackRelease('C4', '4n')
}
</script>

<template>
  <div class="synth">
    <h1>Synth</h1>
    <button v-show="!audioEnabled" @click="enableAudio">Enable Audio</button>
    <button v-show="audioEnabled" @click="playNote">Play Note</button>
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
