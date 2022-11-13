import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/index.vue'),
        children: [
            {
                path: '/CheckIn', name: 'CheckIn', component: () => import('../views/EL/CheckIn.vue')
            },
            {
                path: '/Approval', name: 'Approval', component: () => import('../views/EL/Approval.vue')
            },
            {
                path: '/Elderly', name: 'Elderly', component: () => import('../views/EL/Elderly.vue')
            },
            {
                path: '/Dormitory', name: 'Dormitory', component: () => import('../views/EL/Dormitory.vue')
            },
            {
                path: '/Retreat', name: 'Retreat', component: () => import('../views/EL/Retreat.vue')
            },
            {
                path: '/RApproval', name: 'RApproval', component: () => import('../views/EL/RApproval.vue')
            },
            {
                path: '/LeaveApproval', name: 'LeaveApproval', component: () => import('../views/EL/LeaveApproval.vue')
            },
            {
                path: '/BackApproval', name: 'BackApproval', component: () => import('../views/EL/BackApproval.vue')
            },
            {
                path: '/InArchives', name: 'InArchives', component: () => import('../views/EL/InArchives.vue')
            },
            {
                path: '/OutArchives', name: 'OutArchives', component: () => import('../views/EL/OutArchives.vue')
            },
            {
                path: '/LeaveArchives', name: 'LeaveArchives', component: () => import('../views/EL/LeaveArchives.vue')
            },

            {path: '/priceSet', name: 'PriceSet', component: () => import('../views/DM/PriceSet.vue')},
            {path: '/recipeIndex', redirect:'/recipe' ,name: 'RecipeIndex', component: () => import('../views/DM/RecipeIndex.vue'),
                children:[
                {path: '/recipe', name: 'Recipe', component: () => import('../views/DM/Recipe.vue')},
                {path: '/dish', name: 'Dish', component: () => import('../views/DM/Dish.vue')}
                ]
            },
            {path:'/buildingIndex',redirect:'/building',name:'BuildingIndex',component:()=>import('../views/DM/BuildingIndex.vue'),
                children:[
                {path: '/building', name: 'Building', component: () => import('../views/DM/Building.vue')},
                {path: '/room', name: 'Room', component: () => import('../views/DM/Room.vue')}
                ]
            },
            {path: '/dorm', name: 'Dorm', component: () => import('../views/DM/Dorm.vue')},
            {path: '/infrastructure', name: 'Infrastructure', component: () => import('../views/DM/Infrastructure.vue')},
            {path: '/log', name: 'Log', component: () => import('../views/DM/Log.vue')},
            {path: '/permissions', name: 'Permissions', component: () => import('../views/DM/Permissions.vue')},
            {path: '/user', name: 'User', component: () => import('../views/DM/User.vue')}
        ] 
    },
    {
        path: "/home",
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: "/",
        alias: '/login',
        name: 'Login',
        component: () => import('../views/login.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next)=>{
    const token=sessionStorage.getItem('token')
    if(to.name!=='Login'&&!token){
        next({name:'Login'})
    }else{
        next();
    }
}

)

export default router
