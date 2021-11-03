import Main from '../pages/Main';
import Teams from '../pages/Teams'
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/Teams',
        component: Teams
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;