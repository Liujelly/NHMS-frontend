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
                <div style="margin-top:-58px;margin-right:1200px;float:right;cursor:default" >
                  <p style="font-size:15px;font-weight: bold;color:#409EFF" @click="toFunc">进入功能页面></p>
                </div>
              
                <div style="margin-top:-125px;float:right;cursor:default;width:500px">
                <notepad ></notepad>
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
                  <el-card class="box-card" style="margin-top:20px">
                    <div slot="header" class="clearfix">
                        <span>常用功能</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="handleAddFuc">添加功能</el-button>
                    </div>
                    <div v-for="item in cardList" :key="item" class="text item">
                        <div @click="toFuc(item.path)" style="cursor:default">{{ item.menuZh +'>'}}</div>
                    </div>
                  </el-card>
              </div>
              <el-dialog title="添加功能" :visible.sync="dialogFormVisible" width="20%">
                  <el-form label-width="80px" size="small" :model="form" >
                      <el-form-item>
                          <el-select v-model="form.fuc" placeholder="请选择功能" style="margin-left:-50px">
                          <el-option
                          v-for="item in menuOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                      </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="updateUsualMenu(form)">确 定</el-button>
                  </div>
              </el-dialog>

              

   

          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
 

 import Header from'@/components/Header.vue';
 import Notepad from'@/components/Notepad.vue';
  export default {
    name:"index",
    inject: ['reload'],

    components:{
      Header,
      Notepad,

    },
    data() {
        return {
        options: [],
        menuOptions:[],
        value: 0,
        recipeData: [],
        cardList:[],
        dialogFormVisible:false,      
        form:{
          fuc:''
        }
        };
    },
    methods:{
      load(){
          const _this=this
          this.request.get("/getUsualFuc").then(res=>{
                console.log(res)
                _this.cardList=res.data;
                _this.menuOptions=res.options
            })
          this.request.get("/findRecipe").then(res=>{
              console.log(res)
              _this.options=res.options;
          });
          this.request.get("/findRecipeDetail",{
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
          this.request.get("/findRecipeDetail",{
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
        },
         toFuc(path){
                this.$router.push(path)
        },
        handleAddFuc(){
            this.dialogFormVisible = true
        },
        updateUsualMenu(form){
          const _this=this;          
          console.log(form.fuc);
           this.request.post("/updateUsualFuc",form.fuc).then(res=>{
             if(res){
              this.$message.success("添加成功")
             }
          });
                this.dialogFormVisible=false
                clearTimeout(this.timer);  //清除延迟执行 
            
                this.timer = setTimeout(()=>{   //设置延迟执行
                    this.load();
                },100);

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
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  

</style>

