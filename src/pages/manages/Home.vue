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
                    v-for="c in categories.slice(0,5)"
                    :key="c.id"
                    :icon="c.icon"
                    :text="c.name"
                    @click="openCategory"
                />
                <van-grid-item>
                    <img src="./images/栏目.png" />
                </van-grid-item>
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
import {mapState,mapMatutions,mapGetters,mapActions} from 'vuex'
export default {
    created(){
        this.findAllCategories();
        this.findAllProducts();
    },
    computed:{
        ...mapState("user",["info"]),
        ...mapState("category",["categories"]),
        ...mapState("product",["products"])
   },
    methods:{
        ...mapActions("category",["findAllCategories"]),
        ...mapActions("product",["findAllProducts"]),
       openCategory(){
           this.$toast('跳转产品列表');
       },
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