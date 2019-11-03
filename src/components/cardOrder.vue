<template>
  <div class="cardOrder">
    <div class="cardTop">
        <van-row>
            <van-col span="9">订单编号：{{data.id}}</van-col>
            <van-col offset="11" span="4"><span style="color:red">{{data.status}}</span></van-col>
        </van-row>
    </div>
    <van-card
        :key="data.id"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
        <div slot="title">
            <p>擦玻璃、洗衣服、拖地、{{data.id}}</p>
        </div>
        <div slot="desc" class="cardDesc">
            <p>下单时间： {{data.orderTime | datefmt}}</p>
            <p>服务地址： {{data.address.province+" "+data.address.city+" "+data.address.area+" "+data.address.address}}</p>
            <p>联系方式： {{data.address.telephone}}</p>
        </div>
         <div slot="footer">
            <span style="color:red;">合计: ￥{{data.total}}</span>
        </div>
        <div slot="footer" v-if="choseCard===1">
            <van-button plain hairline type="danger" size="mini" @click="paymentOrder()">付款</van-button>
        </div>
        <div slot="footer" v-else-if="choseCard===2"  style="color:red;padding-top:5px;">
            <van-button plain hairline type="danger" size="small" @click="customerConfirmOrder(data.id)">确认</van-button>
        </div>
    </van-card>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    name: 'cardOrder',
    props: {
        data: Object,
        choseCard:Number
    },
    methods:{
        ...mapActions("order",["confirmOrder"]),
        // 确认订单并刷新订单
        customerConfirmOrder(id){
            this.confirmOrder(id)
            .then((response)=>{
                 this.$toast(response.statusText);
            })
            .catch((error)=>{
                // 确认失败报错
                this.$toast.fail(error);
            })
        },
        // 未付款的订单，提交订单付款
        paymentOrder(){
            this.$toast("付款");
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cardOrder{
    background-color: #fafafa;
    font-size: 14px;
    margin-bottom: 5px;
}
.van-card{
    margin-top: 0px !important;
}
.cardTop{
    box-sizing: border-box;
    padding: 5px 16px;
}
.cardDesc p{
    margin: 5px 0;
}
</style>