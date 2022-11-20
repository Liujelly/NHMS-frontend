<template>
  <div>
      <div style="margin: bottom 30px;">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item >首页</el-breadcrumb-item> -->
          <el-breadcrumb-item>库存预警</el-breadcrumb-item>
        </el-breadcrumb>
          
      </div>
      <div style="padding:10px 0">
      <el-input style="width:200px" placeholder="请输入物资ID" suffix-icon="el-icon-search" v-model="mId">
      </el-input><el-input style="width:200px" placeholder="请输入物资名称" suffix-icon="el-icon-search" v-model="mName">
      </el-input><el-input style="width:200px" placeholder="请输入物资规格" suffix-icon="el-icon-search" v-model="mSpecification">
      </el-input><el-button class="ml-5" type="primary" @click="load()">搜索</el-button>
      </div>
      <div style="margin:10px 0" >
        <!-- <el-button type="primary" @click="handleAdd()">新增<i class="el-icon-circle-plus-outline"></i></el-button>
        <el-popconfirm
              class="ml-5"
                confirm-button-text='确定'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定批量删除吗？"
                @confirm="dalBatch()"
              >
        <el-button type="danger" slot="reference" >批量删除<i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm> -->
        
        <el-button type="primary" @click="exp" class="ml-5" >导出<i class="el-icon-bottom-right"></i></el-button>
      </div>
      <el-table :data="tableData" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName">
        <el-table-column type="selection" width="55" ></el-table-column>
          <el-table-column prop="mId" label="物资ID" width="120">
          </el-table-column>
          <el-table-column prop="mName" label="物资名" width="120">
          </el-table-column>
          <el-table-column prop="mSpecification" label="规格" >
          </el-table-column>
          <el-table-column prop="mUnit" label="单位" width="60">
          </el-table-column>
          <el-table-column prop="mType" label="类型" width="120">
          </el-table-column>
          <el-table-column prop="mLocation" label="存放地址" >
          </el-table-column>
          <el-table-column prop="mQuantity" label="物资数量" width="120">
          </el-table-column>
          <el-table-column prop="mSuppliers" label="供应商" >
          </el-table-column>
          <el-table-column prop="malerts" label="预警" color="#F56C6C" >库存告危
          </el-table-column>
          <!-- <el-table-column prop="mLowest" label="预警最低值" >
          </el-table-column> -->
          <!-- <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="handleIWare(scope.row)">修改<i class="el-icon-s-fold" ></i></el-button>
              <el-button type="success" size="small" @click="handleIWare(scope.row)">修改<i class="el-icon-s-fold" ></i></el-button>
              <el-popconfirm
              class="ml-5"
                confirm-button-text='确定'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="del(scope.row.mId)"
              >
              <el-button type="danger" size="small" slot="reference">删除<i class="el-icon-remove-outline"></i></el-button>
              </el-popconfirm>
            </template>
          </el-table-column> -->
      </el-table>
      <div style="padding: 10px 0;">
        <el-pagination
        @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="5"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
      </div>
      <el-dialog title="物资信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="120px" size="small">
      <el-form-item label="物资ID" >
      <el-input v-model="form.mId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="物资名称" >
      <el-input v-model="form.mName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="物资规格" >
      <el-input v-model="form.mSpecification" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="物资单位" >
      <el-input v-model="form.mUnit" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="物资种类" >
      <el-input v-model="form.mType" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="存放地址" >
      <el-input v-model="form.mLocation" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="物资数量" >
      <el-input v-model="form.mQuantity" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="供应商" >
      <el-input v-model="form.mSuppliers" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="预警最高值" >
      <el-input v-model="form.mHighest" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="预警最低值" >
      <el-input v-model="form.mLowest" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="活动区域" >
      <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
      </div>
      </el-dialog>
      <!-- 入库 -->
      <el-dialog title="物资入库" :visible.sync="dialogFormVisible1" width="30%">
        <el-form label-width="120px" size="small">
        <el-form-item label="物资ID" >
        <el-input v-model="form.mId" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="物资名称" >
        <el-input v-model="form.mName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="物资规格" >
        <el-input v-model="form.mSpecification" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="物资单位" >
        <el-input v-model="form.mUnit" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="物资种类" >
        <el-input v-model="form.mType" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="存放地址" >
        <el-input v-model="form.mLocation" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="入库数量" >
        <el-input v-model="form.mQuantity" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        
        <el-form-item label="供应商" >
        <el-input v-model="form.mSuppliers" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="预警最高值" >
        <el-input v-model="form.mHighest" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="预警最低值" >
        <el-input v-model="form.mLowest" autocomplete="off" ></el-input>
        </el-form-item>
      
        
        
        <!-- <el-form-item label="活动区域" >
        <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="inWarehouse()">确 定</el-button>
        </div>
        </el-dialog>
  </div>
  

</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<script>
import request from '@/utils/request'
  export default {
      name:"Warehouse",
      data() {
          
          return {
              tableData:[],
              total:0,
              pageNum:1,
              pageSize:5,
              mId:"",
              mName:"",
              malerts:"警告",
              mSpecification:"",
              form:{},
              msg: "xpy",
    collapseBtnClass: 'el-icon-s-fold',
    isCollapse: false,
    sideWidth: 200,
    logoTextShow: true,
    headerBg: 'headerBg',
    dialogFormVisible:false,
    dialogFormVisible1:false,
    multipleSelection:[],

    options: [],
    value:"",
    nowDate: "", // 当前日期
              
          }
      },
      created(){
        this.load()
      },
      
  methods:{
    tableRowClassName({row, rowIndex}) {
        if (rowIndex !== 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return 'warning-row';
      },
    load () {
      if(this.mId==""){
          request.get( "/MaterialController/page2?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&mName="+this.mName+"&mSpecification="+this.mSpecification).then(res=>{console.log(res)
      this.tableData=res.date
      this.total=res.total
      })
      }else{
        request.get( "/MaterialController/page1?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&mId="+this.mId).then(res=>{console.log(res)
      this.tableData=res.date
      this.total=res.total
      })
      }
    
  },
  //导出
exp(){
  window.open("http://localhost:8081/export")
},
  // 新增
  handleAdd(){
    this.dialogFormVisible=true
    this.form={}
  },
  handleIWare(row){
this.form=row
this.dialogFormVisible1=true
this.form.mQuantity=0
  },
  inWarehouse(){
    request.post("/Warehouse/InWarehouse",this.form).then(res=>{
      if(res){
  this.$message.success("修改成功")
  this.dialogFormVisible1=false
  this.load()
}else{
  this.$message.success("修改失败")
}
    })
  },
  // 新增
  save(){
request.post("/warehouse",this.form).then(res=>{
if(res){
  this.$message.success("保存成功")
  this.dialogFormVisible=false
  this.load()
}else{
  this.$message.success("保存失败")
}
})
  },
  //删除
  del(mId) {
   request.delete("/"+mId).then(res=>{
    if(res){
  this.$message.success("删除成功")

  this.load()
}else{
  this.$message.success("删除失败")
}
   })
  },
  //修改

  inWarehouse(){
      
      request.post("/Warehouse/InWarehouse",this.form).then(res=>{
        if(res){
    this.$message.success("修改成功")
    this.dialogFormVisible1=false
    this.load()
  }else{
    this.$message.success("修改失败")
  }
      })
    },
  //批量删除
  handleSelectionChange(val){
console.log(val)
this.multipleSelection=val

  },
  dalBatch(){
    let mIds=this.multipleSelection.map(v=>v.mId)
    request.post("/batch",mIds).then(res=>{
    if(res!=null){
  this.$message.success("批量删除成功")

  this.load()
}else{
  this.$message.error("批量删除失败")
}
   })
  },
    handleCurrentChange(pageNum){
console.log(pageNum)
this.pageNum=pageNum
this.load()
  },
  handleSizeChange(pageSize){
    console.log(pageSize)
    this.pageSize=pageSize
    this.load()
  }
  }
  }
  
</script>

<style lang="scss" scoped>

</style>