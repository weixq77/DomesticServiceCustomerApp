import { get, post, post_array } from '@/http/axios'
import _ from 'lodash'
export default {
  namespaced: true,
  state: {
    // [productId=>{productId,productName,price,number}]
   orderLines:new Map() //存放当前被选中的商品的信息及数量
  },
  getters:{
    // 计算总额
    totalMoney(state){
      let total = 0;
      // 遍历订单项计算总额
      for(let line of state.orderLines.values()){
        total += line.number * line.price;
      }
      return total;
    }
  },
  mutations:{
    // 添加订单至购物车
    addShopcar(state,orderLine){
      //数据格式
      //{productId ,price,number,productName}
      // 如果商品已经存在则数量增加
      if(state.orderLines.has(orderLine.productId)){
        // 商品已有
        state.orderLines.get(orderLine.productId).number = orderLine.number;
      }else{
        // 商品还不存在
        state.orderLines.set(orderLine.productId,orderLine);
        
      }
      //使用lodash强制让getters检测到刷新
      state.orderLines = _.clone(state.orderLines);

    },
    // 将订单从购物车中删除
    deleteShopcar(state,productId){
      state.orderLines.delete(productId);
      //使用lodash强制让getters检测到刷新
      state.orderLines = _.clone(state.orderLines);
    },
    // 清空购物车
    clearShopcar(state){
      state.orderLines.clear();
      //使用lodash强制让getters检测到刷新
      state.orderLines = _.clone(state.orderLines);
    }
  },
  actions: {
    
  }
}