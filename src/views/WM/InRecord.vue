<template>
  <div>
      <div style="margin: bottom 30px;">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item >首页</el-breadcrumb-item> -->
          <el-breadcrumb-item>入库记录</el-breadcrumb-item>
        </el-breadcrumb>
          
      </div>
      <div style="padding:10px 0">
      <el-input style="width:200px" placeholder="请输入入库批次" suffix-icon="el-icon-search" v-model="inboundNumber">
      </el-input><el-input style="width:200px" placeholder="请输物资名称" suffix-icon="el-icon-search" v-model="materialName">
      </el-input><el-input style="width:200px" placeholder="请输入操作人" suffix-icon="el-icon-search" v-model="inOperator">
      </el-input><el-input style="width:200px" placeholder="请输入入库时间" suffix-icon="el-icon-search" v-model="warehousingTime">
      </el-input><el-button class="ml-5" type="primary" @click="load()">搜索</el-button>
      </div>
      <div style="margin:10px 0" >
        
      <el-button type="primary" @click="exp" class="ml-5">导出<i class="el-icon-bottom-right"></i></el-button>
      </div>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="inboundNumber" label="入库批次" width="120">
          </el-table-column>
          <el-table-column prop="materialNumber" label="物资编号" width="120">
          </el-table-column>
          <el-table-column prop="materialName" label="物资名称" >
          </el-table-column>
          <el-table-column prop="warehousingQuantity" label="入库数量" width="120">
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
      if(this.inboundNumber=="" && this.warehousingTime==""){
          request.get( "/InRecord/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&materialName="+this.materialName+"&inOperator="+this.inOperator).then(res=>{console.log(res)
      this.tableData=res.date
      this.total=res.total
      })
      }if(this.inboundNumber!=""){
        request.get( "/InRecord/page1?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&inboundNumber="+this.inboundNumber).then(res=>{console.log(res)
      this.tableData=res.date
      this.total=res.total
      })
      }
      if(this.inboundNumber==""&& this.warehousingTime!=""){
        request.get( "/InRecord/page2?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&warehousingTime="+this.warehousingTime).then(res=>{console.log(res)
      this.tableData=res.date
      this.total=res.total
      })
      }
      else{
        request.get( "/InRecord/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&materialName="+this.materialName+"&inOperator="+this.inOperator).then(res=>{console.log(res)
      this.tableData=res.date
      this.total=res.total
      })
      }
    
  },

  //导出
exp(){
  window.open("http://localhost:8081/InRecord/export")
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