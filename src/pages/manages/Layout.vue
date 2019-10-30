<template>
    <div class="layout">
        <router-view></router-view>
        <van-tabbar v-model="active" router>
            <van-tabbar-item icon="home-o" to="/manages/home">首页</van-tabbar-item>
            <van-tabbar-item icon="search" to="/manages/order">订单</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/manages/user">我的</van-tabbar-item>
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
    }
}
</script>