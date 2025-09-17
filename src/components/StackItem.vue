<script setup lang="ts">
type AlignType = "top" | "center" | "bottom"
type JustifyType = "left" | "center" | "right"
type SizeType = string | number | null
type OffsetType = string | number

const props = defineProps<{
  align?: AlignType
  justify?: JustifyType
  offsetX?: OffsetType
  offsetY?: OffsetType
  width?: SizeType
  height?: SizeType
}>()

const getStyle = (
    align: AlignType = "top",
    justify: JustifyType = "left",
    offsetX: OffsetType = "0px",
    offsetY: OffsetType = "0px",
    width: SizeType = null,
    height: SizeType = null
) => {
  const base: Record<string, string> = { position: "absolute" }

  // Vertical
  let vertical: Record<string, string> = {}
  if (align === "top") vertical = { top: String(offsetY) }
  else if (align === "center")
    vertical = { top: "50%", transform: "translateY(-50%)" }
  else if (align === "bottom") vertical = { bottom: String(offsetY) }

  // Horizontal
  let horizontal: Record<string, string> = {}
  if (justify === "left") horizontal = { left: String(offsetX) }
  else if (justify === "center") {
    horizontal = {
      left: "50%",
      transform: vertical.transform
          ? vertical.transform + " translateX(-50%)"
          : "translateX(-50%)"
    }
  } else if (justify === "right") horizontal = { right: String(offsetX) }

  // Size
  let size: Record<string, string> = {}
  if (typeof width === "number") size.width = `${width}%`
  else if (typeof width === "string") size.width = width
  else size.width = "auto"

  if (typeof height === "number") size.height = `${height}%`
  else if (typeof height === "string") size.height = height
  else size.height = "auto"

  return { ...base, ...vertical, ...horizontal, ...size }
}
</script>

<template>
  <div
      :style="
      getStyle(
        props.align,
        props.justify,
        props.offsetX,
        props.offsetY,
        props.width,
        props.height
      )
    "
  >
    <slot />
  </div>
</template>
