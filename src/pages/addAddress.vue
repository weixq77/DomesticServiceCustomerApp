<template>
    <div class="addAddress">
        <!-- 标签栏 -->
        <van-nav-bar
            title="添加地址信息"
            left-arrow
            @click-left="onClickLeft"
            />
        <!-- 编辑地址 -->
         <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
            />
    </div>
</template>

<script>
import areaList from "../assets/area.js";
export default {
           data() {
                return {
                     areaList,
                     searchResult: []
                }
            },

            methods: {
               onClickLeft(){
                     this.$router.push({path:"/address"})
               },
               onSave() {
                    Toast('save');
                    },
                    onDelete() {
                    Toast('delete');
                    },
                    onChangeDetail(val) {
                    if (val) {
                        this.searchResult = [{
                        name: '黄龙万科中心',
                        address: '杭州市西湖区'
                        }];
                    } else {
                        this.searchResult = [];
                    }
                    }
                }
   }
</script>
<style scoped>

</style>