<template>
    <div class="addAddress">
         <van-nav-bar
            title="添加地址信息"
            left-arrow
            @click-left="onClickLeft"
            />
    </div>
</template>

<script>
export default {
           data() {
                return {

                }
            },

            methods: {
               onClickLeft(){
                     this.$router.push({path:"/address"})
               }
     
            }
}
</script>
<style scoped>

</style>