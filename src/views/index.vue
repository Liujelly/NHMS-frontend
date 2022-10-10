<template>
  <div  style="height: 100%">
    <el-container style="height: 100%">
      <el-header class='fheader' style="text-align: left; font-size: 12px">
        <Header />
      </el-header>
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <el-container >
          <el-main style="background-color: rgb(238, 240, 246)">
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

