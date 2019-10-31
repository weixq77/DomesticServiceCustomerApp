<template>
    <div id="product">
       <van-nav-bar 
        title="商品分类" 
        left-arrow
        @click-left="onClickLeft" />
        <!-- 侧边栏目导航栏 -->
        <div id="left-nav">
            <van-sidebar  v-model="Key">
                <!-- 遍历所有的栏目获取栏目分类信息 -->
                <van-sidebar-item 
                  v-for ="c in categories"
                  :key="c.id"
                  :title="c.name" 
                  @click="changeCategory(c.id)">
                
                </van-sidebar-item>
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
                :thumb="item.photo" >
                  <div slot="footer">
                        <van-stepper v-model="value" :min=0 
                        @change="numberChange(data)"
                        />
                    </div> 
                          <!-- 将新添加的name属性双向数据绑定在计数器上 -->
            </van-card>
         
        </div>
        {{value}}
        <van-submit-bar
        :price="3050"
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
            value: 0,
            Key:0,
            value:0
            //记录当前选中标签页
      }
    },
    created(){

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
         ...mapMutations("shopcar",[" addshopcar"]),
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
            this.findProductByCategory(categoryId)
        },
        numberChange(val){
            console.log("===",val)
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