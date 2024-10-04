import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import '@/assets/scss/main.scss'
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'

const app = createApp(App)

app.use(router)
app.mount('#app')