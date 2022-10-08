<template>
        <el-menu style="background-color:rgb(238, 240, 246)" router>
            <el-submenu index="1" >
              <template slot="title"><i class="el-icon-aligrandpa"></i>老人管理</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-alijiankang"></i>健康管理</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-aligongwujiedai"></i>接待管理</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
              <el-menu-item index="3-3">选项3</el-menu-item>
              <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-user-solid"></i>人事管理</template>
              <el-menu-item index="4-1">选项1</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
              <el-menu-item index="4-3">选项3</el-menu-item>
              <el-submenu index="4-4">
                <template slot="title">选项4</template>
                <el-menu-item index="4-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-alicaiwu"></i>财务管理</template>
              <el-menu-item index="5-1">选项1</el-menu-item>
              <el-menu-item index="5-2">选项2</el-menu-item>
              <el-menu-item index="5-3">选项3</el-menu-item>
              <el-submenu index="5-4">
                <template slot="title">选项4</template>
                <el-menu-item index="5-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-alicangku"></i>仓库管理</template>
              <el-menu-item index="6-1">选项1</el-menu-item>
              <el-menu-item index="6-2">选项2</el-menu-item>
              <el-menu-item index="6-3">选项3</el-menu-item>
              <el-submenu index="6-4">
                <template slot="title">选项4</template>
                <el-menu-item index="6-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title"><i class="el-icon-setting"></i>资料管理</template>
              <el-menu-item index="priceSet">收费标准设置</el-menu-item>
              <el-menu-item index="7-2">设施资料管理</el-menu-item>
              <el-menu-item index="7-3">食谱管理</el-menu-item>
              <el-menu-item index="7-4">通知消息管理</el-menu-item>
              <el-submenu index="7-5">
                <template slot="title">系统设置</template>
                <el-menu-item index="7-5-1">权限管理</el-menu-item>
                <el-menu-item index="7-5-2">操作日志</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
</template>

<script>
    export default {
        name:"Aside"
    }
</script>

<style lang="scss" scoped>

</style>