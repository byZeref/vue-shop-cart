import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'; // Sweet Alert

import './assets/main.css'
import './assets/styles.css' // Tailwind
import 'sweetalert2/dist/sweetalert2.min.css'; // Sweet Alert

const app = createApp(App)

app.use(router)

// Sweet Alert
const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: 'gray',
};
app.use(VueSweetalert2, options)


app.mount('#app')
