import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import request from "@/utils/request";

const app = createApp(App)
app.config.globalProperties.request = request
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
