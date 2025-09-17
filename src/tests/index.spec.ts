import { describe, it, expect, vi } from "vitest"
import { createApp } from "vue"
import plugin from "../index"
import StackLayout from "../components/StackLayout.vue"
import LinearLayout from "../components/LinearLayout.vue"
import GridLayout from "../components/GridLayout.vue"

describe("Library Plugin (index.ts)", () => {
    it("should install plugin without errors", () => {
        const app = createApp({})
        expect(() => app.use(plugin)).not.toThrow()
    })

    it("should register all components globally", () => {
        const app = createApp({})

        const spy = vi.spyOn(app, "component")

        app.use(plugin)

        expect(spy).toHaveBeenCalledWith(StackLayout.name, StackLayout)
        expect(spy).toHaveBeenCalledWith(LinearLayout.name, LinearLayout)
        expect(spy).toHaveBeenCalledWith(GridLayout.name, GridLayout)
        expect(spy).toHaveBeenCalledTimes(3)
    })
})
