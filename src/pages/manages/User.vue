<template>
    <div class="user">
        <van-nav-bar
            title="个人页面"
            />
            <!-- {{info}} -->
           <div id="header">     
               <ul>
                   <li>
                       <van-image
                        round
                        width="6rem"
                        height="6rem"
                        :src=info.avatar
                        />    
                </li>
                   <li>
                    <div id="name">你好，{{info.name}}</div>          
                   </li>
               </ul>
                       
        </div>
        <van-cell is-link @click="addressHandler"><van-icon name="location-o" />&nbsp;常用地址</van-cell>
        <van-cell @click="onClickRight"><van-icon name="close" />&nbsp;退出</van-cell>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        return{
        }
    },
    created(){
        // 用户id不存在，则先拿token去获取用户id
        if(this.token){
            //如果有token请求查出查询出token所带的顾客信息info
            this.getInfo(this.token)
        }else{
            //如果没有token跳转到登录页面
            this.$toast("token失效，请先登录")
            this.$router.push({path:"/login"})
        }
    },
    computed:{
        ...mapState("user",["info","token"])
    },
    methods:{
        ...mapActions('user',{
            'getInfo':'info',
            'logout':'logout'
        }),
        // 退出当前账号
        onClickRight(){
            //点击退出调用事件
            this.logout()
            //如果成功则返回首页页面
            .then(()=>{
                 this.$router.push({path:"/login"})
            })
            
        },
        addressHandler(){
              this.$router.push({path:"/address"})
        }
        
    }, 
    
}
</script>
<style  scoped>
       #header{
           padding: 10px;
       }
        #header ul>li{
           text-align: center;
       }
       #name{
           margin: 10px;
       }
       #box{
           background-color:#ededed;
           height: 200px;
       }
       #message{
           text-align: center;
           padding: 15px;
       }
       h3{
          color:orangered;
          padding: 0;
          margin: 0;
       }
</style>