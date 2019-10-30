import { get,post } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    address:[],//当前用户所有地址
    updateAddress:{},//存放当前需要修改的地址
  },
  getters:{
    
  },
  mutations: {
    // 刷新当前用户的的所有地址
    refreahAddress(state,address){
      state.address=address;
    },
    // 设置存储当前需要修改的地址信息
    setUpdateAddress(state,addressObj){
      if(addressObj){
        state.updateAddress=addressObj;
      }else{
        state.updateAddress={};
      }
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
      async saveAddress(payload){
        let response = await post("/address/saveOrUpdate",payload);
        return response
      }
  }
}