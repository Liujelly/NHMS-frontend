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
            {
                path: '/HealthArchives', name: 'HealthArchives', component: () => import('../views/EL/HealthArchives.vue')
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
            {path: '/user', name: 'User', component: () => import('../views/DM/User.vue')},
            
            {path: '/healthInput', name: 'HealthInput', component: () => import('../views/HM/HealthInput.vue')},
            {path: '/diseaseWarning', name: 'DiseaseWarning', component: () => import('../views/HM/DiseaseWarning.vue')},
            {path: '/healthIndex', name: 'HealthIndex', component: () => import('../views/HM/HealthIndex.vue')},
            {path: '/heathLevel', name: 'HeathLevel', component: () => import('../views/HM/HeathLevel.vue')},
            {path: '/healthIndexStandard', name: 'HealthIndexStandard', component: () => import('../views/HM/HealthIndexStandard.vue')},

            {path: '/employee', name: 'Employee', component: () => import('../views/PM/employee.vue')},
            {path: '/attendance', name: 'attendance', component: () => import('../views/PM/attendance.vue')},
            {path: '/check', name: 'check', component: () => import('../views/PM/check.vue')},
            {path: '/dept', name: 'dept', component: () => import('../views/PM/dept.vue')},
            {path: '/rewardandpunishment', name: 'rewardandpunishment', component: () => import('../views/PM/rewardandpunishment.vue')},
            {path: '/salary', name: 'salary', component: () => import('../views/PM/salary.vue')},
            {path: '/training', name: 'training', component: () => import('../views/PM/training.vue')},
            {path: '/gg', name: 'gg', component: () => import('../views/GG/gg.vue')},
            {
                path: '/donate',name: 'donate',component:()=>import('../views/GG/donate.vue')
            },
            {
                path: '/visit',name: 'visit',component:()=>import('../views/GG/visit.vue')
            },
            {
                path: '/patrol',name: 'patrol',component:()=>import('../views/GG/patrol.vue')
            },
            {
                path: '/applytable',name: 'applytable',component:()=>import('../views/GG/applytable.vue')
            },
            {path: '/IWarehouse', name: 'IWarehouse', component: () => import('../views/WM/IWarehouse.vue')},
            {path: '/OWarehouse', name: 'OWarehouse', component: () => import('../views/WM/OWarehouse.vue')},
            {path: '/Warehouse', name: 'Warehouse', component: () => import('../views/WM/Warehouse.vue')},
            {path: '/Claim', name: 'Claim', component: () => import('../views/WM/Claim.vue')},
            {path: '/InRecord', name: 'InRecord', component: () => import('../views/WM/InRecord.vue')},
            {path: '/OutRecord', name: 'OutRecord', component: () => import('../views/WM/OutRecord.vue')},
            {path: '/Return', name: 'Return', component: () => import('../views/WM/Return.vue')},
            {path: '/InventoryAlerts', name: 'InventoryAlerts', component: () => import('../views/WM/InventoryAlerts.vue')},
            {path: '/Vonder', name: 'Vonder', component: () => import('../views/WM/Vonder.vue')},
            {
                path: '/Advance', name: 'Advance', component: () => import('../views/CW/Advance.vue')
            },
            {
                path: '/ElderlyPrice', name: 'ElderlyPrice', component: () => import('../views/CW/ElderlyPrice.vue')
            },
            {
                path: '/Reserve', name: 'Reserve', component: () => import('../views/CW/Reserve.vue')
            },
            
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
