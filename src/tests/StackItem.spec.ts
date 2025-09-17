import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import StackItem from "../components/StackItem.vue"

describe("StackItem.vue", () => {
    it("renders with default props", () => {
        const wrapper = mount(StackItem)
        const style = (wrapper.element as HTMLElement).style
        expect(style.position).toBe("absolute")
        expect(style.top).toBe("0px")
        expect(style.left).toBe("0px")
        expect(style.width).toBe("auto")
        expect(style.height).toBe("auto")
    })

    describe("align variations", () => {
        it("applies align=top with offsetY", () => {
            const wrapper = mount(StackItem, { props: { align: "top", offsetY: "12px" } })
            expect((wrapper.element as HTMLElement).style.top).toBe("12px")
        })

        it("applies align=center", () => {
            const wrapper = mount(StackItem, { props: { align: "center" } })
            const style = (wrapper.element as HTMLElement).style
            expect(style.top).toBe("50%")
            expect(style.transform).toContain("translateY(-50%)")
        })

        it("applies align=bottom with offsetY", () => {
            const wrapper = mount(StackItem, { props: { align: "bottom", offsetY: "24px" } })
            expect((wrapper.element as HTMLElement).style.bottom).toBe("24px")
        })
    })

    describe("justify variations", () => {
        it("applies justify=left with offsetX", () => {
            const wrapper = mount(StackItem, { props: { justify: "left", offsetX: "8px" } })
            expect((wrapper.element as HTMLElement).style.left).toBe("8px")
        })

        it("applies justify=center", () => {
            const wrapper = mount(StackItem, { props: { justify: "center" } })
            const style = (wrapper.element as HTMLElement).style
            expect(style.left).toBe("50%")
            expect(style.transform).toContain("translateX(-50%)")
        })

        it("applies justify=center combined with align=center (transform merge)", () => {
            const wrapper = mount(StackItem, { props: { align: "center", justify: "center" } })
            const style = (wrapper.element as HTMLElement).style
            expect(style.transform).toContain("translateY(-50%)")
            expect(style.transform).toContain("translateX(-50%)")
        })

        it("applies justify=right with offsetX", () => {
            const wrapper = mount(StackItem, { props: { justify: "right", offsetX: "16px" } })
            expect((wrapper.element as HTMLElement).style.right).toBe("16px")
        })
    })

    describe("size variations", () => {
        it("applies numeric width and height", () => {
            const wrapper = mount(StackItem, { props: { width: 80, height: 60 } })
            const style = (wrapper.element as HTMLElement).style
            expect(style.width).toBe("80%")
            expect(style.height).toBe("60%")
        })

        it("applies string width and height", () => {
            const wrapper = mount(StackItem, { props: { width: "200px", height: "100vh" } })
            const style = (wrapper.element as HTMLElement).style
            expect(style.width).toBe("200px")
            expect(style.height).toBe("100vh")
        })

        it("falls back to auto width and height", () => {
            const wrapper = mount(StackItem, { props: { width: null, height: null } })
            const style = (wrapper.element as HTMLElement).style
            expect(style.width).toBe("auto")
            expect(style.height).toBe("auto")
        })
    })
})