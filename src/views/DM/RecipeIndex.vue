<template>
    <div>
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">食谱管理</p>
        </div>
        <el-menu
             class="el-menu-Redipe"
            mode="horizontal"
            background-color="rgb(238, 240, 246)" text-color="#909399"  style="border-width:0" router>
            <el-menu-item index="/recipe" class="item">食谱管理</el-menu-item>
            <el-menu-item index="/dish" class="item">菜品管理</el-menu-item>
        </el-menu>
        <router-view ></router-view>
    </div>
</template>

<script>
    export default {
      data() {
          return {
              tabPosition: 'bottom'
          }
        },
      
      
    }

</script>

<style lang="scss" scoped>
.item{
    border-radius:7px;
    height: 33px !important;
    line-height: 35px !important;
    border-bottom: none !important;
}
.el-menu-Redipe{
  .is-active{
    background-color: #C0C4CC!important;
  }
}

</style>