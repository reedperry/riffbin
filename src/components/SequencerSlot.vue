<script setup lang="ts">
const props = defineProps<{ note: string }>()

function handleClick(evt: MouseEvent): void {
  console.log('SequencerSlot clicked: ', props.note)
}
</script>

<template>
  <div class="note-slot">{{ props.note }}</div>
</template>

<style scoped>
.note-slot {
  height: 100px;
  width: 100px;
  border: 2px solid pink;
}
</style>
