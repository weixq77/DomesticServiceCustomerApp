import Vue from 'vue'
import VueRouter from 'vue-router'
import Manages from '../pages/manages/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/manages',
    name: 'manages',
    component: Manages,
    redirect:'/manages/home',
    children:[{
      path:"home",
      component: () => import('../pages/manages/Home.vue')
    },
    {
      path:"order",
      component: () => import('../pages/manages/Order.vue')
    },
    
    {
      path:"user",
      component: () => import('../pages/manages/User.vue')
    },
  ]
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../pages/Login.vue')
  },
  {
    path:"/address",
    component: () => import('../pages/Address.vue')
  },
  {
    path:"/addaddress",
    component: () => import('../pages/addAddress.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
