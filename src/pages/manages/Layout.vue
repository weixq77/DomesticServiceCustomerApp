<template>
    <div id="layout">
        <router-view></router-view>
        <van-tabbar v-model="active" router>
            <van-tabbar-item icon="home-o" to="/manages/home">首页</van-tabbar-item>
            <van-tabbar-item icon="search" to="/manages/order">订单</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/manages/user">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:'layout',
    data(){
        return {
            active:0,
        }
    },
    //将有没有token作为跳转的条件，如果没有token相当于没登录先跳转到登录页面
    created(){
        // 激活当前底部栏目
        if(this.$route.query.id){
            this.active = this.$route.query.id;
        }
        // if(this.token){
        //    //如果有token请求查出查询出token所带的顾客信息info
        //    this.getInfo(this.token)
        // }else{
        //   //如果没有token跳转到登录页面
        //    this.$toast("token失效，请先登录")
        //    this.$router.push({path:"/login"})
        // }
    },
    computed:{
     ...mapState('user',['token','info'])
    },
    methods:{
        ...mapActions('user',{
            'getInfo':'info'
        })
    }
}
</script>