import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import GridLayout from "../components/GridLayout.vue"
import GridItem from "../components/GridItem.vue"

describe("GridLayout.vue", () => {
    it("renders default slot content", () => {
        const wrapper = mount(GridLayout, {
            slots: {
                default: "<div class='child'>Item</div>"
            }
        })
        expect(wrapper.find(".child").exists()).toBe(true)
    })

    it("applies default styles", () => {
        const wrapper = mount(GridLayout)
        const style = (wrapper.element as HTMLElement).style

        expect(style.display).toBe("grid")
        expect(style.gridTemplateColumns).toBe("repeat(3, 1fr)")
        expect(style.gap).toBe("8px")
        expect(style.width).toBe("100%")
        expect(style.height).toBe("auto")
    })

    it("respects custom props for grid layout", () => {
        const wrapper = mount(GridLayout, {
            props: {
                columns: 4,
                gap: "12px",
                width: "500px",
                height: "300px"
            }
        })
        const style = (wrapper.element as HTMLElement).style

        expect(style.gridTemplateColumns).toBe("repeat(4, 1fr)")
        expect(style.gap).toBe("12px")
        expect(style.width).toBe("500px")
        expect(style.height).toBe("300px")
    })

    it("renders GridItem with colspan and rowspan", () => {
        const wrapper = mount(GridLayout, {
            slots: {
                default: `<GridItem :colspan="2" :rowspan="3">Big Item</GridItem>`
            },
            global: {
                components: { GridItem }
            }
        })

        const item = wrapper.find(".grid-item").element as HTMLElement
        expect(item.style.gridColumn).toBe("span 2")
        expect(item.style.gridRow).toBe("span 3")
    })

    it("applies square-item class when square=true", () => {
        const wrapper = mount(GridLayout, {
            props: { square: true },
            slots: {
                default: `<GridItem>Square</GridItem>`
            },
            global: {
                components: { GridItem }
            }
        })
        expect(wrapper.find(".square-item").exists()).toBe(true)
    })

    it("provides item slot with row/col/index", () => {
        const wrapper = mount(GridLayout, {
            props: { columns: 2 },
            slots: {
                default: "<div>Child</div>",
                item: `<template #item="{ row, col, index }">
                 <div class="slot-item">r{{row}} c{{col}} i{{index}}</div>
               </template>`
            }
        })
        const slotItem = wrapper.find(".slot-item")
        expect(slotItem.text()).toContain("r1")
        expect(slotItem.text()).toContain("c1")
        expect(slotItem.text()).toContain("i0")
    })
})
