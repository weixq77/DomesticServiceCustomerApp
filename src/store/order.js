import { get, post, post_array } from '@/http/axios'
import moment from 'moment'
export default{
    namespaced: true,
    state:{
        orders: [], // 存放顾客的所有的订单信息
    },
    getters:{
        // 需要为获取器传递参数的写法
        orderStatusFilter(state){
          // 对顾客的状态进行过滤
          return function(status){
              if(status){
                // 如果传递的状态存在则返回过滤
                return state.orders.filter(item=>item.status===status);
              }else{
                // 不存在返回全部
                return state.orders;
              }
          };
        }
    },
    mutations:{
        // 更新顾客订单信息
        refreshCustomerOrder(state,orders){
            state.orders = orders;
        },
        
    },
    actions:{
        // 获取指定顾客的所有订单信息
        async loadCustomerOrderData({ commit },id) {
            // 1.  传递查询所需的参数
            const response = await get('/order/query', {customerId:id});
            // 遍历所有的订单，将订单的时间戳进行转换为日常显示时间
            response.data.forEach((item)=>{
              item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss') 
            })
            // 刷新订单数据
            commit('refreshCustomerOrder', response.data);
        },
        // 确认订单已完成
        async confirmOrder({dispatch},orderId){
          // 1.确认订单请求
          const response = await get('/order/confirmOrder', {orderId:orderId});
          return response;
        }
    }
}