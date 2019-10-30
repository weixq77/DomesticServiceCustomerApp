import {get,post,post_array} from "@/http/axios";
export default {
  namespaced:true,
  state:{
    categories:[],//所有栏目信息
  },
  getters:{
  },
  mutations:{
    // 需要接受一个参数，这个参数就是categories
    // 刷新栏目信息
    refreshCategories(state,categories){
      state.categories = categories;
    },
  },
  actions:{
    // 查询所有栏目信息
    async findAllCategories(context){
      // 1. 查询所有栏目信息
      let response = await get("/category/findAll");
      // 2. 将栏目信息设置到state.categories中
      context.commit("refreshCategories",response.data)
    },
  }
}