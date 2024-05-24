<script setup lang="ts">
import { reactive } from 'vue'
import SequencerSlot from './SequencerSlot.vue'

const props = defineProps<{ octave: number }>()

const noteNames = [
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
]

const notes = reactive(
  noteNames
    .slice(0)
    .reverse()
    .map(note => note + props.octave),
)

function handleNoteActiveChange(note: string): void {
  console.log('Should change note to: ', note)
}
</script>

<template>
  <div class="sequencer-strip">
    <SequencerSlot
      v-for="note in notes"
      :key="note"
      :note="note"
      @activeChange="handleNoteActiveChange(note)"
    />
  </div>
</template>

<style scoped>
.sequencer-strip {
  display: flex;
  flex-flow: column nowrap;
  height: 95%;
}

@media (min-width: 1024px) {
}
</style>
