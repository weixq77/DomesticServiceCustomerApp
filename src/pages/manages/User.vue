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
        <van-cell is-link @click="onClickRight"><van-icon name="close" />&nbsp;退出</van-cell>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
        }
    },
    methods:{
        onClickRight(){
             this.$router.push({path:"/"})
        },
        addressHandler(){
              this.$router.push({path:"/address"})
        }
        
    }, 
    computed:{
                ...mapState("user",["info"])
            }
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