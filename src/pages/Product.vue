<template>
    <div id="product">
       <van-nav-bar 
        title="商品分类" 
        left-arrow
        @click-left="onClickLeft" />
        <!-- 侧边栏目导航栏 -->
        <div id="left-nav">
            <van-sidebar  v-model="index">
                <!-- 遍历所有的栏目获取栏目分类信息 -->
                <van-sidebar-item 
                  v-for ="(c,index) in categories"
                  :key="c.id"
                  :title="c.name" 
                  @click="changeCategory(c.id,index)">
                </van-sidebar-item>
            </van-sidebar>
        </div>
        <!-- 产品列表 -->
        <div id="message">
            <van-card
                v-for="item in productCategoryFilter(categoryId)"
                :key="item.id"
                :price="item.price" 
                :title="item.name"
                :thumb="item.photo">
                 <div slot="desc">
                    <p style="color:rgb(132, 127, 127);">{{item.description}}</p>
                </div> 
                <div slot="footer">
                    <van-stepper v-model="item.number" :min=0 
                        @plus="numberPlus(item)"
                        @minus="nubmberMinus(item)"
                    />
                </div> 
            </van-card>
        </div>
            <!-- 提交订单总额按钮 -->
            <van-submit-bar
                :price="totalMoney*100"
                button-text="提交订单"
                @submit="onSubmit"
            />
    </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
    name:'product',
    data() {
      return {
           
      }
    },
    created(){
        // 查询所有栏目信息
        // this.findAllCategories();
        // 查询所有产品信息
        // this.findAllProducts();
        
    },
    computed:{
         // 在状态机中获取在首页被激活的栏目id及索引
        ...mapState("lastpage",["categoryId","categoryIndex"]),
        // 根据栏目id筛选商品信息   
        ...mapGetters("product",["productCategoryFilter"]),
        // 订单项
        ...mapState("shopcar",["orderLines"]),
        // 所有栏目信息
        ...mapState("category",["categories"]),
        // 当前所有订单的总额
        ...mapGetters("shopcar",["totalMoney"]),
        index:{//状态机里需要记录当前左侧栏激活的index，需要用get和set设置
            get(){
                return this.categoryIndex;
            },
            set(val){
                this.setCategoryIndex(val);
            }
        }
    },
    methods:{
        // 查询所有栏目
        ...mapActions("category",["findAllCategories"]),
        // 查询所有商品信息
        ...mapActions("product",["findAllProducts"]),
        // 添加商品至购物车  将商品从购物车中删除  清空购物车
        ...mapMutations("shopcar",["addShopcar","deleteShopcar","clearShopcar"]),
        // 在状态机中存储当前被激活的栏目的id及栏目索引
        ...mapMutations("lastpage",["setCategoryId","setCategoryIndex"]),
        //确认订单，跳转确认订单页面
        onSubmit(){
            // 传递一个当前被激活的栏目id,及栏目索引
            // this.$router.push({path:"/SubmitOrder",query:{index:this.activeKey,categoryId:this.categoryId}})
            this.$router.push({path:"/SubmitOrder"})
        },
        // 返回主页
        onClickLeft(){
            this.$dialog.confirm({
                    message: '您确定要退出选择商品吗？',
                    confirmButtonText:'退出',
                    cancelButtonText:'手滑了'
                }).then(() => {
                    // 跳转回主页
                    this.$router.push({path:"/"});
                    // 确认退出则清空购物车并回到主页
                    this.clearShopcar();
                }).catch(() => {
                // on cancel
                });
            
        },
        // 当侧边栏改变的时候，根据栏目id查询对应商品显示
        changeCategory(categoryId){
            // 设置栏目id
            this.setCategoryId(categoryId);
            
        },
        // 当选中的商品数量增加时被改变的时候触发该函数
        numberPlus(data){
            // 将商品信息和数量封装好
            let orderLine = {
                productId:data.id,
                productName:data.name,
                price:data.price,
                number:++data.number
            }
            // 将当前商品添加至购物车中
            this.addShopcar(orderLine);
        },
        nubmberMinus(data){
            // 将商品信息和数量封装好
            let orderLine = {
                productId:data.id,
                productName:data.name,
                price:data.price,
                number:--data.number
            }
            
            if(orderLine.number === 0){
                // 若当前商品数量已经为0了，则将其从购物车中删除
                this.deleteShopcar(orderLine.productId);
            }else{
                // 将当前商品添加至购物车中
                this.addShopcar(orderLine)
            }
        }

    }
}
</script>
<style scoped>
#message{
    margin-left: 90px;
}
#left-nav{
    position: absolute;
}
#stapper{
    position: absolute;
    z-index: 5;
}
</style>