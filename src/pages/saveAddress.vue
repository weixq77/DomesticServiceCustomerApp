<template>
    <div class="saveAddress">
        <!-- 标签栏 -->
        <van-nav-bar
            title="添加地址信息"
            left-arrow
            @click-left="onClickLeft"
            />
        <!-- 编辑地址 -->
         <van-address-edit
            :area-list="areaList"
            :show-delete="btnDelete"
            :address-info="currentUpdateAddress"
            @save="onAddrConfirm"
            @delete="onDelete"
            />
    </div>
</template>

<script>
import areaList from "../assets/area.js";
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data() {
        return {
            areaList
        }
    },
    computed:{
        // 用户信息
        ...mapState('user',["info"]),
        // 用户当前需要修改的地址信息  删除按钮是否显示的判断
        ...mapState("address",["updateAddress","btnDelete"]),
        // 当前用户需要修改的地址的详细信息
        // 由于组件需要键值对类型的，所以需要处理一下
        currentUpdateAddress:function(){
            // 这个值是当用户点击的是修改时显示需修改的信息和删除按钮
            if(Object.keys(this.updateAddress).length!==0){//如果这个对象为空则返回空对象
                // 将一整串的地址按空格分隔成数组即可(\s表示空格换行符)
                const arrAddress =  this.updateAddress.address.trim().split(/\s+/);
                // 结构出id，name和tel
                let {id,name,tel} = this.updateAddress;

                // 是从修改按钮进来的，显示删除按钮
                this.btnDeleteShow();

                return Object.assign({id,name,tel},{addressDetail:arrAddress[3]})
            }
            return {};
        }
    },
    methods: {
        // 保存地址请求 删除地址新
        ...mapActions('address',['saveAddress','deleteAddress']),
        // 设置保存当前需要修改的地址对象  删除按钮的显示与隐藏
        ...mapMutations("address",["setUpdateAddress","btnDeleteShow","btnDeleteClose"]),
        // 返回前一页
        onClickLeft(){
            // 返回前先判断这个需修改的对象是否有值，有的话要清除
            if(Object.keys(this.updateAddress).length!==0){
                // 并使用使用状态机将当前需要保存的地址清除
                this.setUpdateAddress();
            }
            // 并且将删除按钮隐藏，防止下一次新添加时显示了
            this.btnDeleteClose();
            // 返回地址列表
            this.$router.push({path:"/address"})
        },
        // 删除
        onDelete(e) {
            // 当如果是存在地址id则删除成功
            if(e.id){
                this.deleteAddress(e.id)
                .then(()=>{
                    // 当前地址删除成功跳转地址列表页
                     this.$router.push({path:"/address"})
                })
                .catch((error)=>{
                    this.$toast.fail(error)
                })
            }else{
                this.$toast.fail("删除失败")
            }
        },
        // 保存新添加的用户地址
        onAddrConfirm (e) { 
            // 点击确认，获取所选的省市区数据
            // 确定选择,返回的必定是三元素数组
            // 封装需要存储的地址对象
            // console.log("e---->",e)
            
            let addressObj = {
                province:e.province,
                city:e.city,
                area:e.county,
                address:e.addressDetail.trim(),
                telephone:e.tel,
                customerId:this.info.id
            }
            if(e.id){
                // 如果有id为修改，给对象addressObj添加一个id
                addressObj =  Object.assign(addressObj,{id:e.id});
            }
            // 请求存储地址
            this.saveAddress(addressObj)
            .then(()=>{
                // 地址存储成功返回地址列表
                this.$router.push({path:"/address"})
                // 并使用使用状态机将当前需要保存的地址清除
                this.setUpdateAddress();
                // 并且将删除按钮隐藏，防止下一次新添加时显示了
                this.btnDeleteClose();
            })
            
        }

    }
}
</script>
<style scoped>

</style>