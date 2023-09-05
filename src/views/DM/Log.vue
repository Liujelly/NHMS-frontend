<template>
    <div>
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">操作日志</p>
        </div>
        <div>
            <el-input  
                style="margin-left:15px" 
                class="Search"
                size="medium"
                placeholder="请输入操作人"
                v-model="input1">
            </el-input>
            <el-input
                style="margin-left:10px"            
                class="Search"
                size="medium"
                placeholder="请输入操作模块"
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
            prop="userCode"
            label="操作人">
            </el-table-column>
            <el-table-column
            prop="ip"
            label="ip">
            </el-table-column>
            <el-table-column
            prop="type"
            label="操作类型">
            </el-table-column>
            <el-table-column
            prop="description"
            label="操作描述">
            </el-table-column>
            <el-table-column
            prop="model"
            label="操作模块">
            </el-table-column>
            <el-table-column
            prop="operationTime"
            label="操作时间"
            sortable>
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
            }
        },
        methods:{
            load(){
                const _this=this
                this.request.get("/findAllLog",{
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
            findComplex(){
                const _this=this
                this.request.get("/logFindComplex",{
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
                this.input2='',
                this.reload()
            },
        },
         created(){
            this.load()
        }
        
    }
</script>

<style lang="scss" scoped>
.Search{
    width: 200px;
}
</style>