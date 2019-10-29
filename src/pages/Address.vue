<template>
    <div class="address">
        <van-nav-bar
            title="地址列表"
            left-arrow
            @click-left="onClickLeft"
            />
     {{address}}
     {{info}}
     <van-address-list
            v-model="chosenAddressId"
            :list="refreshAddressList"
            @edit="onEdit"
            @add="onAdd"
            />
            
    </div>
</template>
<script>
import {mapState} from 'vuex'
import  {mapActions} from 'vuex'
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
        ...mapState("user",["info"]),
        ...mapState("address",["address"]),
        // 重新封装address以便渲染数据
        refreshAddressList:function(){
            // alert(1);
            // list[{id,name,tel,address}]
            let list = [];
            let obj = {};
            obj.name = this.info.name;//用户姓名
            console.log("address--->",this.address);
            for(let item of this.address){
                console.log("item",item)
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
          ...mapActions("address",["findAddress"]),
          loadDate(){
              this.findAddress(this.info.id);
          },
           onAdd(){
             this.$router.push({path:"/addAddress"});
            },
            onClickLeft(){
            this.$router.push({path:"/manages/user"});
                },
            onEdit(){
                this.$toast("编辑地址信息");
            }
            

    }
}
</script>