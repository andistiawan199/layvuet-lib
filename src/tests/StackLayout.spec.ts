import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import StackLayout from "../components/StackLayout.vue"

describe("StackLayout.vue", () => {
    it("renders slot content", () => {
        const wrapper = mount(StackLayout, {
            slots: { default: "<div class='child'>Hello</div>" }
        })
        expect(wrapper.find(".child").exists()).toBe(true)
    })

    it("applies default width and height (auto)", () => {
        const wrapper = mount(StackLayout)
        const style = (wrapper.element as HTMLElement).style

        expect(style.width).toBe("auto")
        expect(style.height).toBe("auto")
    })

    it("applies numeric width and height", () => {
        const wrapper = mount(StackLayout, {
            props: { width: 50, height: 80 }
        })
        const style = (wrapper.element as HTMLElement).style

        expect(style.width).toBe("50%")
        expect(style.height).toBe("80%")
    })

    it("applies string width and height", () => {
        const wrapper = mount(StackLayout, {
            props: { width: "200px", height: "400px" }
        })
        const style = (wrapper.element as HTMLElement).style

        expect(style.width).toBe("200px")
        expect(style.height).toBe("400px")
    })

    it("expands to full size when width or height = auto", () => {
        const wrapper = mount(StackLayout, {
            props: { width: "auto", height: "auto" }
        })
        const style = (wrapper.element as HTMLElement).style

        expect(style.width).toBe("100%")
        expect(style.height).toBe("100%")
    })
})
