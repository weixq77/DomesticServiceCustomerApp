<template>
    <div id="order">
       <!-- 商品展示 -->
    <van-nav-bar
        title="订单确认"
        left-arrow
        @click-left="onClickLeft"
        />
        <!-- {{address}}
        {{info}} -->
          <van-cell title="服务地址" icon="location-o"  
          :label="addressList" is-link to="/address"/>
          <!-- 服务地址已经获取到该顾客的相关地址，
          现在默认显示最新添加的那一条地址项         
           -->
          <van-cell title="订单详情" icon="orders-o"  
          :label="order" is-link />
           <!-- <div>订单信息</div> -->
         <van-cell is-link
          @click="showPopup"
           icon="underway-o" 
           :label="timeList"
           title="服务时间"
          >
           </van-cell>
            <van-popup
                v-model="show"
                position="bottom"
                :style="{ height: '50%' }"
                >
                <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @confirm="clonePopup"
                    @cancel="clonePopup"
                    @change="changeTime"
                    />                               
            </van-popup> 
            <!-- 选择支付方式的下拉框 -->
            <van-collapse v-model="activeNames">
                <van-collapse-item title="支付方式" name="1" label="请选择支付方式" icon="bill-o">
                    <van-radio-group v-model="radio">
                            <van-cell-group>
                                <van-cell title="微信" clickable @click="radio = '1'" icon="wechat">
                                <van-radio slot="right-icon" name="1" />
                                </van-cell>
                                <van-cell title="支付宝" clickable @click="radio = '2'" icon="alipay" >
                                <van-radio slot="right-icon" name="2" />
                                </van-cell>
                                 <van-cell title="银行卡" clickable @click="radio = '3'" icon="card" >
                                <van-radio slot="right-icon" name="3" />
                                </van-cell>
                            </van-cell-group>
                            </van-radio-group> 
                    </van-collapse-item>
            </van-collapse>          
           
        <van-submit-bar
            :price="3050"
            button-text="确认提交"
            @submit="onSubmit"
            />
    </div>
</template>
<script>
 import {mapState,mapMutations,mapActions} from 'vuex'
 import moment from 'moment'
export default { 
    data(){
        return{
            //地址栏显示获取到状态机中的地址信息
            // addressList:address,
            //给timeList一个默认为空
           timeList:"",
           order:"订单详情",
           show: false,
            minHour: 10,
            maxHour: 20,
            minDate: new Date(),
            // 设置可以选择的最大日期
            maxDate: new Date(2019, 11, 1),
            //没搞明白现在设置的是最大是11月结束12.1日
            currentDate: new Date(),
             radio: '1',
            activeNames: ['1']
        }      
    },
    created(){
        this.findAddress(this.info.id)
    },
    computed:{
        //获取到用户信息
          ...mapState("user",["info"]),
        //获取到用户的所有的地址信息
           ...mapState("address",["address"]),
        //重新封装地址信息，以便于赋值给label 要string类型
          addressList:function(){
                let str;
            for(let item of this.address){            
               str= item.province+"  "+item.city+"  "+item.area+"  "+item.address;
                // 将数据拼接成一个字符串
                // console.log(str);
                // console.log(typeof str)
            }
            //将str赋值给addressList
            return str;
        },

    },
    methods:{
        //调用突变获取到该用户的所有地址信息
          ...mapActions("address",["findAddress"]),
        onClickLeft() {
          this.$router.push("product")
        },
        onSubmit(){
            this.$toast("提交成功");
             this.$router.push("/manages/order")

        },
        //选择时间的弹框打开
        showPopup() {
            this.show = true;
            },
        //选择时间的弹框关闭，在点击取消按钮的时候启用
        clonePopup(){
             this.show = false;
             //在关闭弹窗的时候
              //如果timeList为空设置为当前时间的值
              if(this.timeList===""){
                    let t= new Date();
                    let dateArr=moment().format('YYYY年MM月DD日')
                    let timeArr=moment().format('HH时mm分');
                //将两个数组拼接成string赋值给timeList
                    this.timeList=dateArr+timeArr;    
              }
                           
        },
        // SubmitTime(value){
        //     // console.log(value) Thu Oct 31 2019 19:33:57 GMT+0800 (中国标准时间)
        //     //用moment改变获取到的时间的格式 
        //     //获取到下单时间的年月日
        //        let dateArr=moment().format('YYYY年MM月DD日')
        //        //获取到下档时间的时分
        //       let timeArr=moment().format('HH时mm分');
        //      //将两个数组拼接成string赋值给timeList
        //       this.timeList=dateArr+timeArr;                   
        //      console.log(this.timeList);
        //     //  console.log(typeof this.timeList)             
        //     this.show = false;
        //   只能选择当前时间
        // },
        changeTime(e){
            //当选择器发生改变的时候才会发生改变才会有值，所以当不滑动选择的时候
            //服务时间将默认选择为当前时间在closePose中设置
            let t=e.getValues();
            //console.log(t) ["2019", "10", "31", "20", "06"]
            //获得一个数组
            //将数组转化为string格式解构
            let[year,mon,day,time]=t;
            this.timeList=year+"年"+mon+"月"+day+"日"+time+"时";         
        }
       
    }
}
</script>
<style scoped>

</style>