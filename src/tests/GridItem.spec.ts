import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import GridItem from "../components/GridItem.vue"

describe("GridItem.vue", () => {
    it("renders slot content", () => {
        const wrapper = mount(GridItem, {
            slots: {
                default: "<div class='child'>Hello</div>"
            }
        })
        expect(wrapper.find(".child").exists()).toBe(true)
    })

    it("applies default colspan and rowspan", () => {
        const wrapper = mount(GridItem)
        const style = (wrapper.element as HTMLElement).style

        expect(style.gridColumn).toBe("span 1")
        expect(style.gridRow).toBe("span 1")
    })

    it("applies custom colspan and rowspan", () => {
        const wrapper = mount(GridItem, {
            props: { colspan: 2, rowspan: 3 }
        })
        const style = (wrapper.element as HTMLElement).style

        expect(style.gridColumn).toBe("span 2")
        expect(style.gridRow).toBe("span 3")
    })
})
