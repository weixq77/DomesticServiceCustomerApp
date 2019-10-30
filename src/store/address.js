import { get,post } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    address:[]
  },
  getters:{
    
  },
  mutations: {
   refreahAddress(state,address){
     state.address=address;
   }
  },
  actions: {
    // 查询用户所有地址信息
      async findAddress(context,id){
        let response=await get("/address/findByCustomerId",{id});   
        await context.commit('refreahAddress',response.data)
        return response;
      },
      // 添加用户的地址信息
      async saveAddress(context,payload){
        let response = await post("/address/saveOrUpdate",payload);
        // 存储数据成功请求刷新用户地址
        context.dispatch('findAddress');
        return response
      }
  }
}