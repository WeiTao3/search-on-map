import { createApp } from 'vue'
import App from './App.vue'
import store from './store.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap'

import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App);
app.use(store);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCRAXLCtAB8WupITEpCmbObNKwf0wVpyLo',
        libraries: "places"
    },
}).mount('#app')