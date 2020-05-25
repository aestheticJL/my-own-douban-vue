import Vue from 'vue'
import VueRouter from 'vue-router'
import AddMovie from "../components/adminCom/AddMovie";
import WorksMana from "../components/adminCom/WorksMana";
import WriteComment from "../components/adminCom/WriteComment";
import Admin from "../views/Admin";
import Home from "../views/Home";
import Movie from "../views/Movie";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: '/admin/AddMovie',
                name: 'AddMovie',
                component: AddMovie,
            },
            {
                path: '/admin/WorksMana',
                name: 'WorksMana',
                component: WorksMana,
            },
        ]
    },
    {
        path: '/admin/WriteComment/:id/',
        name: 'WriteComment',
        component: WriteComment,
    },
    {
        path: '/Movie/:id/',
        name: 'Movie',
        component: Movie,
    },
];

const router = new VueRouter({
    routes
});

export default router
