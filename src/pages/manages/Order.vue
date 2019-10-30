<template>
    <div id="order">
        
        <div class="orderTab">
            <van-nav-bar title="订单" fixed/>
        </div>
            
        <van-tabs v-model="activeName" swipeable :offset-top="46" sticky>
            <van-tab title="全部订单" name="a">
                <div v-if="orders!=''">
                    <van-card
                        v-for=" item in orders"
                        :key="item.id"
                        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
                        <div slot="title">
                            下单时间： {{item.orderTime}}
                        </div>
                        <div slot="desc">
                            <p style="color:red">总额： {{item.total}}</p>
                            <p>进度： {{item.status}}</p>
                        </div>
                    </van-card>
                </div>
                <div v-else style="width:100%;height:100%">
                    <img style="width:100%;height:100%" src="./images/tips2.jpg">
                </div>
                
            </van-tab>
            <van-tab title="待付款" name="b">
                <div v-if="orderStatusFilter('待付款')!=''">
                    <van-card
                        v-for=" item in orderStatusFilter('待付款')"
                        :key="item.id"
                        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
                        <div slot="title">
                            下单时间： {{item.orderTime}}
                        </div>
                        <div slot="desc">
                            <p style="color:red">总额： {{item.total}}</p>
                            <p>进度： {{item.status}}</p>
                        </div>
                        <div slot="footer">
                            <van-button plain hairline type="danger" size="mini" @click="paymentOrder()">付款</van-button>
                        </div>
                    </van-card>
                </div>
                <div v-else style="width:100%;height:100%">
                    <img style="width:100%;height:100%" src="./images/tips2.jpg">
                </div>
            </van-tab>
            <van-tab title="待服务" name="c">
                <div v-if="orderStatusFilter('待服务')!=''">
                    <van-card
                        v-for=" item in orderStatusFilter('待服务')"
                        :key="item.id"
                        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
                        <div slot="title">
                            下单时间： {{item.orderTime}}
                        </div>
                        <div slot="desc">
                            <p style="color:red">总额： {{item.total}}</p>
                            <p>进度： {{item.status}}</p>
                        </div>
                    </van-card>
                </div>
                <div v-else style="width:100%;height:100%">
                    <img style="width:100%;height:100%" src="./images/tips2.jpg">
                </div>
               
            </van-tab>
            <van-tab title="待确认" name="d">
                <div v-if="orderStatusFilter('待确认')!=''">
                    <van-card
                        v-for=" item in orderStatusFilter('待确认')"
                        :key="item.id"
                        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
                        <div slot="title">
                            下单时间： {{item.orderTime}}
                        </div>
                        <div slot="desc">
                            <p style="color:red">总额： {{item.total}}</p>
                            <p>进度： {{item.status}}</p>
                        </div>
                        <div slot="footer">
                            <van-button plain hairline type="danger" size="mini" @click="customerConfirmOrder(item.id)">确认</van-button>
                        </div>
                    </van-card>
                </div>
                <div v-else style="width:100%;height:100%">
                    <img style="width:100%;height:100%" src="./images/tips2.jpg">
                </div>
            </van-tab>
            <van-tab title="已完成" name="e">
                <div v-if="orderStatusFilter('已完成')!=''">
                    <van-card
                        v-for=" item in orderStatusFilter('已完成')"
                        :key="item.id"
                        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
                        <div slot="title">
                            下单时间： {{item.orderTime}}
                        </div>
                        <div slot="desc">
                            <p style="color:red">总额： {{item.total}}</p>
                            <p>进度： {{item.status}}</p>
                        </div>
                    </van-card>
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
    },
    computed:{
        // 顾客的全部订单
        ...mapState("order",["orders"]),
        // 顾客信息
        ...mapState("user",["info"]),
        // 指定状态的订单
        ...mapGetters("order",["orderStatusFilter"])
    },
    methods:{
        // 查询该顾客的所有订单的请求,确认订单完成
        ...mapActions("order",["loadCustomerOrderData","confirmOrder"]),
        // 普通方法
        // fun:加载数据
        loadData(){
            this.loadCustomerOrderData(this.info.id);
        },
        // 确认订单并刷新订单
        customerConfirmOrder(id){
            this.confirmOrder(id)
            .then(()=>{
                // 确认成功后刷新订单数据
                this.loadData();
            })
            .catch((error)=>{
                // 确认失败报错
                this.$toast.fail(error);
            })
        },
        // 提交订单付款
        paymentOrder(){
            alert("付款");
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