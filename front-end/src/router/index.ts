import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import VisorLaPalma from '../views/visorLaPalma.vue'
import Error404 from '../views/error404.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/visorLaPalma',
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  const title = to.meta.title;
  if(typeof title === 'string'){
    document.title= title;
  } else{
    document.title= 'TFG';
  }
  next();
})

export default router
