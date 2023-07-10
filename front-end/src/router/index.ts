import { createRouter, createWebHistory, onBeforeRouteLeave, RouteRecordRaw } from 'vue-router'
import VisorLaPalma from '../views/visorLaPalma.vue'
import Error404 from '../views/error404.vue'
import Login from '../views/login.vue'
import Signup from '../views/signup.vue'
import Profile from '../views/profile.vue'
import CrearIncidencia from '../views/crearIncidencia.vue'
import CrearAlarma from '../views/crearAlarma.vue'
import EditarIncidencia from '../views/editarIncidencia.vue'
import SuperAdminControl from '../views/superAdminControl.vue'

import { useAuthStore } from "@/composables/useAuthStore";
import { useMapStore } from "@/composables/useMapStore";

import { roles } from '@/api/authenticationAPI'

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
      title: 'TFG | Profile',
      requiresAuth: true,
      authRol: [roles.user, roles.admin]
    }
  },
  {
    path:'/visorLaPalma/editarIncidencia',
    component: EditarIncidencia,
    name: 'EditarIncidencia',
    meta:{
      title: 'TFG | Editar incidencia',
      requiresAuth: true,
      authRol: [roles.admin]
    }
  },
  {
    path:'/visorLaPalma/crearIncidencia',
    component: CrearIncidencia,
    name: 'CrearIncidencia',
    meta:{
      title: 'TFG | Crear incidencia',
      requiresAuth: true,
      authRol: [roles.user,roles.admin]
    }
  },
  {
    path:'/visorLaPalma/crearAlarma',
    component: CrearAlarma,
    name: 'CrearAlarma',
    meta:{
      title: 'TFG | Crear alarma',
      requiresAuth: true,
      authRol: [roles.user,roles.admin]
    }
  },
  {
    path:'/visorLaPalma/superAdminControl',
    component: SuperAdminControl,
    name: 'SuperAdminControl',
    meta:{
      title: 'TFG | Super admin control',
      requiresAuth: true,
      authRol: [roles.user]
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  const { 
    clearAuthResponse,
    getRole,
    userAuthenticated,
  } = useAuthStore();

  const {
    clearMapResponse
  } = useMapStore();

  clearAuthResponse();

  clearMapResponse();

  if(to.meta.requiresAuth){
    if (userAuthenticated){
      if(Array.isArray(to.meta.authRol) && to.meta.authRol.includes(getRole.value)){
        document.title = `${to.meta.title}`;
        next()
      } else {
        next({ path: '/visorLaPalma/acessoDenegado'})
      }
    } else {
      next({path: '/visorLaPalma/login'})
    }
  } else {
    document.title = `${to.meta.title}`;
    next();
  }
})

export default router
