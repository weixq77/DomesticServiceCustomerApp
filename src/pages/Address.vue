<template>
    <div class="address">
        <van-nav-bar
            title="地址列表"
            left-arrow
            @click-left="onClickLeft"
            />
            <!-- 地址列表 -->
        <van-address-list
            v-model="chosenAddressId"
            :list="refreshAddressList"
            @edit="onEdit"
            @add="onAdd"
            @select="selectAddress"
            />
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            // chosenAddressId: this.address[0].id            
            //默认选中地址
            // index:0,//记录跳转到当前页的
        }
    },
     created(){
        this.loadDate();
     },
      computed:{
        //   用户信息
        ...mapState("user",["info"]),
        // 用户的地址信息
        ...mapState("address",["address","defaultAddress"]),
        // 在状态机中获取在当前选中地址后是要返回订单页还是用户页面
        ...mapState("lastpage",["addressReturn"]),
        // 重新封装address以便渲染数据
        refreshAddressList:function(){
            let list = [];
            for(let item of this.address){
                let obj = {};
                obj.name = this.info.name;//用户姓名
                obj.id = item.id;//地址id
                obj.tel = item.telephone;//收货电话
                // 拼接收货地址
                obj.address = item.province+"  "+item.city+"  "+item.area+"  "+item.address;
                // 将拼接好的一个对象添加到数组中
                list.push(obj);
            }
            return list;
        },
        // 默认选中的地址需要get和set维护
        chosenAddressId:{
            get(){
                return this.defaultAddress;
            },
            set(val){
                // console.log(val)
                // 否则为切换默认地址
                this.setDefaultAddressId(val);
            }
        }
    },
    methods:{
        // 查询当前用户所有地址的请求
        ...mapActions("address",["findAddress"]),
        // 设置保存当前需要修改的地址对象   设置默认地址id
        ...mapMutations("address",["setUpdateAddress","setDefaultAddressId"]),
        // 在状态机中维护当前选中的这个订单的地址
        ...mapMutations("lastpage",["setCurrentOrderAddress"]),
        // 加载数据
        loadDate(){
            // 获取当前用户的所有的地址
            this.findAddress(this.info.id);
        },
        // 跳转添加地址页面
        onAdd(){
            this.$router.push({path:"/saveAddress"});
        },
        // 返回用户页面
        onClickLeft(){
            this.$router.push({path:"/manages/user",query:{id:2}});
        },
        // 修改用户地址
        onEdit(item){
            // item是组件api提供的当前地址对象
            // 1.使用状态机存储一下当前需要修改的地址对象
            this.setUpdateAddress(item);
            // 2.跳转添加用户地址页面
            this.$router.push({path:"/saveAddress"});
        },
        // 切换地址时触发的函数
        selectAddress(item){
            if(this.addressReturn===1){
                // 当这个值等于1的时候我们也就知道它需要返回确认订单页
                this.$router.go(-1);
                // 并且记录当前订单选中的配送地址
                this.setCurrentOrderAddress(item);
            }
            // console.log(item);//Object { name: "customer1", id: 2232, tel: "12345678989", address: "江苏省  苏州市  昆山  学院路999号" }
        }
    }
}
</script>