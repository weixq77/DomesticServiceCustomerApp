<template>
    <div class="layout">
        <router-view></router-view>
        <van-tabbar v-model="active" @change="tabChangeHandler">
            <van-tabbar-item icon="home-o" name="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="search" name="/order">订单</van-tabbar-item>
            <van-tabbar-item icon="friends-o" name="/address">地址</van-tabbar-item>
            <van-tabbar-item icon="setting-o" name="/user">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    name:'layout',
    data(){
        return {
            active:0,
        }
    },
    methods:{
        tabChangeHandler(path){
            this.$router.push({path})
        }
    }
}
</script>