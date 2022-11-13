<template>
  <div class="wrapper">
    <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px;border:solid;border-color:#E6A23C">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>欢迎登录心海养老院</b></div>
      <el-form :model="userForm"  ref="userForm" :rules="rules">
        <el-form-item prop="userName">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="userForm.userName" placeholder="请输入账户" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="userForm.password" placeholder="请输入密码" ></el-input>
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
  name: "Login",
  data(){
    return {

      userForm:{
              userName:"",
              password:"",
      },
      rules:{
                userName:[
                    { required: true, message: '账号不能为空', trigger: 'blur' }],
                password:[
                    { required: true, message: '密码不能为空', trigger: 'blur' }]
            }
    }
  },
  methods:{
    login(){
      this.request.get("http://localhost:8081/loginJudge",{
        params:{
          userName:this.userForm.userName,
          password:this.userForm.password,
        }
      }).then(res=>{
        if(res.code==100){
          this.$message.success(res.msg)
          this.$store.commit('set_token', res.token)

          if (this.$store.state.token) { 
          this.$router.push('/home') 
          console.log(this.$store.state.token) 
          } else { 
          this.$router.replace('/login'); 
          } 

        }else if(res.code==101){
          this.$message.error(res.msg)
        }else if(res.code==200){
          this.$message.error(res.msg)
        }else if(res.code==400){
          this.$message.error(res.msg)
        }
      });
    }
  },
  


}
</script>


<style >
.wrapper{
height: 100vh;
  width:100%;
  position:fixed;
  background-size:100% 100%;
  background-repeat: no-repeat;
  background-image: url("@/assets/s111.webp");

}
</style>