import Main from '@/pages/Main'
import Teams from '@/pages/Teams'
import Players from '@/pages/Players'
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
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;