require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Desks from './components/desks/Desks';

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
       }
   ]

});

const app = new Vue({
   el: '#app',
    router,
    render: h => h(App)
});