import Vue from 'vue'
import VueRouter from 'vue-router'
import Manages from '../pages/manages/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/manages/home',//重定向到首页
  },
  {
    path: '/manages',
    name: 'manages',
    component: Manages,
      children:[{
        path:"home",//首页
        component: () => import('../pages/manages/Home.vue')
      },
      {
        path:"order",//订单页
        component: () => import('../pages/manages/Order.vue')
      }, 
      {
        path:"user",//用户页
        component: () => import('../pages/manages/User.vue')
      },
    ]
  },
  {
    path: '/login',//登录
    name: 'login',
    component: () => import('../pages/Login.vue')
  },
  {
    path:"/address",//地址显示页
    component: () => import('../pages/Address.vue')
  },
  {
    path:"/saveaddress",//保存地址页
    component: () => import('../pages/saveAddress.vue')
  },
  {
    path:"/product",//产品展示页
    component: () => import('../pages/Product.vue')
  }, 
  {
    path:"/submitOrder",//产品展示页
    component: () => import('../pages/SubmitOrder.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
