<script setup lang="ts">
const props = defineProps<{ note: string }>()

const emit = defineEmits<{
  activeChange: []
}>()

function handleClick(): void {
  console.log('SequencerSlot clicked: ', props.note)
  emit('activeChange')
}
</script>

<template>
  <div class="note-slot" @click="handleClick">{{ props.note }}</div>
</template>

<style scoped>
.note-slot {
  height: 100px;
  width: 100px;
  border: 2px solid pink;
}
</style>
