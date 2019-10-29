import { get, post_json} from '@/http/axios'
export default {
  namespaced: true,
  state: {
   info:{}//用户信息
  },
  mutations: {
     refreshInfo(state,info){
       state.info=info;
     }
  },
  actions: {
   async login(context,payload){
      let response=await post_json("/user/login",payload);
      let token=response.data.token;
      //将token缓存起来到
      await context.dispatch("info",token)
 
    },
    async info(context,token){
      let response= await get("/user/info",{token});
      context.commit("refreshInfo",response.data)
    }
    
  }
}
  