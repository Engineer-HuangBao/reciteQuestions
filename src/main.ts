import router from './router/index'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/icons/iconfont.css'


const app = createApp(App)

app.use(router)
app.config.globalProperties.$router = router
app.mount('#app')
