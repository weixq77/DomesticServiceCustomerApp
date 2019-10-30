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
                  @change="changeCategory"            
                />
            </van-sidebar>
        </div>
        <div id="message">
            <van-card
                v-for=" item in products"
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
            activeName:'0',//记录当前选中标签页
            value: 0,
            activeKey:2
      }
    },
    created(){
        this.findAllProducts();
        //获取所有的栏目信息放入侧边导航栏
        this.findAllCategories();
    },
    computed:{
        ...mapState("product",["products"]),
        ...mapState("category",["categories"])

    },
    methods:{
        // 查询所有产品
        ...mapActions("category",["findAllCategories"]),
        ...mapActions("product",["findAllProducts"]),
        //跳转订单页面
        onSubmit(){
            this.$router.push("/SubmitOrder")
        },
        // 返回主页
        onClickLeft(){
             this.$router.push({path:'/manages/home'})
        },
        changeCategory(){
            this.$toast("aaa")
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