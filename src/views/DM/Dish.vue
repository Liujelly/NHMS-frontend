<template>
    <div>
        <div class="function">
            <el-button  type="success"  style="margin-left:5px;margin-right:10px" @click="handleAdd">新增</el-button>
            <el-button type="primary" style="margin-right:35px" @click="exp">导出数据</el-button>
            <el-input  
                style="margin-left:15px" 
                class="Search"
                size="medium"
                placeholder="请输入菜名"
                v-model="input1">
            </el-input>
            <el-input
                style="margin-left:10px"            
                class="Search"
                size="medium"
                placeholder="请输入口味"
                v-model="input2">
            </el-input>
            <el-input
                style="margin-left:10px"            
                class="Search"
                size="medium"
                placeholder="请输入菜系"
                v-model="input3">
            </el-input>
            <el-input
                style="margin-left:10px"
                class="Search"
                size="medium"
                placeholder="请输入适宜人群"
                v-model="input4">
            </el-input>
            <el-button  style="margin-left:10px" @click="reset">重置</el-button>
            <el-button type="primary" @click="findComplex">搜索</el-button>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%;margin-top:20px">
            <el-table-column
            fixed
            prop="id"
            label="id" width="50">   
            </el-table-column>
            <el-table-column
            prop="name"
            label="名称">
            </el-table-column>
            <el-table-column
            prop="cuisine"
            label="菜系">
            </el-table-column>
            <el-table-column
            prop="ingredients"
            label="主料">
            </el-table-column>
            <el-table-column
            prop="taste"
            label="口味">
            </el-table-column>
            <el-table-column
            prop="tabooCrowds"
            label="忌口人群">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="125">
            <template slot-scope="scope">
                <el-button @click="handleLook(scope.row)" type="text" size="small">制作方法</el-button>
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[3, 5, 10, 15]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog
            title="制作方法"
            :visible.sync="dialogVisible"
            width="30%">
            <p>{{methodLook}}</p>
        </el-dialog>

        <el-dialog v-bind:title="dialogTitle" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="菜名">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜系">
                <el-input v-model="form.cuisine" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="主料">
                <el-input v-model="form.ingredients" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="口味">
                <el-input v-model="form.taste" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="忌口人群">
                <el-input v-model="form.tabooCrowds" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="制作方法">
                <el-input v-model="form.method" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    
    export default {
        inject: ['reload'],
        data() {
            return {
            tableData:[],
            form:{},
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            methodLook:'',
            total:0,
            dialogTitle:'',
            dialogFuc:'',
            pageNum:1,
            pageSize:3,
            dialogFormVisible: false,
            dialogVisible:false,
            }
        },
        methods: {
            load(){
                const _this=this
                this.request.get("http://localhost:8081/dishFindAll",{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then(res=>{
                console.log(res)
                 _this.tableData=res.data
                 _this.total=res.total
            })
            },
            handleSizeChange(pageSize) {
                console.log(pageSize)
                this.pageSize=pageSize
                this.load()
            },
            handleCurrentChange(pageNum) {
                console.log(pageNum)
                this.pageNum=pageNum
                this.load()
            },
            handleAdd(){
                this.dialogFuc="add"
                this.dialogTitle="新增菜品"
                this.dialogFormVisible = true
                this.form={}
            },
            handleEdit(row){
                this.dialogFuc="edit"
                this.dialogTitle="编辑菜品"
                this.form=row
                this.dialogFormVisible=true
            },
            handleLook(row){
                this.dialogVisible=true
                this.methodLook=row.method
            },
            save(){
                if(this.dialogFuc=="add"){
                    this.request.post("http://localhost:8081/dishAdd",this.form).then(res=>{
                    if(res){
                        this.$message.success("添加成功")
                    }else{
                        this.$message.error("添加失败")
                    }
                })
                }else if(this.dialogFuc=="edit"){
                    this.request.post("http://localhost:8081/dishUpdate",this.form).then(res=>{
                    if(res){
                        this.$message.success("编辑成功")
                    }else{
                        this.$message.error("编辑失败")
                    }
                })
                }
                this.reload();
            },
            findComplex(){
                const _this=this
                this.request.get("http://localhost:8081/dishFindComplex",{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    input1:this.input1,
                    input2:this.input2,
                    input3:this.input3,
                    input4:this.input4,
                }
            }).then(res=>{
                console.log(res)
                 _this.tableData=res.data
                 _this.total=res.total
            })
            },
            reset(){
                this.input1='',
                this.input2='',
                this.input3='',
                this.input4=''
            },
            exp(){
                window.open("http://localhost:8081/dishExport")
            }

        },
        created(){
            this.load()
        }
    }
</script>

<style>
.function{
    margin-top:20px;
    padding: 20px;
    background-color: white;
    border-radius: 7px;
}
.Search{
    width: 200px;
}
</style>