<template>
  <div class="wrapper">
    <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>欢迎登录心海养老院</b></div>
      <el-form  ref="userForm">
        <el-form-item prop="username">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="userName"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="passWord"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right">
          <el-button type="primary" size="small"  autocomplete="off" @click="login">登录</el-button>
          <el-button type="warning" size="small"  autocomplete="off">游客登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data(){
    return {
      userName:"",
      passWord:"",
    }
  },
  methods:{
    login(){
      this.request.get("/login",{
        params:{
          userName:this.userName,
          passWord:this.passWord,
        }
      }).then(res=>{
        console.log(1)
        if(res){
          this.$router.push('/')
        }else{
          this.$message.error("密码错误")
        }
      });
    }
  }


}
</script>


<style >
.wrapper{
height: 100vh;
  width:100%;
  position:fixed;
  background-size:100% 100%;
  background-repeat: no-repeat;
  background-image: url("../../assets/s111.webp");

}
</style>