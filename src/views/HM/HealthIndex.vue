<template>
  <el-main>
    <div style="margin-top: -20px">
      <p style="font-size: 20px;font-weight: bold">老人健康指数</p>
    </div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" v-model="orderId" suffix-icon="el-icon-search" placeholder="请输入编号" ></el-input>
      <el-input style="width: 200px; margin-left: 5px" v-model="orderName" suffix-icon="el-icon-user" placeholder="请输入姓名" class="ml-5" ></el-input>
      <el-button style="margin-left: 5px" class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button  type="warning" @click="reset">重置</el-button>
    </div>
    <el-table :data="tableData" stripe >
      <el-table-column prop="orderId" label="老人编号" width="120"></el-table-column>
      <el-table-column prop="orderName" label="姓名" width="120"></el-table-column>
      <el-table-column prop="bmi"  label="BMI" width="120"></el-table-column>
      <el-table-column prop="heartRateIndex"  label="心率指数" width="120"></el-table-column>
      <el-table-column prop="bloodOxygenIndex"  label="血氧指数" width="120"></el-table-column>
      <el-table-column prop="bloodPressureIndex"  label="血压指数" width="120"></el-table-column>
      <el-table-column prop="bloodGlucoseIndex"  label="血糖指数" width="120"></el-table-column>
      <el-table-column prop="bloodFatIndex"  label="血脂指数" width="120"></el-table-column>
      <el-table-column prop="temperatureIndex"  label="体温指数" width="120"></el-table-column>
      <el-table-column prop="healthIndexNum"  label="健康指数" width="120"></el-table-column>
    </el-table>

    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>



  </el-main>

</template>

<script>
import request from "@/utils/request";

export default {
  name:"HealthIndex",
  data() {

    return {
      tableData:[],
      total:0,
      pageNum:1,
      pageSize:10,
      dialogFormVisible:false,
      dialogFormVisibleInput:false,
      dialogTitle:'',
      orderName: "",
      orderId: "",


    }
  },
  created() {
    this.load()
  },
  methods: {
    reset(){
      this.orderName="";
      this.orderId="";
      this.load();
    },
    load(){
      request.get("/healthIndex/show",{
        params:{

          pageNum:this.pageNum,
          pageSize:this.pageSize,
          orderId: this.orderId,
          orderName:this.orderName,
          bmi:this.bmi,
          heartRateIndex:this.heartRateIndex,
          bloodOxygenIndex:this.bloodOxygenIndex,
          bloodPressureIndex:this.bloodPressureIndex,
          bloodGlucoseIndex:this.bloodGlucoseIndex,
          bloodFatIndex:this.bloodFatIndex,
          temperatureIndex:this.temperatureIndex,
          healthIndexNum:this.healthIndexNum
        }
      }).then(res=>{
        console.log(res)
        this.tableData=res.data
        this.total=res.total
      })
    },
    handleSizeChange(pageSize){
      console.log(pageSize)
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      console.log(pageNum)
      this.pageNum=pageNum
      this.load()
    },

  }
}
</script>

<style >

</style>