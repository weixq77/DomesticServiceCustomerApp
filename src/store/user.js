import { get, post_json} from '@/http/axios'
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
      // await context.dispatch("info",token)
      //将token缓存到localStorage中
      setToken(token)
      //2.将token维护起来
      context.commit("refreshToken",token)
    },
    async info(context,token){
      let response= await get("/user/info",{token});
      context.commit("refreshInfo",response.data)
    }
    
  }
}
  