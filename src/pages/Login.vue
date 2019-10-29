<template>
    <div class="login">
        <van-nav-bar
            title="登录页面"
            />
            <div class="header">
                 <div id="title">       
                    <h1><van-icon name="wap-home-o" />家政服务平台.客户端</h1>
                 </div>
            </div>
            <div id="content"  @keyup.enter="loginHandler">
                {{form}}
                    <van-cell-group>
                        <van-field
                            v-model="form.username"
                            required
                            clearable
                            label="用户名"
                            placeholder="请输入用户名"
                        />

                        <van-field
                            v-model="form.password"
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            required
                        />
                        </van-cell-group>
                </div>
                 <br>
                 <div id="btns">
                    <van-button type="info" size="large" @click="loginHandler">登录</van-button>
                </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return{
            form:{
                type:"customer",
                username:"customer1",
                password:"123321"
                
            }
        }        
    },
    methods:{
            ...mapActions("user",["login"]),
            loginHandler(){
                this.login(this.form)
               .then(()=>{
                    //跳转到首页
                    this.$router.push({path:'/manages/home'})
                })
                .catch((error)=>{
                    this.$toast.fail(error)
                })
            }
    }
}
</script>
<style scoped>
.header{
    background-color: skyblue;
    height: 200px;
    position: relative;
}
#title{
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -165px;
    margin-top: -20px;
}
h1{
    margin: 0;
    padding: 0;
}
#btns{
   text-align: center;
}
</style>