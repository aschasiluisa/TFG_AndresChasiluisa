import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.js"

import { i18n } from  "./i18n/index"

createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
    .mount('#app')
