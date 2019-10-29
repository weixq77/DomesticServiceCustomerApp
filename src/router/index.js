import Vue from 'vue'
import VueRouter from 'vue-router'
import Manages from '../pages/manages/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'manages',
    component: Mananges,
    children:[{
      path:"home",
      component: () => import('../pages/manages/Home.vue')
    },
    {
      path:"order",
      component: () => import('../pages/manages/Order.vue')
    },
    {
      path:"address",
      component: () => import('../pages/manages/Address.vue')
    },
    {
      path:"user",
      component: () => import('../pages/manages/User.vue')
    },
  ]
    
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
