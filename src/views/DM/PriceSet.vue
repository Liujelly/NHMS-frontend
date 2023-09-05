<template>
    <div>
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">收费标准设置</p>
        </div>
        <el-table :data="tableData" class="tb-edit" style="width: 100%" height="577" highlight-current-row @row-click="handleCurrentChange">
            <el-table-column label="房间类型" >
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.roomType" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.roomType}}</span>
                </template>
            </el-table-column>
            <el-table-column label="护理级别">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.careLevel" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.careLevel}}</span>
                </template>
            </el-table-column>
            <el-table-column label="服务费/人/月">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.serviceFee" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.serviceFee}}</span>
                </template>
            </el-table-column>
            <el-table-column label="床位费/人/月">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.bedFee" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.bedFee}}</span>
                </template>
            </el-table-column>
            <el-table-column label="伙食费/人/月">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.foodFee" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.foodFee}}</span>
                </template>
            </el-table-column>
            <el-table-column label="空调费/人/月">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.acFee" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.acFee}}</span>
                </template>
            </el-table-column>
            <el-table-column label="合计">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.amount" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.amount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="折扣率">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.discount" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.discount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="预付金额/月">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.prepaid" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.prepaid}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-row style="margin-top:10px">
            <el-button @click="newFresh">重置</el-button>
            <el-button type="primary" @click="update">更新</el-button>
         </el-row>
    </div>

</template>

<script>
    export default {
        name:"PriceSet",
        inject: ['reload'],
        data() {
            return {
            tableData: [],
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            };
        },
         methods: {
            handleCurrentChange(row, event, column) {
                console.log(row, event, column, event.currentTarget)
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            newFresh(){
                this.reload();
            },
            update(){
                this.request.post("/ChaStaUpdate",this.tableData).then(res=>{
                    if(res){
                        this.$message.success("更新成功")
                    }else{
                        this.$message.error("更新失败")
                    }
            })
            
            clearTimeout(this.timer);  //清除延迟执行 
            
            this.timer = setTimeout(()=>{   //设置延迟执行
                this.reload();
            },500);
  
            }
        },
        created(){
            const _this=this
            this.request.get("/ChaStaFind").then(res=>{
                console.log(res)
                _this.tableData=res.data
            })
        }
    }
</script>
<style>
.el-table{
    border-radius: 7px;
}
.tb-edit .el-input {
    display: none
}
.tb-edit .current-row .el-input {
    display: block
}
.current-row{
    height: 20px;
}
.tb-edit .current-row .el-input+span {
    display: none
}
</style>