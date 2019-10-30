<template>
    <div id="product">
       <van-nav-bar 
        title="商品分类" 
        left-arrow
        @click-left="onClickLeft" />
        <!-- 侧边栏目导航栏 -->
        <div id="left-nav">
            <van-sidebar  v-model="activeKey">
                <!-- 遍历所有的栏目获取栏目分类信息 -->
                <van-sidebar-item 
                  v-for ="c in categories"
                  :key="c.id"
                  :title="c.name" 
                  @change="changeCategory(c.id)"            
                />
            </van-sidebar>
        </div>
        <div id="message">
            <van-card
                v-for=" item in productById"
                :key="item.id"
                :num="item.total"
                :price="item.price"
                :desc="item.description"  
                :title="item.name"
                :thumb="item.photo">
            <van-stepper v-model="value"></van-stepper>
            </van-card>
        </div>
        <van-submit-bar
        :price="3050"
        button-text="提交订单"
        @submit="onSubmit"
        />
    </div>
</template>
<script>
import {mapState,mapMatutions,mapGetters,mapActions} from 'vuex'
export default {
    name:'product',
    data() {
      return {
            value: 0,
            activeKey:0//记录当前选中标签页
      }
    },
    created(){
        // 查询所有产品
        // this.findAllProducts();
        //获取所有的栏目信息放入侧边导航栏
        // this.findAllCategories();
    },
    computed:{
        // 根据栏目id查询到的商品信息
        ...mapState("product",["productById"]),
        // 所有栏目信息
        ...mapState("category",["categories"])

    },
    methods:{
        // 查询所有产品
        ...mapActions("category",["findAllCategories"]),
        // 根据侧边栏id查询商品信息
        ...mapActions("product",["findProductByCategory"]),
        //跳转订单页面
        onSubmit(){
            this.$router.push("/SubmitOrder")
        },
        // 返回主页
        onClickLeft(){
             this.$router.push({path:'/'})
        },
        // 当侧边栏改变的时候，根据栏目id查询对应商品显示
        changeCategory(categoryId){
            // 根据栏目id查询商品
            this.findProductByCategory(idcategoryId)
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
</style>