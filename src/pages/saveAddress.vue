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
            show-delete
            @save="onAddrConfirm"
            @delete="onDelete"
            />
    </div>
</template>

<script>
import areaList from "../assets/area.js";
import {mapState,mapActions} from 'vuex'
export default {
           data() {
                return {
                     areaList
                }
            },
            computed:{
                // 用户信息
                ...mapState('user',["info"])
            },
            methods: {
                // 保存地址请求
                ...mapActions('address',['saveAddress']),
               onClickLeft(){
                     this.$router.push({path:"/address"})
               },
            //    onSave() {
            //         this.$toast('save');
            //     },
                onDelete() {
                    this.$toast('delete');
                },
                onAddrConfirm (e) { 
                    // 点击确认，获取所选的省市区数据
                    // 确定选择,返回的必定是三元素数组
                    // 封装需要存储的地址对象
                    let addressObj = {
                        province:e.province,
                        city:e.city,
                        area:e.county,
                        address:e.addressDetail.trim(),
                        telephone:e.tel,
                        customerId:this.info.id
                    }
                    // 请求存储地址
                    this.saveAddress(addressObj)
                    .then(()=>{
                        // 地址存储成功返回地址列表
                       this.$router.push({path:"/address"})
                    })
                        console.log('this.onAddrConfirm=>e', e)
                        //typeof(e)==>object 
                        console.log("姓名",e.name)
                        console.log("电话",e.tel)
                        console.log("省：",e.province)
                        console.log("城市",e.city)
                        console.log("地区",e.county)
                        console.log("详细地址",e.addressDetail)
                       

                  
                    }

             }
   }
</script>
<style scoped>

</style>