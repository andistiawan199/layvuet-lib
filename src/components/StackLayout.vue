<script setup lang="ts">
import { computed } from "vue"

type SizeType = string | number | null

const props = defineProps<{
  width?: SizeType
  height?: SizeType
}>()

const layoutStyle = computed(() => {
  const style: Record<string, string> = {
    position: "relative"
  }

  if (props.width === "auto") {
    style.width = "100%"
  } else if (typeof props.width === "number") {
    style.width = `${props.width}%`
  } else if (typeof props.width === "string") {
    style.width = props.width
  } else {
    style.width = "auto"
  }

  // Height
  if (props.height === "auto") {
    style.height = "100%"
  } else if (typeof props.height === "number") {
    style.height = `${props.height}%`
  } else if (typeof props.height === "string") {
    style.height = props.height
  } else {
    style.height = "auto"
  }

  return style
})
</script>

<template>
  <div class="stack-layout" :style="layoutStyle">
    <slot />
  </div>
</template>

<style scoped>
.stack-layout > * {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
