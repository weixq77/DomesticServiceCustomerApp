import { get,post } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    address:[],//当前用户所有地址
    updateAddress:{},//存放当前需要修改的地址
    btnDelete:false,//判断添加地址中的删除按钮是否需要出现
    defaultAddress:0,//默认地址id
  },
  getters:{
    
  },
  mutations: {
    // 刷新当前用户的的所有地址
    refreahAddress(state,address){
      state.address=address;
      // 设置默认地址id
      if(state.defaultAddress === 0){
        state.defaultAddress = address[0].id;
      }
    },
    // 设置默认地址id
    setDefaultAddressId(state,id){
      state.defaultAddress = id;
    },
    // 设置存储当前需要修改的地址信息
    setUpdateAddress(state,addressObj){
      if(addressObj){
        state.updateAddress=addressObj;
      }else{
        state.updateAddress={};
      }
    },
    // 设置删除地址按钮显示
    btnDeleteShow(state){
      state.btnDelete = true;
    },
    // 设置删除地址按钮隐藏
    btnDeleteClose(state){
      state.btnDelete = false;
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
        return response
      },
      // 删除地址信息
      async deleteAddress(context,id){
        let response = await get("/address/deleteById",{id});
        return response
      }
  }
}