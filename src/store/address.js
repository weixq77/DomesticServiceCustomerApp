import { get } from '@/http/axios'
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
    async findAddress(context,id){
       let response=await get("/address/findByCustomerId",{id});   
       await context.commit('refreahAddress',response.data)
       return response;
    }
  }
}