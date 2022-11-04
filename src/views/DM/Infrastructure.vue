<template>
    <div class="infrastructure">
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">基础设施管理</p>
        </div>
        <div class="function">
            <el-button  type="success"  style="margin-left:5px;margin-right:10px" @click="handleAdd">新增宿舍</el-button>
             <el-button  type="danger"  style="margin-left:5px;margin-right:10px" @click="handleDelete">删除宿舍</el-button>
            <el-button type="primary" style="margin-right:35px" @click="exp">导出数据</el-button>
            <el-input  
                style="margin-left:15px" 
                class="Search"
                size="medium"
                placeholder="请输入楼宇id"
                v-model="input1">
            </el-input>
            <el-input
                style="margin-left:10px"            
                class="Search"
                size="medium"
                placeholder="请输入设施类型"
                v-model="input2">
            </el-input>
            <el-input
                style="margin-left:10px"            
                class="Search"
                size="medium"
                placeholder="请输入设施名称"
                v-model="input3">
            </el-input>
            <el-button  style="margin-left:10px" @click="reset">重置</el-button>
            <el-button type="primary" @click="findComplex">搜索</el-button>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%;margin-top:20px"
            ref="multipleTable"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="buildingId"
            label="楼宇id"
            width="70">
            </el-table-column>
            <el-table-column
            prop="facilityType"
            label="设施类型">
            </el-table-column>
            <el-table-column
            prop="facilityName"
            label="设施名称">
            </el-table-column>
            <el-table-column
            prop="startTime"
            label="启用时间">
            </el-table-column>
            <el-table-column
            prop="shelfLife"
            label="保质期">
            </el-table-column>
            <el-table-column
            prop="repairNumber"
            label="修理次数">
            </el-table-column>
            <el-table-column
            prop="status"
            label="状态"
            width="100"
            :filters="[{ text: '正常', value: '正常' }, { text: '异常', value: '异常' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                :type="scope.row.status === '正常' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.status}}</el-tag>
            </template>
            </el-table-column>
            <el-table-column
            prop="repairPhone"
            label="修理电话">
            </el-table-column>                        
            <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
                <el-button @click="handleLook(scope.row)" type="text" size="small">查看具体位置</el-button>
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
            title="查看入住老人"
            :visible.sync="dialogVisible"
            width="30%">
            <p>{{location}}</p>
        </el-dialog>

        <el-dialog v-bind:title="dialogTitle" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small" :model="form"  ref="formName">
                <el-form-item label="楼宇id" >
                <el-input v-model="form.buildingId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设施类型">
                <el-input v-model="form.facilityType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设施名称">
                <el-input v-model="form.facilityName" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="保质期">
                <el-input v-model="form.shelfLife" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="修理次数">
                <el-input v-model="form.repairNumber" autocomplete="off" :disabled="inputJudge"></el-input>
                </el-form-item>
                <el-form-item label="床位状态">
                   <el-input v-model="form.status" autocomplete="off" :disabled="true" :style="{display: visible1}"></el-input>
                     <el-select v-model="form.status" placeholder="请选择" :style="{display: visible2}">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="修理电话">
                <el-input v-model="form.repairPhone" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="具体位置">
                <el-input type="textarea" v-model="form.location" autocomplete="off" ></el-input>
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
                 options: [{
                value: '正常',
                label: '正常'
                }, {
                value: '异常',
                label: '异常'
                }],
                value: '正常',
            multipleSelection:'',
            buildingIds:[],
            tableData:[],
            form:{},
            input1: '',
            input2: '',
            input3:'',
            location:'',
            total:0,
            dialogTitle:'',
            dialogFuc:'',
            pageNum:1,
            pageSize:5,
            dialogFormVisible: false,
            dialogVisible:false,
            inputJudge:true,
            visible1:'',
            visible2:'none'
            }
        },
        methods: {
            load(){
                const _this=this
                this.request.get("http://localhost:8081/infrastructureFindAll",{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then(res=>{
                console.log(res)
                 _this.tableData=res.data
                 _this.total=res.total
                 _this.buildingIds=res.buildingIds
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
                this.form={}
                this.dialogFuc="add"
                this.dialogTitle="新增设施"
                this.dialogFormVisible = true
                this.$nextTick(() => {  this.$refs['formName'].clearValidate();});
                this.form.status="正常"
                this.form.repairNumber="0"

            },
            handleEdit(row){
                this.dialogFuc="edit"
                this.dialogTitle="编辑设施"
                this.visible1="none"
                this.visible2=""
                this.inputJudge=false
                this.form=row
                this.dialogFormVisible=true
                this.$nextTick(() => {  this.$refs['formName'].clearValidate();});
            },
            handleLook(row){
                this.dialogVisible=true
                this.location=row.location
            },
            handleSelectionChange (data) {
                  // console.log(data);  
                this.multipleSelection = data;
               
            },
            handleDelete(){
                let checkArr = this.multipleSelection;   // multipleSelection存储了勾选到的数据
                let params = [];
                checkArr.forEach(function (item) {     
                    params.push(item.id);       // 添加所有需要删除数据的id到一个数组，post提交过去
                });

                this.request.post("http://localhost:8081/infrastructureDelete",params).then(res=>{
                if(res){
                    this.$message.success("删除成功")
                }else{
                    this.$message.error("删除失败")
                }
                })
                clearTimeout(this.timer);  //清除延迟执行 
                
                this.timer = setTimeout(()=>{   //设置延迟执行
                    this.reload();
                },500);

            },
            save(){
                if(this.dialogFuc=="add"){
                    this.request.post("http://localhost:8081/infrastructureAdd",this.form).then(res=>{
                    if(res){
                        this.$message.success("添加成功")
                    }else{
                        this.$message.error("添加失败")
                    }
                })
                }else{
                    this.request.post("http://localhost:8081/infrastructureUpdate",this.form).then(res=>{
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
                this.request.get("http://localhost:8081/infrastructureFindComplex",{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    input1:this.input1,
                    input2:this.input2,
                    input3:this.input3
                }
            }).then(res=>{
                console.log(res)
                 _this.tableData=res.data
                 _this.total=res.total
            })
            },
            reset(){
                this.input1=''
                this.input2=''
                this.input3=''
            },
            exp(){
                window.open("http://localhost:8081/infrastructureExport")
            },
            filterTag(value, row) {
                return row.bedStatus === value;
            },
            
        },
        created(){
            this.load()
        }
    }
</script>

<style lang="scss" scoped>
.function{
    margin-top:20px;
    padding: 20px;
    background-color: white;
    border-radius: 7px;
}
.Search{
    width: 200px;
}
.infrastructure{
    .el-select{
    width: 100%;
}
}

</style>