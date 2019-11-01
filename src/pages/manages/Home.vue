<template>
    <div class="home">
        <van-nav-bar
            title="主页"
            />
     <!-- 顶部轮播图 -->
        <van-row> 
            <van-swipe :autoplay="3000" indicator-color="white" class="banner">
                <van-swipe-item ><img src="./images/首页1.jpg"></van-swipe-item>
                <van-swipe-item><img src="./images/首页2.jpg"></van-swipe-item>
                <van-swipe-item><img src="./images/首页3.jpg"></van-swipe-item>
                <van-swipe-item><img src="./images/首页4.jpg"></van-swipe-item>
            </van-swipe>
        </van-row> 
        <!-- 栏目信息+图片导航 -->
        <div class="categoryList">      
            <van-grid :column-num="3" >
                <van-grid-item
                    v-for="(c,index) in categories.slice(0,6)"
                    :key="c.id"
                    :icon="c.icon"
                    :text="c.name"
                    @click="openCategory(c.id,index)"
                />
            </van-grid>
       </div>
       <div class="productList">
           <van-grid :column-num="2" >
                <van-grid-item
                    v-for="p in products.slice(0,5)"
                    :key="p.id"
                    :icon="p.photo"
                    :text="p.name"
                    :value="p.id"
                    @click="openProduct"
                />
         </van-grid>
       </div>
    </div>
    
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
    created(){
        // 查询所有的栏目
        this.findAllCategories();
        // 查询所有商品展示
        this.findAllProducts();
    },
    computed:{
        // 所有栏目信息
        ...mapState("category",["categories"]),
        // 所有商品信息
        ...mapState("product",["products"])
   },
    methods:{
        // 查询所有的栏目
        ...mapActions("category",["findAllCategories"]),
        // 查询所有的产品
        ...mapActions("product",["findAllProducts"]),
        // 在状态机中存储当前被激活的栏目的id及栏目索引
        ...mapMutations("lastpage",["setCategoryId","setCategoryIndex"]),
        // 打开栏目+商品展示页
        openCategory(categoryId,index){
            // 在状态机中存储当前被激活的栏目的id及栏目索引
            this.setCategoryId(categoryId);
            this.setCategoryIndex(index);
            //   跳转商品展示页面(传递栏目id和索引)
            this.$router.push('/product');
            // this.$router.push({path:'/product',query:{categoryId,index}})
        },
        // 商品详情页
        openProduct(){
            this.$toast('跳转商品详情页');
        }
   }
}
</script>
<style scoped>
    .banner img{
        height: 170px;
    }
    img{
        width: 100%;
    }
</style>