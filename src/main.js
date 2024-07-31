import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import axios from '@/plugins/axios'
import store from '@/store'

// window.axios = require('axios')
// window.axios = axios;
import swal from 'sweetalert';
window.Swal = swal;

const vue = createApp(App)
    .use(router)
    .use(store)
    .mount('#app')

import './assets/css/main.css';

export default vue;