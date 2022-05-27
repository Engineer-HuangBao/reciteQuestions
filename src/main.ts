import router from './router/index'
import https from './request/index'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/icons/iconfont.css'


const app = createApp(App)

app.use(router)
app.config.globalProperties.$router = router
app.config.globalProperties.$https = https
app.mount('#app')
