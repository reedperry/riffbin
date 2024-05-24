<script setup lang="ts">
import SequenceSlot from './SequencerSlot.vue'
import SequencerStrip from './SequencerStrip.vue'

const note = 'B1'
</script>

<template>
  <div>
    <h1>Sequencer</h1>
    <SequenceSlot :note="note" :enabled="true" />
    <SequencerStrip :octave="3" />
    <SequencerStrip :octave="4" />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
