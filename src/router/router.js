import Main from '@/pages/Main'
import Players from '@/pages/Players'
import Player from '@/pages/Player'
import Teams from '@/pages/Teams'
import Team from '@/pages/Team'
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
    {
        path: '/teams/:urlName',
        component: Team
    },
    {
        path: '/players/:personId',
        component: Player
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;