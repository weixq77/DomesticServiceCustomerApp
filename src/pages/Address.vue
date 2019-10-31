<template>
    <div class="address">
        <van-nav-bar
            title="地址列表"
            left-arrow
            @click-left="onClickLeft"
            />
        <van-address-list
            v-model="chosenAddressId"
            :list="refreshAddressList"
            @edit="onEdit"
            @add="onAdd"
            />
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            chosenAddressId: '1'            
            //默认选中地址
     }
    },
     created(){
        this.loadDate();
     },
      computed:{
        //   用户信息
        ...mapState("user",["info"]),
        // 用户的地址信息
        ...mapState("address",["address"]),
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
        }
    },
    methods:{
        // 查询当前用户所有地址的请求
        ...mapActions("address",["findAddress"]),
        // 设置保存当前需要修改的地址对象
        ...mapMutations("address",["setUpdateAddress"]),
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
        }     
    }
}
</script>