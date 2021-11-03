import router from './router/router';
import { createApp } from 'vue'
import App from './App'

const app = createApp(App)

app
.use(router)
.mount('#app')
