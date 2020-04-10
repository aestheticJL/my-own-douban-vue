import Vue from 'vue'
import VueRouter from 'vue-router'
import AddMovie from "../components/adminCom/AddMovie";
import WorksMana from "../components/adminCom/WorksMana";
import WriteComment from "../components/adminCom/WriteComment";
import Admin from "../views/adminVue/Admin";

Vue.use(VueRouter);

const routes = [
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
            {
                path: '/WriteComment',
                name: 'WriteComment',
                component: WriteComment,
            },
        ]
    },
];

const router = new VueRouter({
    routes
});

export default router
