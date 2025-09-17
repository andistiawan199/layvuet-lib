<script setup lang="ts">
const props = defineProps<{
  colspan?: number
  rowspan?: number
}>()
</script>

<template>
  <div
      class="grid-item"
      :style="{
      gridColumn: `span ${props.colspan ?? 1}`,
      gridRow: `span ${props.rowspan ?? 1}`,
    }"
  >
    <slot />
  </div>
</template>
