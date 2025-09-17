import StackLayout from './components/StackLayout.vue'
import LinearLayout from './components/LinearLayout.vue'
import GridLayout from './components/GridLayout.vue'

const components = [StackLayout, LinearLayout, GridLayout]

export default {
    install(app: any) {
        components.forEach((c) => {
            app.component(c.name, c)
        })
    }
}
