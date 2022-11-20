<template>
  <div>
      <div style="margin: bottom 30px;">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item >首页</el-breadcrumb-item> -->
          <el-breadcrumb-item>物资出库</el-breadcrumb-item>
        </el-breadcrumb>
          
      </div>
      <div style="padding:10px 0">
      <el-input style="width:200px" placeholder="请输入入库批次" suffix-icon="el-icon-search" v-model="inboundNumber">
      </el-input><el-input style="width:200px" placeholder="请输物资名称" suffix-icon="el-icon-search" v-model="materialName">
      </el-input><el-input style="width:200px" placeholder="请输入操作人" suffix-icon="el-icon-search" v-model="inOperator">
      
      </el-input><el-button class="ml-5" type="primary" @click="load()">搜索</el-button>
      </div>
      <div style="margin:10px 0" >
        
      <el-button type="primary" @click="exp" class="ml-5">导出<i class="el-icon-bottom-right"></i></el-button>
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
      </div>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="inboundNumber" label="入库批次" width="120">
          </el-table-column>
          <el-table-column prop="materialNumber" label="物资编号" width="120">
          </el-table-column>
          <el-table-column prop="materialName" label="物资名称" >
          </el-table-column>
          <el-table-column prop="warehousingQuantity" label="库存数量" width="120">
          </el-table-column>
          <el-table-column prop="warehousingTime" label="入库时间" >
          </el-table-column>
          <el-table-column prop="productionDate" label="生产日期" >
          </el-table-column>

          <el-table-column prop="mSupplier" label="供应商" width="120">
          </el-table-column>
          <el-table-column prop="shelfLife" label="保质期 " >
          </el-table-column>
          <el-table-column prop="inOperator" label="操作人" >
          </el-table-column>
          <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-button type="success" size="small" @click="handleIWare(scope.row)">出库<i class="el-icon-s-fold" ></i></el-button>
                <el-popconfirm
                class="ml-5"
                  confirm-button-text='确定'
                  cancel-button-text='不用了'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定删除吗？"
                  @confirm="del(scope.row.inboundNumber)"
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
      <el-dialog title="物资信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form label-width="120px" size="small">
        <el-form-item label="入库批次" >
        <el-input v-model="form.inboundNumber" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="物资编号" >
        <el-input v-model="form.materialNumber" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="物资名称" >
        <el-input v-model="form.materialName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="出库数量" >
        <el-input v-model="form.warehousingQuantity" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" >
        <el-input v-model="form.warehousingTime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="生产日期" >
        <el-input v-model="form.productionDate" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商" >
        <el-input v-model="form.mSupplier" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="保质期" >
        <el-input v-model="form.shelfLife" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="操作人" >
        <el-input v-model="form.inOperator" autocomplete="off" ></el-input>
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
        <el-button type="primary" @click="inWarehouse()">确 定</el-button>
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
              inboundNumber:"",
              materialName:"",
              warehousingQuantity:"",
              inOperator:"",
              warehousingTime:"",
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
      if(this.inboundNumber=="" ){
          request.get( "/MaterialDetail/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&materialName="+this.materialName+"&inOperator="+this.inOperator).then(res=>{console.log(res)
      this.tableData=res.date
      this.total=res.total
      })
      }
      else{
        request.get( "/MaterialDetail/page1?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&inboundNumber="+this.inboundNumber).then(res=>{console.log(res)
      this.tableData=res.date
      this.total=res.total
      })
      }
      
    
  },

  handleIWare(row){
this.form=row
this.dialogFormVisible=true
this.form.warehousingQuantity=0
this.form.inOperator=""
    },
    //出库

    inWarehouse(){
      
      request.post("/MaterialDetail/InWarehouse",this.form).then(res=>{
        if(res){
    this.$message.success("出库成功")
    this.dialogFormVisible=false
    this.load()
  }else{
    this.$message.success("出库失败")
  }
      })
    },

    //删除
    del(inboundNumber) {
     request.delete("/MaterialDetail/"+inboundNumber).then(res=>{
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
      let mIds=this.multipleSelection.map(v=>v.mId)
      request.post("/MaterialDetail/batch",mIds).then(res=>{
      if(res!=null){
    this.$message.success("批量删除成功")

    this.load()
  }else{
    this.$message.error("批量删除失败")
  }
     })
    },

  //导出
exp(){
  window.open("http://localhost:8081/MaterialDetail/export")
},

 
  

  handleSelectionChange(val){
console.log(val)
this.multipleSelection=val

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