<template>
    <div>
        <div class="function">
            <el-button  type="success"  style="margin-left:5px;margin-right:10px" @click="handleAdd">新增楼宇</el-button>
            <el-button type="primary" style="margin-right:35px" @click="exp">导出数据</el-button>
            <el-input  
                style="margin-left:15px" 
                class="Search"
                size="medium"
                placeholder="请输入楼名"
                v-model="input1">
            </el-input>
            <el-input
                style="margin-left:10px"            
                class="Search"
                size="medium"
                placeholder="请输入房屋结构"
                v-model="input2">
            </el-input>
            <el-input
                style="margin-left:10px"
                class="Search"
                size="medium"
                placeholder="请输入负责人id"
                v-model="input3">
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
            label="楼宇id" width="70">   
            </el-table-column>
            <el-table-column
            prop="headId"
            label="负责人id">
            </el-table-column>
            <el-table-column
            prop="buildingName"
            label="楼宇名称">
            </el-table-column>
            <el-table-column
            prop="builder"
            label="建造商">
            </el-table-column>
            <el-table-column
            prop="completionTime"
            label="建成时间">
            </el-table-column>
            <el-table-column
            prop="area"
            label="占地面积">
            </el-table-column>
            <el-table-column
            prop="structure"
            label="房屋结构">
            </el-table-column>
            <el-table-column
            prop="floorsNumber"
            label="楼房层数">
            </el-table-column>
            <el-table-column
            prop="roomsNumber"
            label="房间数">
            </el-table-column>
            <el-table-column
            prop="repairTime"
            label="修缮次数">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="125">
            <template slot-scope="scope">
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

        <el-dialog v-bind:title="dialogTitle" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small" :model="form" :rules="rules" ref="buildingForm">
                <el-form-item label="楼宇名称"  prop="buildingName">
                <el-input v-model="form.buildingName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="建造商">
                <el-input v-model="form.builder" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="建成时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.completionTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="占地面积">
                <el-input v-model="form.area" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房屋结构">
                <el-input v-model="form.structure" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="楼宇层数">
                <el-input v-model="form.floorsNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房间数">
                <el-input v-model="form.roomsNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="修缮次数">
                <el-input v-model="form.repairTime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="负责人id">
                <el-input v-model="form.headId" autocomplete="off"></el-input>
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
        name: 'Building',
        inject: ['reload'],
        data() {
            return {
                rules:{
                buildingName:[
                    {
                        validator:this.nameRules, trigger: 'change'
                    }
                ],
            },
            tableData:[],
            form:{},
            input1: '',
            input2: '',
            input3: '',
            total:0,
            dialogTitle:'',
            dialogFuc:'',
            pageNum:1,
            pageSize:3,
            dialogFormVisible: false,
            }
        },
        methods: {
            load(){
                const _this=this
                this.request.get("/buildingFindAll",{
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
                this.dialogTitle="新增楼宇信息"
                this.dialogFormVisible = true
                this.form={}
            },
            handleEdit(row){
                this.dialogFuc="edit"
                this.dialogTitle="编辑楼宇信息"
                this.form=row
                this.dialogFormVisible=true
                 this.$nextTick(() => {  this.$refs['buildingForm'].clearValidate();});
            },
            save(){
                if(this.dialogFuc=="add"){
                    this.request.post("/buildingAdd",this.form).then(res=>{
                    if(res){
                        this.$message.success("添加成功")
                    }else{
                        this.$message.error("添加失败")
                    }
                })
                }else if(this.dialogFuc=="edit"){
                    this.request.post("/buildingUpdate",this.form).then(res=>{
                    if(res){
                        this.$message.success("编辑成功")
                    }else{
                        this.$message.error("编辑失败")
                    }
                })
                }
                clearTimeout(this.timer);  //清除延迟执行 
            
                this.timer = setTimeout(()=>{   //设置延迟执行
                    this.reload();
                },500);
            },
            findComplex(){
                const _this=this
                this.request.get("/buildingFindComplex",{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    input1:this.input1,
                    input2:this.input2,
                    input3:this.input3,
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
                this.input3=''
            },
            exp(){
                window.open("/BuildingExport")
            },
            nameRules(rule, value, callback){
                if(this.dialogFuc=="add"){
                for(var i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].buildingName==value){
                        callback("该楼名已存在")
                        break
                    }
                }}else{
                    callback()
                }
            
            },
            

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