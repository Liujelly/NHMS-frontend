<template>
    <div class="user">
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">用户管理</p>
        </div>
                <div class="function">
            <el-button  type="success"  style="margin-left:5px;margin-right:10px" @click="handleAdd">新增用户</el-button>
            <el-input  
                style="margin-left:15px" 
                class="Search"
                size="medium"
                placeholder="请输入用户名"
                v-model="input1">
            </el-input>
            <el-input
                style="margin-left:10px"            
                class="Search"
                size="medium"
                placeholder="请输入真实姓名"
                v-model="input2">
            </el-input>
            <el-button  style="margin-left:10px" @click="reset">重置</el-button>
            <el-button type="primary" @click="findComplex">搜索</el-button>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%;margin-top:20px"
            :default-sort = "{prop: 'operationTime', order: 'descending'}"
            >
            <el-table-column
            prop="userName"
            label="用户名/工号">
            </el-table-column>
            <el-table-column
            prop="relName"
            label="真实姓名">
            </el-table-column>
            <el-table-column
            prop="createdBy"
            label="创建人">
            </el-table-column>
            <el-table-column
            prop="createdTime"
            label="创建时间">
            </el-table-column>
            <el-table-column
            prop="roleName"
            label="角色">
            </el-table-column>
            <el-table-column
            prop="enabled"
            label="用户状态"
             width="140"
            >
            <template slot-scope="scope">
            <el-switch
            style="display: block"
            v-model="scope.row.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="启用"
            inactive-text="禁用"
            @change="statusChange(scope.row)">
            </el-switch>
            </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100"
            >
            <template slot-scope="scope">
                <el-button @click="handleEditRole(scope.row)" type="text" size="small">修改角色</el-button>
            </template>
            </el-table-column>        
        </el-table>
        <div style="padding: 10px 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[5, 9, 15]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        
            <el-dialog title="修改角色" :visible.sync="dialogFormVisible" width="20%">
            <el-form label-width="80px" size="small" :model="form" >
                <el-form-item>
                    <el-select v-model="form.roleId" placeholder="请选择角色" style="margin-left:-50px">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateRole(form)">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加用户" :visible.sync="addRoledialogFormVisible" width="30%">
            <el-form label-width="80px" size="small" :model="form" >
                    <el-form-item label="用户名">
                        <el-input v-model="form.userName" placeholder="请输入工号作为用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="初始密码">
                        <el-input v-model="form.userName" placeholder="初始密码为工号" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="角色">
                    <el-select v-model="form.roleId" placeholder="请选择角色" width=100%>
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footerName">
                <el-button @click="addRoledialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save(form)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    
    export default {
        name:'Log',
        inject: ['reload'],
        data() {
            return {
            tableData:[],
            total:0,
            input1: '',
            input2: '',
            pageNum:1,
            pageSize:9,
            switchValue:true,
            dialogFormVisible: false,
            addRoledialogFormVisible:false,
            form:{},
            options: [],
            }
        },
        methods:{
            load(){
                const _this=this
                this.request.get("http://localhost:8081/findAllUser",{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then(res=>{
                console.log(res)
                 _this.tableData=res.data
                 _this.total=res.total
                 _this.options=res.options
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
            findComplex(){
                const _this=this
                this.request.get("http://localhost:8081/userFindComplex",{
                params:{
                    pageNum:_this.pageNum,
                    pageSize:_this.pageSize,
                    input1:_this.input1,
                    input2:_this.input2,
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
                this.load()
            },
            statusChange(row){
                const _this=this
                this.request.post("http://localhost:8081/updateEnabled",row).then(res=>{
                if(res){
                    this.$message.success("修改状态成功")
                }
            })
            },
            handleEditRole(row){
                this.form=row
                this.value=row.roleId
                this.dialogFormVisible=true
            },
            updateRole(form){
                const _this=this
                this.request.post("http://localhost:8081/updateRole",form).then(res=>{
                if(res){
                    _this.$message.success("修改角色成功")
                }else{
                     _this.$message.error("修改角色失败")
                }
            })
                this.dialogFormVisible=false
                clearTimeout(this.timer);  //清除延迟执行 
            
                this.timer = setTimeout(()=>{   //设置延迟执行
                    this.load();
                },100);
            },
            handleAdd(){
                this.form={}
                this.addRoledialogFormVisible=true
            },
            save(form){
                const _this=this
                this.request.post("http://localhost:8081/addUser",form).then(res=>{
                if(res){
                    _this.$message.success("添加用户成功")
                }else{
                     _this.$message.error("添加用户失败")
                }
            })
                this.addRoledialogFormVisible=false
                clearTimeout(this.timer);  //清除延迟执行 
            
                this.timer = setTimeout(()=>{   //设置延迟执行
                    this.load();
                },100);
            }
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
.user{
    .el-select{
    width: 100%;
}
}
</style>