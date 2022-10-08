import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue'),
        children: [
            {path: 'priceSet', name: 'PriceSet', component: () => import('../views/DM/PriceSet.vue')}
        ]
    },
    {
        path: "/home",
        name: 'Home',
        component: () => import('../views/Home.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
