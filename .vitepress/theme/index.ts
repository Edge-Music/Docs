import DefaultTheme from 'vitepress/theme'
import Waline from '../components/Waline.vue'
import ServiceStatus from '../components/ServiceStatus.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Waline', Waline)
    app.component('ServiceStatus', ServiceStatus)
  }
}