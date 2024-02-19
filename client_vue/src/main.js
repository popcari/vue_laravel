import { createApp } from 'vue'
import './style.css'
import router from './router/index.js'
import App from './App.vue'

// bootstrap layout
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'

let app = createApp(App)
app.use(router)
app.mount('#app')
