<template>
    <div class="home">
        <van-nav-bar
            title="主页"
            />
     <!-- 顶部轮播图 -->
        <van-row> 
            <van-swipe :autoplay="3000" indicator-color="white" >
                <van-swipe-item ><img src="./images/首页1.jpg" height="170px"></van-swipe-item>
                <van-swipe-item><img src="./images/首页2.jpg" height="170px"></van-swipe-item>
                <van-swipe-item><img src="./images/首页3.jpg" height="170px"></van-swipe-item>
                <van-swipe-item><img src="./images/首页4.jpg" height="170px"></van-swipe-item>
            </van-swipe>
        </van-row>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
      computed:{
    ...mapState("user",["info"])
  }
}
</script>