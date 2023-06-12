import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import store from './store/example/index'
const app = createApp(App)

app.use(store)

app.use(router)
app.mount('#app')
