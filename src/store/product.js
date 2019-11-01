import { get, post, post_array } from '@/http/axios'
export default{
    namespaced: true,
    state:{
        products: [], // 存放产品的所有的信息
    },
    getters:{
        // 将所有产品的信息进行过滤
        productCategoryFilter(state){
            // 根据传入的栏目id将产品进行分类
            return function(categoryId){
                return state.products.filter(item=>item.categoryId===categoryId);
            };
        }
    },
    mutations:{
        // 刷新所有产品信息
        refreshAllProduct(state, products) {
            // 需要接收一个参数products，state是系统给的
            state.products = products
        }
    },
    actions:{
        // 查询所有商品信息
        async findAllProducts({commit}) {
            // context是系统分发给actions的对象，里面包含的commit可以让action去触发突变，让突变去修改state
            const response = await get('/product/findAll')
            //---给每一个产品数据绑定一个number属性以达到一个添加产品数量的效果
            response.data.forEach((item)=>{
                item.number = 0;
            })
            // 2.将产品信息设置到state.products中
            // 使用commit去触发突变，先指定突变名称，再传递一个参数
            commit('refreshAllProduct', response.data)
        }
    }
}