import StackLayout from './components/StackLayout.vue'
import LinearLayout from './components/LinearLayout.vue'
import GridLayout from './components/GridLayout.vue'
import type {App} from "vue";

const components = [StackLayout, LinearLayout, GridLayout]

export default {
    install(app: App) {
        components.forEach((c) => {
            app.component(c.name ?? "layvuet", c)
        })
    }
}
