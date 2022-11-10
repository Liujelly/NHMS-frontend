<template>
    <div>
        <img src="@/assets/teamLogo1.png" style="position:absolute; top:-20px;left:5px;height:80px">
        <span style="margin-left:70px;cursor:default">养老院管理系统</span>
        <div style="float:right;margin-right:10px">
          <div class="block" style="display:flex; align-items:center"><el-avatar :size="25" :src="circleUrl" style="margin-right:5px;"></el-avatar><span style="width:50px;cursor:default" >刘盛栋</span></div>
        </div>
        <div style="float:right;margin-right:15px;line-height:3.5">
          <i class="el-icon-alizhuye" style="margin-right:10px" @click="toHome" ></i>
          <i class="el-icon-alidengchu" @click="toLogin"></i>
        </div>
    </div>
</template>

<script>

    export default {
        name:"Header",
        data() {
          return {
          circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          }
        },
        methods:{
          toHome:function(){
           this.$router.push('/home')
          },
          toLogin(){
             this.$router.push('/')
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>