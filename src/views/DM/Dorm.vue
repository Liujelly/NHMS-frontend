<template>
    <div>
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">宿舍管理</p>
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
                placeholder="请输入宿舍类型"
                v-model="input2">
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
            label="楼宇id">
            </el-table-column>
            <el-table-column
            prop="dormName"
            label="宿舍名称">
            </el-table-column>
            <el-table-column
            prop="dormType"
            label="宿舍类型">
            </el-table-column>
            <el-table-column
            prop="bedAvailable"
            label="剩余床位">
            </el-table-column>
            <el-table-column
            prop="bedStatus"
            label="床位状态"
            width="100"
            :filters="[{ text: '未满员', value: '未满员' }, { text: '满员', value: '满员' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                :type="scope.row.bedStatus === '未满员' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.bedStatus}}</el-tag>
            </template>
            </el-table-column>
                        
            <el-table-column
            fixed="right"
            label="操作"
            width="125">
            <template slot-scope="scope">
                <el-button @click="handleLook(scope.row)" type="text" size="small">查看入住老人</el-button>
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
            <p>{{elderlyNames}}</p>
        </el-dialog>

        <el-dialog v-bind:title="dialogTitle" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small" :model="form" :rules="rules"  ref="formName">
                <el-form-item label="楼宇id" prop="buildingId">
                <el-input v-model="form.buildingId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="宿舍名称" prop="dormName">
                <el-input v-model="form.dormName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="宿舍类型">
                <el-input v-model="form.dormType" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="剩余床位">
                <el-input v-model="form.bedAvailable" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="床位状态">
                   <el-input v-model="form.bedStatus" autocomplete="off" :disabled="true"></el-input>
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
            multipleSelection:'',
            rules:{
            dormName:[
                {
                    validator:this.nameRules, trigger: 'change'
                }
            ],
             buildingId:[
                {
                    validator:this.buildingIdRules, trigger: 'change'
                }
            ],
            },
            buildingIds:[],
            tableData:[],
            form:{},
            input1: '',
            input2: '',
            elderlyNames:'',
            total:0,
            dialogTitle:'新增宿舍',
            pageNum:1,
            pageSize:5,
            dialogFormVisible: false,
            dialogVisible:false
            }
        },
        methods: {
            load(){
                const _this=this
                this.request.get("http://localhost:8081/dormFindAll",{
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
                this.dialogFormVisible = true
                this.$nextTick(() => {  this.$refs['formName'].clearValidate();});
                this.form.bedStatus="未满员"
            },
            handleLook(row){
                this.dialogVisible=true
                this.elderlyNames=row.elderlyNames
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

                this.request.post("http://localhost:8081/dormDelete",params).then(res=>{
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
                    this.request.post("http://localhost:8081/dormAdd",this.form).then(res=>{
                    if(res){
                        this.$message.success("添加成功")
                    }else{
                        this.$message.error("添加失败")
                    }
                })
                clearTimeout(this.timer);  //清除延迟执行 
                
                this.timer = setTimeout(()=>{   //设置延迟执行
                    this.reload();
                },500);
            },
            findComplex(){
                const _this=this
                this.request.get("http://localhost:8081/dormFindComplex",{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    input1:this.input1,
                    input2:this.input2,
                }
            }).then(res=>{
                console.log(res)
                 _this.tableData=res.data
                 _this.total=res.total
            })
            },
            reset(){
                this.input1='',
                this.input2=''
            },
            exp(){
                window.open("http://localhost:8081/DormExport")
            },
            filterTag(value, row) {
                return row.bedStatus === value;
            },

            nameRules(rule, value, callback){
                for(var i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].dormName==value){
                        callback("该宿舍已存在")
                        break
                    }
                }
            
            },
            buildingIdRules(rule, value, callback){
                let judge=true;
                console.log("11")
                console.log(this.buildingIds)
                for(var i=0;i<this.buildingIds.length;i++){
                    if(this.buildingIds[i]==value||value==''){
                        judge=false;
                        break
                    }
                }
                if(judge){
                    callback("该楼不存在")
                }
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