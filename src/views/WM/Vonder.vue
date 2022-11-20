<template>
  <div>
      <div style="margin: bottom 30px;">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item >首页</el-breadcrumb-item> -->
          <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
        </el-breadcrumb>
          
      </div>
      <div style="padding:10px 0">
      <el-input style="width:200px" placeholder="请输入供应商ID" suffix-icon="el-icon-search" v-model="supplierNum">
      </el-input><el-input style="width:200px" placeholder="请输供应商名称" suffix-icon="el-icon-search" v-model="supplierName">
      </el-input><el-input style="width:200px" placeholder="请输入供应商地址" suffix-icon="el-icon-search" v-model="supplierAddress">
      </el-input><el-button class="ml-5" type="primary" @click="load()">搜索</el-button>
      </div>
      <div style="margin:10px 0" >
        <el-button type="primary" @click="handleAdd()">新增<i class="el-icon-circle-plus-outline"></i></el-button>
        <el-popconfirm
              class="ml-5"
                confirm-button-text='确定'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定批量删除吗？"
                @confirm="dalBatch()"
              >
        <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
      <el-button type="primary" @click="exp" class="ml-5">导出<i class="el-icon-bottom-right"></i></el-button>
      </div>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="supplierNum" label="供应商ID" width="120">
          </el-table-column>
          <el-table-column prop="supplierName" label="供应商名称" >
          </el-table-column>
          <el-table-column prop="supplierAddress" label="规供应商地址" >
          </el-table-column>
          <el-table-column prop="businessScope" label="经营范围" width="120">
          </el-table-column>
          <el-table-column prop="supplierPerson" label="负责人" >
          </el-table-column>
          <el-table-column prop="supplierPhone" label="联系电话" >
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="handleIWare(scope.row)">修改<i class="el-icon-s-fold" ></i></el-button>
              <el-popconfirm
              class="ml-5"
                confirm-button-text='确定'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="del(scope.row.supplierNum)"
              >
              <el-button type="danger" size="small" slot="reference">删除<i class="el-icon-remove-outline"></i></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
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
      <el-dialog title="供应商信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="120px" size="small">
      
      <el-form-item label="供应商名称" >
      <el-input v-model="form.supplierName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="供应商地址" >
      <el-input v-model="form.supplierAddress" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="经营范围" >
      <el-input v-model="form.businessScope" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="负责人" >
      <el-input v-model="form.supplierPerson" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" >
      <el-input v-model="form.supplierPhone" autocomplete="off"></el-input>
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
      
  </div>
  

</template>

<script>
import request from '@/utils/request'
  export default {
      name:"Vonder",
      data() {
          
          return {
              tableData:[],
              total:0,
              pageNum:1,
              pageSize:5,
              supplierNum:"",
              supplierName:"",
              supplierAddress:"",
              form:{},
              msg: "xpy",
    collapseBtnClass: 'el-icon-s-fold',
    isCollapse: false,
    sideWidth: 200,
    logoTextShow: true,
    headerBg: 'headerBg',
    dialogFormVisible:false,
    
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
    load () {
      if(this.supplierNum==""){
          request.get( "/Supplier/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&supplierName="+this.supplierName+"&supplierAddress="+this.supplierAddress).then(res=>{console.log(res)
      this.tableData=res.date
      this.total=res.total
      })
      }else{
        request.get( "/Supplier/page1?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&supplierNum="+this.supplierNum).then(res=>{console.log(res)
      this.tableData=res.date
      this.total=res.total
      })
      }
    
  },

  //导出
exp(){
  window.open("http://localhost:8081/Supplier/export")
},

  // 新增
  handleAdd(){
    this.dialogFormVisible=true
    this.form={}
  },
  //修改
  handleIWare(row){
this.form=row
this.dialogFormVisible=true
  },
  //修改
//   inWarehouse(){
//     request.post("/Supplier/InWarehouse",this.form).then(res=>{
//       if(res){
//   this.$message.success("修改成功")
//   this.dialogFormVisible1=false
//   this.load()
// }else{
//   this.$message.success("修改失败")
// }
//     })
//   },
  // 新增和修改
  save(){
request.post("/Supplier/warehouse",this.form).then(res=>{
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
  del(supplierNum) {
   request.delete("/Supplier/"+supplierNum).then(res=>{
    if(res){
  this.$message.success("删除成功")

  this.load()
}else{
  this.$message.success("删除失败")
}
   })
  },
  //批量删除
  handleSelectionChange(val){
console.log(val)
this.multipleSelection=val

  },
  dalBatch(){
    let supplierNums=this.multipleSelection.map(v=>v.supplierNums)
    request.post("/Supplier/batch",supplierNums).then(res=>{
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