import {mount, VueWrapper} from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import LinearLayout, {type AlignJustify} from "../components/LinearLayout.vue"
import type {ComponentPublicInstance} from "vue";

describe("LinearLayout", () => {
    it("default props", () => {
        const wrapper = mount(LinearLayout)
        const style = (wrapper.element as HTMLElement).style
        expect(style.display).toBe("flex")
        expect(style.flexDirection).toBe("row")
        expect(style.width).toBe("100%")
        expect(style.height).toBe("auto")
        expect(style.justifyContent).toBe("flex-start")
        expect(style.alignItems).toBe("flex-start")
    })

    it("direction vertical", () => {
        const wrapper = mount(LinearLayout, { props: { direction: "vertical" } })
        expect((wrapper.element as HTMLElement).style.flexDirection).toBe("column")
    })

    it("custom width & height", () => {
        const wrapper = mount(LinearLayout, { props: { width: "50%", height: "200px" } })
        const style = (wrapper.element as HTMLElement).style
        expect(style.width).toBe("50%")
        expect(style.height).toBe("200px")
    })

    it("maps justify props (string)", () => {
        const cases = [
            ["start", "flex-start"],
            ["center", "center"],
            ["end", "flex-end"],
            ["stretch", "flex-start"],
            ["space-between", "space-between"],
            ["space-around", "space-around"],
            ["space-evenly", "space-evenly"],
            [undefined, "flex-start"], // unknown
        ] as const

        for (const [input, expected] of cases) {
            const wrapper = mount(LinearLayout, { props: { justify: input } })
            expect((wrapper.element as HTMLElement).style.justifyContent).toBe(expected)
        }
    })

    it("maps align props (string)", () => {
        const wrapper = mount(LinearLayout, { props: { align: "stretch" } })
        expect((wrapper.element as HTMLElement).style.alignItems).toBe("stretch")
    })

    it("numeric justify horizontal", () => {
        const wrapper = mount(LinearLayout, { props: { direction: "horizontal", justify: 10 } })
        expect((wrapper.element as HTMLElement).style.columnGap).toBe("10px")
    })

    it("numeric justify vertical", () => {
        const wrapper = mount(LinearLayout, { props: { direction: "vertical", justify: 15 } })
        expect((wrapper.element as HTMLElement).style.rowGap).toBe("15px")
    })

    it("numeric align horizontal", () => {
        const wrapper = mount(LinearLayout, { props: { direction: "horizontal", align: 20 } })
        expect((wrapper.element as HTMLElement).style.rowGap).toBe("20px")
    })

    it("numeric align vertical", () => {
        const wrapper = mount(LinearLayout, { props: { direction: "vertical", align: 25 } })
        expect((wrapper.element as HTMLElement).style.columnGap).toBe("25px")
    })

    it("falls back to flex-start when invalid string is passed", () => {
        const invalidAlign = "invalid" as unknown as AlignJustify

        const wrapper = mount(LinearLayout, {
            props: { align: invalidAlign },
        }) as VueWrapper<LinearLayoutInstance>

        const style = wrapper.vm.layoutStyle
        expect(style.alignItems).toBe("flex-start")
    })

    it("maps stretch differently on main vs cross axis", () => {
        const cross = mount(LinearLayout, {
            props: { align: "stretch" },
        }) as VueWrapper<LinearLayoutInstance>

        expect(cross.vm.layoutStyle.alignItems).toBe("stretch")

        const main = mount(LinearLayout, {
            props: { justify: "stretch" },
        }) as VueWrapper<LinearLayoutInstance>

        expect(main.vm.layoutStyle.justifyContent).toBe("flex-start")
    })


    type LinearLayoutInstance = ComponentPublicInstance<{
        layoutStyle: Record<string, string>
    }>

    it("applies numeric justify and align gaps correctly", () => {
        const horizontal = mount(LinearLayout, {
            props: { direction: "horizontal", justify: 10, align: 5 },
        }) as VueWrapper<LinearLayoutInstance>

        const hStyle = horizontal.vm.layoutStyle
        expect(hStyle.columnGap).toBe("10px")
        expect(hStyle.rowGap).toBe("5px")

        const vertical = mount(LinearLayout, {
            props: { direction: "vertical", justify: 10, align: 5 },
        }) as VueWrapper<LinearLayoutInstance>

        const vStyle = vertical.vm.layoutStyle
        expect(vStyle.rowGap).toBe("10px")
        expect(vStyle.columnGap).toBe("5px")
    })
})