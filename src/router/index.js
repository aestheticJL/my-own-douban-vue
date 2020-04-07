import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import addMovie from "../views/addMovie";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addMovie',
    name: 'addMovie',
    component: addMovie
  },
];

const router = new VueRouter({
  routes
});

export default router
