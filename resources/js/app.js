require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';

Vue.use(VueRouter);
Vue.use(Vuelidate);

import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Desks from './components/desks/Desks';
import ShowDesk from './components/desks/ShowDesk';

const router = new VueRouter({
   mode: 'history',
   routes: [
       {
           path:'/',
           name:'home',
           component:Home
       },
       {
           path:'/desks',
           name:'desks',
           component:Desks
       },
       {
           path:'/desks/:deskId',
           name:'showDesk',
           component:ShowDesk,
           props:true
       }
   ]

});

const app = new Vue({
   el: '#app',
    router,
    render: h => h(App)
});