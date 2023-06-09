import { createRouter, createWebHistory, onBeforeRouteLeave, RouteRecordRaw } from 'vue-router'
import VisorLaPalma from '../views/visorLaPalma.vue'
import Error404 from '../views/error404.vue'
import Login from '../views/login.vue'
import Signup from '../views/signup.vue'
import Profile from '../views/profile.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/visorLaPalma',
    name: 'VisorLaPalma',
    component: VisorLaPalma,
    meta:{
      title: 'TFG | Visor la Palma'
    }    
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/visorLaPalma'
  },
  {
    path: '/visorLaPalma/:catchAll(.*)',
    component: Error404,
    meta:{
      title: 'TFG | Error 404'
    }
  },
  {
    path:'/visorLaPalma/login',
    component: Login,
    meta:{
      title: 'TFG | Login'
    }
  },
  {
    path:'/visorLaPalma/signup',
    component: Signup,
    meta:{
      title: 'TFG | Signup'
    }
  },
  {
    path:'/visorLaPalma/profile',
    component: Profile,
    meta:{
      title: 'TFG | Profile'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  document.title = `${to.meta.title}`;
  next();
})

export default router
