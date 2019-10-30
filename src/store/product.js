import { get, post, post_array } from '@/http/axios'
export default{
    namespaced: true,
    state:{
        products: [], // 存放产品的所有的信息
    },
    getters:{
        // 需要为获取器传递参数的写法
        productStatusFilter(state){
            // 对产品的状态进行过滤
            return function(status){
                if(status){
                    // 如果传递的状态存在则返回过滤
                return state.products.filter(item=>item.status===status);
                }else{
                    // 不存在返回全部
                    return state.products;
                }
            };
        }
    },
    mutations:{
        // 刷新产品信息
        refreshProduct(state, products) {
            // 需要接收一个参数products，state是系统给的
            state.products = products
        },
    },
    actions:{
        async findAllProducts(context) {
            // context是系统分发给actions的对象，里面包含的commit可以让action去触发突变，让突变去修改state
            const response = await get('/product/findAll')
            // 2.将产品信息设置到state.products中
            // 使用commit去触发突变，先指定突变名称，再传递一个参数
            context.commit('refreshProduct', response.data)
          },
          //设定一个异步函数来通过id查找产品的信息
          async findProductByCategory(context,id){
              let resulet=await get('/product/findByCategoryId',{id})
              console.log("查询结果：",resulet)
              //触发突变，将查询到的结果返回product中
              await context.commit('refreshProduct',resulet.data)
              return resulet;
          }
    }
}