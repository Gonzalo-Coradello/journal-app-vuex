import './styles/styles.scss'

import { createApp, devtools } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(devtools)

app.mount('#app')
