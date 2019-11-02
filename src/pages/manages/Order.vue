<template>
    <div id="order">
        
        <div class="orderTab">
            <van-nav-bar title="订单" fixed/>
        </div>
            
        <van-tabs v-model="activeName" swipeable :offset-top="46" sticky>
            <van-tab title="全部订单" name="a">
                <div v-if="orders!=''">
                    <div v-for="item in orders" :key="item.id">
                        <div v-if="item.status==='待付款'">
                            <vicki-cardOrder :data=item :choseCard=1></vicki-cardOrder>
                        </div>
                        <div v-else-if="item.status==='待确认'">
                            <vicki-cardOrder :data=item :choseCard=2></vicki-cardOrder>
                        </div>
                        <div v-else>
                            <vicki-cardOrder :data=item></vicki-cardOrder>
                        </div>
                    </div>
                </div>
                <div v-else style="width:100%;height:100%">
                    <img style="width:100%;height:100%" src="./images/tips2.jpg">
                </div>
                
            </van-tab>
            <van-tab title="待付款" name="b">
                <div v-if="orderStatusFilter('待付款')!=''">
                    <div v-for="item in orderStatusFilter('待付款')" :key="item.id">
                        <vicki-cardOrder :data=item :choseCard=1></vicki-cardOrder>
                    </div>
                </div>
                <div v-else style="width:100%;height:100%">
                    <img style="width:100%;height:100%" src="./images/tips2.jpg">
                </div>
            </van-tab>
            <van-tab title="待服务" name="c">
                <div v-if="orderStatusFilter('待服务')!=''">
                    <div v-for="item in orderStatusFilter('待服务')" :key="item.id">
                        <vicki-cardOrder :data=item ></vicki-cardOrder>
                    </div>
                </div>
                <div v-else style="width:100%;height:100%">
                    <img style="width:100%;height:100%" src="./images/tips2.jpg">
                </div>
               
            </van-tab>
            <van-tab title="待确认" name="d">
                <div v-if="orderStatusFilter('待确认')!=''">
                    <div v-for="item in orderStatusFilter('待确认')" :key="item.id">
                        <vicki-cardOrder :data=item :choseCard=2></vicki-cardOrder>
                    </div>
                </div>
                <div v-else style="width:100%;height:100%">
                    <img style="width:100%;height:100%" src="./images/tips2.jpg">
                </div>
            </van-tab>
            <van-tab title="已完成" name="e">
                <div v-if="orderStatusFilter('已完成')!=''">
                    <div v-for="item in orderStatusFilter('已完成')" :key="item.id">
                        <vicki-cardOrder :data=item ></vicki-cardOrder>
                    </div>
                </div>
                <div v-else style="width:100%;height:100%">
                    <img style="width:100%;height:100%" src="./images/tips2.jpg">
                </div>
            </van-tab>
        </van-tabs>        

    </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'
export default {
    name:'order',
    data() {
        return {
            activeName:'a',//记录当前选中标签页
        }
    },
    created(){
        this.loadData();
        // if(this.info.id){
        //     // 如果用户id存在，则直接加载订单数据
        //     this.loadData();
        // }else{
        //     // 用户id不存在，则先拿token去获取用户id
        //     if(this.token){
        //         //如果有token请求查出查询出token所带的顾客信息info
        //         this.getInfo(this.token)
        //         // 获取用户id了再去加载订单
        //         this.loadData();
        //     }else{
        //         //如果没有token跳转到登录页面
        //         this.$toast("token失效，请先登录")
        //         this.$router.push({path:"/login"})
        //     }
        // }
    },
    computed:{
        // 顾客的全部订单
        ...mapState("order",["orders"]),
        // 顾客信息,token
        ...mapState("user",["info","token"]),
        // 指定状态的订单
        ...mapGetters("order",["orderStatusFilter"])
    },
    methods:{
        // 查询该顾客的所有订单的请求,确认订单完成
        ...mapActions("order",["loadCustomerOrderData","confirmOrder"]),
        // 查询所有的产品
        ...mapActions("product",["findAllProducts"]),
        ...mapActions('user',{
            'getInfo':'info'
        }),
        // 普通方法
        // fun:加载数据
        loadData(){
            this.findAllProducts();
            this.loadCustomerOrderData(this.info.id);
        }

    }
}
</script>
<style scoped>
.orderTab{
    height: 50px;
}
#status{
    color: orangered;
    font-weight: bold;
}
</style>