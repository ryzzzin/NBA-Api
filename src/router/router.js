import Main from '@/pages/Main'
import Teams from '@/pages/Teams'
import Players from '@/pages/Players'
import About from '@/pages/About'
import Team from '@/pages/Team'
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
    {
        path: '/teams/:urlName',
        component: Team
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;