import { get, post_json,post} from '@/http/axios'
import {setToken,getToken,removeToken} from '../utils/auth.js'
export default {
  namespaced: true,
  state: {
    //将token的默认值设置为先查询本地存储中的token
    token:getToken(),
    info:{}//用户信息
  },
  mutations: {
     refreshInfo(state,info){
       state.info=info;
     },
     refreshToken(state,token){
       state.token=token;
     }
  },
  actions: {
   async login(context,payload){
      let response=await post_json("/user/login",payload);
      let token=response.data.token;   
      //将token缓存到localStorage中
      setToken(token)
      //2.将token维护起来
      context.commit("refreshToken",token)
    },
    //通过token获取info顾客信息
    async info(context,token){
      let response= await get("/user/info",{token});
      await context.commit("refreshInfo",response.data)
    },
    //退出登录，清除token
    async logout(context){
      //1.向后台请求退出
      await post("/user/logout");
      //2.清除本地token
      removeToken();
      //将token和info情空
      context.commit("refreshToken","")
    }
    
  }
}
  