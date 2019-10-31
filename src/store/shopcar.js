import { get, post, post_array } from '@/http/axios'
export default {
  namespaced: true,
  state: {
   orderLines:[]
  },
  mutations: {
   addshopcar(state,orderLine){
       //数据格式
       //productId ,price,number,productName
       state.orderLine.push(orderLine)
       //将产品信息结构为订单项的信息
       
   }
  },
  actions: {
    
  }
}