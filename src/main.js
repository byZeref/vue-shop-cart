import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'; // Sweet Alert
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'

import 'vue3-toastify/dist/index.css';
import './assets/main.css'
import './assets/styles.css' // Tailwind
import 'sweetalert2/dist/sweetalert2.min.css'; // Sweet Alert
// import 'dotenv/config'

const app = createApp(App)
const pinia = createPinia()

// Router
app.use(router)

// Sweet Alert
const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: 'gray',
};
app.use(VueSweetalert2, options)

// VueForm
app.use(Vueform, vueformConfig)

// Pinia
app.use(pinia)

app.mount('#app')
