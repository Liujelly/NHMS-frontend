<template>
  <el-main>
    <div style="margin-top: -20px">
      <p style="font-size: 20px;font-weight: bold">老人健康标准</p>
    </div>
    <el-table :data="tableData" >
      <el-table-column prop="textName"  fixed label="参数名" width="120"></el-table-column>
      <el-table-column prop="heartRateGoodHigh" label="理想心率最大值" width="120"></el-table-column>
      <el-table-column prop="heartRateGoodLow"  label="理想心率最小值" width="120"></el-table-column>
      <el-table-column prop="heartRateMidHigh"  label="正常心率最大值" width="120"></el-table-column>
      <el-table-column prop="heartRateMidLow"  label="正常心率最小值" width="120"></el-table-column>
      <el-table-column prop="heartRateBadHigh"  label="心脏疾病最大阈值" width="140"></el-table-column>
      <el-table-column prop="heartRateBadLow"  label="心脏疾病最小阈值" width="140"></el-table-column>
      <el-table-column prop="bloodOxygenGood"  label="健康血氧高值" width="120"></el-table-column>
      <el-table-column prop="bloodOxygenMid"  label="健康血氧中值" width="120"></el-table-column>
      <el-table-column prop="bloodPressureHighGood"  label="健康高压最大值" width="120"></el-table-column>
      <el-table-column prop="bloodPressureMidGood"  label="健康高压最小值" width="120"></el-table-column>
      <el-table-column prop="bloodPressureLowGood"  label="健康低压最小值" width="120"></el-table-column>
      <el-table-column prop="bloodGlucoseHigh"  label="健康血糖最大值" width="120"></el-table-column>
      <el-table-column prop="bloodGlucoseLow"  label="健康血糖最小值" width="120"></el-table-column>
      <el-table-column prop="bloodFatHigh"  label="健康血脂最大值" width="120"></el-table-column>
      <el-table-column prop="bloodFatLow"  label="健康血脂最小值" width="120"></el-table-column>


      <el-table-column label="操作" fixed="right" width="120" >
        <template slot-scope="scope">
          <el-button type="primary"  size="small" @click="update(scope.row)">更正健康标准 <i class="el-icon-edit"></i></el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="更正健康标准" :visible.sync="dialogFormVisible" width="40%">
      <el-form  label-width="130px" >
        <el-form-item label="理想心率最大值" >
          <el-input v-model="form.heartRateGoodHigh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="理想心率最小值" >
          <el-input v-model="form.heartRateGoodLow" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="正常心率最大值" >
          <el-input v-model="form.heartRateMidHigh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="正常心率最小值" >
          <el-input v-model="form.heartRateMidLow" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="心脏疾病最大阈值" >
          <el-input v-model="form.heartRateBadHigh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="心脏疾病最小阈值" >
          <el-input v-model="form.heartRateBadLow" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康血氧高值" >
          <el-input v-model="form.bloodOxygenGood" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康血氧中值" >
          <el-input v-model="form.bloodOxygenMid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康高压最大值" >
          <el-input v-model="form.bloodPressureHighGood" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康高压最小值" >
          <el-input v-model="form.bloodPressureMidGood" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康低压最小值" >
          <el-input v-model="form.bloodPressureLowGood" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康血糖最大值" >
          <el-input v-model="form.bloodGlucoseHigh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康血糖最小值" >
          <el-input v-model="form.bloodGlucoseLow" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康血脂最大值" >
          <el-input v-model="form.bloodFatHigh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康血脂最小值" >
          <el-input v-model="form.bloodFatLow" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateStandard">确 定</el-button>
      </div>
    </el-dialog>

    <div  class="function">
      <div style="margin-bottom: 40px;margin-left: 50px">当前体检率:</div>
      <el-progress type="circle"  :color="customColors" style="margin-left: 200px;" :percentage="exam"></el-progress>

    </div>



  </el-main>

</template>

<script>
import request from "@/utils/request";

export default {
  name: "HealthIndexStandard",
  data() {
    return {
      form:{},
      dialogFormVisible:false,
      exam:25,


      customColors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],

      tableData:[],


      heartRateGoodHigh:"",
      heartRateGoodLow:"",
      heartRateMidHigh:"",
      heartRateMidLow:"",
      heartRateBadHigh:"",
      heartRateBadLow:"",
      bloodOxygenGood:"",
      bloodOxygenMid:"",
      bloodPressureHighGood:"",
      bloodPressureMidGood:"",
      bloodPressureLowGood:"",
      bloodGlucoseHigh:"",
      bloodGlucoseLow:"",
      bloodFatHigh:"",
      bloodFatLow:"",



    }
  },
  created() {
    this.load();
  },
  methods:{
    updateStandard(){
        request.post("/standard/update",this.form).then(res=>{
          if(res){
            this.$message.success("修改成功")
            this.dialogFormVisible=false;
            this.load();
          }
          else {
            this.$message.error("修改失败")
          }
        })
    },
    update(row){

      this.form={};
      this.form=row;
      // this.form.heartRateGoodHigh=row.heartRateGoodHigh;
      // this.form.heartRateGoodLow=row.heartRateGoodLow;
      // this.form.heartRateMidHigh=row.heartRateMidHigh;
      // this.form.heartRateMidLow=row.heartRateMidLow;
      // this.form.heartRateBadHigh=row.heartRateBadHigh;
      // this.form.heartRateBadLow=row.heartRateBadLow;
      // this.form.bloodOxygenGood=row.bloodOxygenGood;
      // this.form.bloodOxygenMid = row.bloodOxygenMid;
      // this.form.bloodPressureHighGood=row.bloodPressureHighGood;
      // this.form.bloodPressureMidGood=row.bloodPressureMidGood;
      // this.form.bloodPressureLowGood=row.bloodPressureLowGood;
      // this.form.bloodGlucoseHigh=row.bloodGlucoseHigh;
      // this.form.bloodGlucoseLow=row.bloodGlucoseLow;
      // this.form.bloodFatHigh=row.bloodFatHigh;
      // this.form.bloodFatLow=row.bloodFatLow;
      this.dialogFormVisible=true;


    },
    load(){
      request.get("/standard/show",{
        params:{


          heartRateGoodHigh:this.heartRateGoodHigh,
          heartRateGoodLow:this.heartRateGoodLow,
          heartRateMidHigh:this.heartRateMidHigh,
          heartRateMidLow:this.heartRateMidLow,
          heartRateBadHigh:this.heartRateBadHigh,
          heartRateBadLow:this.heartRateBadLow,
          bloodOxygenGood:this.bloodOxygenGood,
          bloodOxygenMid:this.bloodOxygenMid,
          bloodPressureHighGood:this.bloodPressureHighGood,
          bloodPressureMidGood:this.bloodPressureMidGood,
          bloodPressureLowGood:this.bloodPressureLowGood,
          bloodGlucoseHigh:this.bloodGlucoseHigh,
          bloodGlucoseLow:this.bloodGlucoseLow,
          bloodFatHigh:this.bloodFatHigh,
          bloodFatLow:this.bloodFatLow,
          exam:this.exam,

        }
      }).then(res=>{
        console.log(res)
        this.tableData=res.data;

        this.totalNum=res.totalNum;
        this.phyNum=res.phyNum;
        let tem=this.phyNum/this.totalNum*100
        
        this.exam=parseFloat(tem).toFixed(2)
      })
    },
    cancel(){
      this.dialogFormVisible=false;

    },
    updatePE() {
    }

  }
}
</script>

<style scoped>

.function{
  margin-top:20px;
  padding: 20px;
  background-color: white;
  border-radius: 7px;
}
</style>