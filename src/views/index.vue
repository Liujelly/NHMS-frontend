<template>
  <div  style="height: 100%">
    <el-container style="height: 100%">
      <el-header class='fheader' style="text-align: left; font-size: 12px">
        <Header />
      </el-header>
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 240, 246)">
          <Aside />
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
 
 import Aside from '@/components/Aside.vue';
 import Header from'@/components/Header.vue';
  export default {
    name:"index",
    components:{
      Aside,
      Header
    }
  };
</script>

<style>
  .el-header {
    background-color: #b3c0d2;
    color: #333;
    line-height: 30px;
  }
    .fheader {
    background-color:#276ff5;
    color:white;
    line-height: 40px;
    height: 40px !important;
  }
  .el-aside {
    color: #333;
  }
</style>

