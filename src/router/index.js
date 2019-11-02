import Vue from 'vue'
import VueRouter from 'vue-router'
import Manages from '../pages/manages/Layout.vue'
import {getToken} from '../utils/auth.js'
import store from '../store'
import {Toast} from 'vant'

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
    beforeEnter: (to,from,next) =>{
      // 获取本地token
      let token = getToken();
      if(token){
        // 查询info
        store.dispatch('user/info',token)
        .then(()=>{
          // 当获取用户信息的时候才允许跳转
          next();
        })
      }else{
        Toast("请先登录")
        // 跳转到登录
        next({path:"/login"})
      }
    },
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
    beforeEnter: (to,from,next) =>{
      // 获取本地token
      let token = getToken();
      if(token){
        // 查询info
        store.dispatch('user/info',token)
        .then(()=>{
          // 当获取用户信息的时候才允许跳转
          next();
        })
      }else{
        this.$toast("token失效，请先登录")
        // 跳转到登录
        next({path:"/login"})
      }
    },
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
