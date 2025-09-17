<script setup lang="ts">
import GridItem from "./GridItem.vue"
import { useSlots } from "vue"

type Size = "auto" | `${number}%` | `${number}px` | `${number}rem` | string

const props = defineProps<{
  columns?: number
  gap?: `${number}px` | `${number}rem` | string
  width?: Size
  height?: Size
  square?: boolean
}>()

const slots = useSlots()
</script>

<template>
  <div
      class="grid-layout"
      :style="{
      display: 'grid',
      gridTemplateColumns: `repeat(${props.columns ?? 3}, 1fr)`,
      gap: props.gap ?? '8px',
      width: props.width ?? '100%',
      height: props.height ?? 'auto',
    }"
  >
    <template v-for="(child, index) in slots.default?.()" :key="index">
      <slot
          name="item"
          :row="Math.floor(index / (props.columns ?? 3)) + 1"
          :col="(index % (props.columns ?? 3)) + 1"
          :index="index"
      >
        <GridItem
            v-bind="child.props"
            :colspan="child.props?.colspan ?? 1"
            :rowspan="child.props?.rowspan ?? 1"
            :class="{
            'square-item':
              props.square &&
              (!child.props?.colspan || child.props?.colspan === 1) &&
              (!child.props?.rowspan || child.props?.rowspan === 1),
          }"
        >
          <component :is="child" />
        </GridItem>
      </slot>
    </template>
  </div>
</template>

<style scoped>
.square-item {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
