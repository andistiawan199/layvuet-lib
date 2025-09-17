<script setup lang="ts">
import { computed } from "vue"
import type { CSSProperties } from "vue"

type Direction = "vertical" | "horizontal"
type Size = "auto" | `${number}%` | `${number}px` | `${number}rem` | string
type AlignJustify =
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | number

const props = defineProps<{
  direction?: Direction
  width?: Size
  height?: Size
  align?: AlignJustify
  justify?: AlignJustify
}>()

const mapFlex = (val: AlignJustify | undefined, axis: "main" | "cross") => {
  if (typeof val === "string") {
    const map: Record<string, string> = {
      start: "flex-start",
      center: "center",
      end: "flex-end",
      stretch: axis === "cross" ? "stretch" : "flex-start",
      "space-between": "space-between",
      "space-around": "space-around",
      "space-evenly": "space-evenly",
    }
    return map[val] ?? "flex-start"
  }
  return undefined
}

const layoutStyle = computed<CSSProperties>(() => {
  // main axis
  const justifyContent = typeof props.justify === "string"
      ? mapFlex(props.justify, "main")
      : undefined

  // cross axis
  const alignItems = typeof props.align === "string"
      ? mapFlex(props.align, "cross")
      : undefined

  // gap
  let rowGap: string | undefined
  let columnGap: string | undefined

  if (typeof props.justify === "number") {
    if (props.direction === "horizontal") columnGap = `${props.justify}px`
    else rowGap = `${props.justify}px`
  }

  if (typeof props.align === "number") {
    if (props.direction === "horizontal") rowGap = `${props.align}px`
    else columnGap = `${props.align}px`
  }

  // buat object final, hapus undefined agar type-safe
  const style: CSSProperties = {
    display: "flex",
    flexDirection: props.direction === "vertical" ? "column" : "row",
    width: props.width ?? "100%",
    height: props.height ?? "auto",
    justifyContent: justifyContent ?? "flex-start",
    alignItems: alignItems ?? "flex-start",
    ...(columnGap ? { columnGap } : {}),
    ...(rowGap ? { rowGap } : {}),
  }

  return style
})
</script>

<template>
  <div class="linear-layout" :style="layoutStyle">
    <slot />
  </div>
</template>

<style scoped>
.linear-layout > * {
  margin: 0;
}
</style>
