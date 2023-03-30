import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios';

//app.config.globalProperties.$axios = axios;

// const app = createApp(App);

// app.provide('$axios', axios);

// app.mount('#app');






createApp(App).use(router).use(router).mount('#app')
