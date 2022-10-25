<template>
    <div>
        <div class="recipeFunction">
                <el-select v-model="value" placeholder="请选择菜谱" @change="handleSelect(value)">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-button  type="success"  style="margin-left:20px" @click="handleAdd" >创建菜谱</el-button>
                <el-button type="warning" @click="RecipeEdit">编辑菜谱</el-button>
                <el-button type="danger" @click="deleteRecipe">删除菜谱</el-button>
                <el-button type="primary" @click="exp">导出数据</el-button>
        </div>
        <div  style="margin-top:20px">
            <el-table
            :data="recipeData"
            border
            style="width: 100%"
            class="tb-edit"
            :header-cell-style="{ background: '#5D87EB', color: '#fff' }"
            v-bind:highlight-current-row="isActive" @row-click="handleCurrentChange"
            >
            <el-table-column prop="time" label="星期/饭点" width="100"></el-table-column>
            <el-table-column prop="Mon" label="周一" >
                <template slot-scope="scope">
                    <el-input  v-model="scope.row.mon" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.mon}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="Tue" label="周二" >
                <template slot-scope="scope">
                    <el-input  v-model="scope.row.tue" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.tue}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="Wed" label="周三" >
                <template slot-scope="scope">
                    <el-input  v-model="scope.row.wed" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.wed}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="Thu" label="周四" >
                <template slot-scope="scope">
                    <el-input  v-model="scope.row.thu" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.thu}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="Fri" label="周五" >
                <template slot-scope="scope">
                    <el-input  v-model="scope.row.fri" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.fri}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="Sat" label="周六">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.sat" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.sat}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="Sun" label="周日" >
                <template slot-scope="scope">
                    <el-input  v-model="scope.row.sun" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.sun}}</span>
                </template>
            </el-table-column>
            </el-table>
              <el-button type="primary" class="update" :style="{display: visible}" @click="update">更新</el-button>
        </div>
        
        <el-dialog title="创建菜谱" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" :model="form" size="small" :rules="rules">
                <el-form-item label="食谱名"  prop="name">
                <el-input v-model="form.name"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="适宜人群">
                <el-input v-model="form.suitable" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save" >确 定</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>

<script >
   
export default {
    inject: ['reload'],
    data() {
        return {
        rules:{
                name:[
                    {
                        validator:this.nameRules, trigger: 'change'
                    }
                ],
            },
        isActive:false,
        visible:'none',
        options: [],
        value: 0,
        recipeData: [],
        form:{},
        dialogTitle:'',
        dialogFormVisible:false,
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
    handleCurrentChange(row, event, column) {
        console.log(row, event, column, event.currentTarget)
    },
    handleEdit(index, row) {
        console.log(index, row);
    },
    RecipeEdit(){
      if(this.isActive){
        this.isActive=false;
        this.visible='none';
      }else{
        this.isActive=true;
        this.visible='';
      }
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
    handleAdd(){
        this.dialogFormVisible=true;
        this.form={};
    },
    save(){
        this.request.post("http://localhost:8081/addRecipe",this.form).then(res=>{
                if(res){
                    this.$message.success("添加成功")
                }else{
                    this.$message.error("添加失败")
                }
            });
                      clearTimeout(this.timer);  //清除延迟执行 
            
            this.timer = setTimeout(()=>{   //设置延迟执行
                this.reload();
            },500);
            this.dialogFormVisible=false;
    },
    update(){
        this.request.post("http://localhost:8081/updateRecipeDetail",this.recipeData).then(res=>{
                if(res){
                    this.$message.success("更新成功")
                }else{
                    this.$message.error("更新失败")
                }
            });
                 this.reload();
    
    },
    deleteRecipe(){
        this.request.post("http://localhost:8081/deleteRecipe",this.recipeData).then(res=>{
                if(res){
                    this.$message.success("删除成功")
                }else{
                    this.$message.error("删除失败")
                }
            });
            clearTimeout(this.timer);  //清除延迟执行 
            
            this.timer = setTimeout(()=>{   //设置延迟执行
                this.reload();
            },500);
    },
    exp(){
        window.open("http://localhost:8081/RecipeExport")
    },
    nameRules(rule, value, callback){
        for(var i=0;i<this.options.length;i++){
            if(this.options[i].label==value){
                 callback("食谱已存在")
                 break
            }
        }
       
    },
},
created(){
           this.load();
        }

};
</script>

<style lang="scss" scoped>
.recipeFunction{
    margin-top:20px;
    padding: 20px;
    background-color: white;
    border-radius: 7px;
    .Search{
        width: 300px;
    }
}
.el-table{
    border-radius: 7px;
}
.tb-edit .el-input {
    display: none
}
.tb-edit .current-row .el-input {
    display: block
}

.tb-edit .current-row .el-input+span {
    display: none
}
.el-input{
    margin-top: 10px;
    height: 50px !important;
}
.update{
  margin-top: 10px;
}
/deep/ .el-form-item__error{
    margin-top: -12px;
    margin-left: 2px;

}
</style>
