<template>
  <div  style="height: 100%">
    <el-container style="height: 100%">
      <el-header class='fheader' style="text-align: left; font-size: 12px">
        <Header />
      </el-header>
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-container style="background-color: rgb(238, 240, 246);padding-left:40px;padding-right:40px">

          <el-main style="background-color: rgb(238, 240, 246);padding-left:20px;padding-right:20px">
                <div style="margin-top:-20px;cursor:default">
                  <p style="font-size:20px;font-weight: bold;color:#909399">主页</p>
                </div>
                <div style="margin-top:-65px;float:right;cursor:default" >
                  <p style="font-size:10px;font-weight: bold;color:#409EFF" @click="toFunc">进入功能页面></p>
                </div>
                <el-select v-model="value" placeholder="请选择菜谱" @change="handleSelect(value)">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
                <div  style="margin-top:5px">
                  <el-table
                  :data="recipeData"
                  border
                  style="width: 50%;overflow:hidden; text-overflow:ellipsis; white-space:nowrap; "
                  class="mytable"
                  :header-cell-style="{ background: '#5D87EB', color: '#fff' }"

                  >
                  <el-table-column prop="time" label="星期/饭点" width="100"></el-table-column>
                  <el-table-column prop="Mon" label="周一" :show-overflow-tooltip="true">
                      <template slot-scope="scope" min-width="15%" >
                        <span>{{scope.row.mon}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="Tue" label="周二" :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                          <span>{{scope.row.tue}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="Wed" label="周三" :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                          <span>{{scope.row.wed}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="Thu" label="周四" :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                          <span>{{scope.row.thu}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="Fri" label="周五" :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                          <span>{{scope.row.fri}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="Sat" label="周六" :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                          <span>{{scope.row.sat}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="Sun" label="周日" :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                          <span>{{scope.row.sun}}</span>
                      </template>
                  </el-table-column>
                  </el-table>
              </div>

          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
 

 import Header from'@/components/Header.vue';
  export default {
    name:"index",
    inject: ['reload'],
    components:{

      Header
    },
    data() {
        return {
        options: [],
        value: 0,
        recipeData: [],
        };
    },
    methods:{
      load(){
          const _this=this
          this.request.get("http://localhost:8081/findRecipe").then(res=>{
              console.log(res)
              _this.options=res.options;
          });
          this.request.get("http://localhost:8081/findRecipeDetail",{
              params:{
              index:this.value
              }
          }).then(res=>{
                      console.log(res)
                      _this.recipeData=res.data;
                  })
          },
          handleSelect(){
          const _this=this;
          this.request.get("http://localhost:8081/findRecipeDetail",{
            params:{
              index:this.value
            }
          }).then(res=>{
                    console.log(res)
                    _this.recipeData=res.data;
                })
        },
        toFunc(){
          this.$router.push('/index')
        }
        
    },
    created(){

           this.load();
        },
  };
</script>

<style lang="scss" scoped>
    .fheader {
    background-color:#276ff5;
    color:white;
    line-height: 40px;
    height: 40px !important;
  }
  .el-aside {
    color: #333;
  }
/deep/ .el-table {
.cell {
    white-space: nowrap;
}
} 

</style>

