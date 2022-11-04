import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/funcIndex',
        name: 'index',
        component: () => import('../views/index.vue'),
        children: [
            {path: 'priceSet', name: 'PriceSet', component: () => import('../views/DM/PriceSet.vue')},
            {path: 'recipeIndex', redirect:'/recipe' ,name: 'RecipeIndex', component: () => import('../views/DM/RecipeIndex.vue'),
                children:[
                {path: '/recipe', name: 'Recipe', component: () => import('../views/DM/Recipe.vue')},
                {path: '/dish', name: 'Dish', component: () => import('../views/DM/Dish.vue')}
                ]
            },
            {path:'buildingIndex',redirect:'/building',name:'BuildingIndex',component:()=>import('../views/DM/BuildingIndex.vue'),
                children:[
                {path: '/building', name: 'Building', component: () => import('../views/DM/Building.vue')},
                {path: '/room', name: 'Room', component: () => import('../views/DM/Room.vue')}
                ]
            },
            {path: 'dorm', name: 'Dorm', component: () => import('../views/DM/Dorm.vue')},
            {path: 'infrastructure', name: 'Infrastructure', component: () => import('../views/DM/Infrastructure.vue')},
        ]
    },
    {
        path: "/",
        alias: '/home',
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
