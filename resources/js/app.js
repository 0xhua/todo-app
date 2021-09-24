require('./bootstrap');

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faPlusSquare, faSignInAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vmodal from 'vue-js-modal'

import JwPagination from 'jw-vue-pagination';

import Login  from "./pages/Login.vue"
import Dashboard  from "./pages/Dashboard.vue"
import Register  from "./pages/Register.vue"

Vue.component('jw-pagination', JwPagination);

library.add(faPlusCircle,faPlusSquare, faTrashAlt, faSignInAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-calendar', Calendar)
Vue.component('v-date-picker', DatePicker)
Vue.use(Vmodal, { dialog: true })

Vue.use(VueRouter);

const router = new VueRouter({
    routes:[
        {
            path: '/',
            component: Login
        },
        {
            name: 'dashboard',
            path: '/dashboard',
            component: Dashboard
        },
        {
            name: 'register',
            path: '/register',
            component: Register
        }
    ]
})


const app  = new Vue({
    el: '#app',
    router,
    components: { App }
});
