<template>
    <div>
        <div class="function">
            <el-button  type="success"  style="margin-left:5px;margin-right:10px" @click="handleAdd">新增房间</el-button>
            <el-button type="primary" style="margin-right:35px" @click="exp">导出数据</el-button>
            <el-input  
                style="margin-left:15px" 
                class="Search"
                size="medium"
                placeholder="请输入房间名称"
                v-model="input1">
            </el-input>
            <el-input
                style="margin-left:10px"            
                class="Search"
                size="medium"
                placeholder="请输入使用用途"
                v-model="input2">
            </el-input>
            <el-input
                style="margin-left:10px"
                class="Search"
                size="medium"
                placeholder="请输入楼宇id"
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
            label="id" width="70">   
            </el-table-column>
            <el-table-column
            prop="buildingId"
            label="楼宇id">
            </el-table-column>
            <el-table-column
            prop="roomName"
            label="房间名称">
            </el-table-column>
            <el-table-column
            prop="area"
            label="面积">
            </el-table-column>
            <el-table-column
            prop="purpose"
            label="使用用途">
            </el-table-column>
            <el-table-column
            prop="status"
            label="状态"
            width="100"
            :filters="[{ text: '使用中', value: '使用中' }, { text: '闲置', value: '闲置' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                :type="scope.row.status === '使用中' ? 'success' : 'primary'"
                disable-transitions>{{scope.row.status}}</el-tag>
            </template>
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
            <el-form label-width="80px" size="small" :model="form" :rules="rules" ref="formName">
                <el-form-item label="楼宇id">
                <el-input v-model="form.buildingId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房间名称" prop="roomName">
                <el-input v-model="form.roomName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="面积">
               <el-input v-model="form.area" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="使用目的">
                <el-input v-model="form.purpose" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="请选择" style="width:100%">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
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
                value: '使用中',
                label: '使用中'
                }, {
                value: '闲置',
                label: '闲置'
                }],
                value: '使用中',
                rules:{
                roomName:[
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
            pageSize:5,
            dialogFormVisible: false,
            }
        },
        methods: {
            load(){
                const _this=this
                this.request.get("http://localhost:8081/roomFindAll",{
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
                this.dialogTitle="新增房间"
                this.dialogFormVisible = true
                this.form={}
            },
            handleEdit(row){
                this.dialogFuc="edit"
                this.dialogTitle="编辑房间"
                this.form=row
                this.dialogFormVisible=true
                this.$nextTick(() => {  this.$refs['formName'].clearValidate();});
            },
            save(){
                if(this.dialogFuc=="add"){
                    this.request.post("/roomAdd",this.form).then(res=>{
                    if(res){
                        this.$message.success("添加成功")
                    }else{
                        this.$message.error("添加失败")
                    }
                })
                }else if(this.dialogFuc=="edit"){
                    this.request.post("/roomUpdate",this.form).then(res=>{
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
                this.request.get("/roomFindComplex",{
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
                window.open("/roomExport")
            },
            filterTag(value, row) {
                return row.status === value;
            },

            nameRules(rule, value, callback){
                if(this.dialogFuc=="add"){
                for(var i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].roomName==value){
                        callback("该房间已存在")
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