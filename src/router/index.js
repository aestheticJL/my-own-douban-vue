import Vue from 'vue'
import VueRouter from 'vue-router'
import AddMovie from "../components/adminCom/AddMovie";
import WorksMana from "../components/adminCom/WorksMana";
import WriteComment from "../components/adminCom/WriteComment";
import Admin from "../views/Admin";
import Home from "../views/Home";
import Movie from "../views/Movie";

Vue.use(VueRouter);

const routes = [
    {
        path: '/Home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: '/AddMovie',
                name: 'AddMovie',
                component: AddMovie,
            },
            {
                path: '/WorksMana',
                name: 'WorksMana',
                component: WorksMana,
            },
        ]
    },
    {
        path: '/WriteComment/:id/',
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
