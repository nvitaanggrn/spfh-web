import {createApp} from 'vue'
import VueFeather from 'vue-feather'
import Datepicker from '@vuepic/vue-datepicker'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App);
app.use(store)
app.use(router)
app.component(VueFeather.name, VueFeather);
app.component(Datepicker.name, Datepicker);
app.mount('#app')