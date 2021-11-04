import Main from '@/pages/Main'
import Teams from '@/pages/Teams'
import Players from '@/pages/Players'
import About from '@/pages/About'
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        alias: '/main',
        component: Main
    },
    {
        path: '/teams',
        component: Teams
    },
    {
        path: '/players',
        component: Players
    },
    {
        path: '/about',
        component: About
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;