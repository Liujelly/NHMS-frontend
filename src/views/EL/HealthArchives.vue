<template>
  <el-main>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" v-model="orderId" suffix-icon="el-icon-search" placeholder="请输入编号" ></el-input>
      <el-input style="width: 200px; margin-left: 5px" v-model="orderName" suffix-icon="el-icon-user" placeholder="请输入姓名" class="ml-5" ></el-input>
      <el-button  style="margin-left:10px" @click="reset">重置</el-button>
      <el-button type="primary" @click="load">搜索</el-button>
    </div>
    <!--  老人信息展示  -->
    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column prop="orderId" label="老人编号" width="90"></el-table-column>
      <el-table-column prop="peName" label="姓名" width="90"></el-table-column>
      <el-table-column prop="peHeight"  label="身高(cm)" width="90"></el-table-column>
      <el-table-column prop="peWeight"  label="体重(kg)" width="90"></el-table-column>
      <el-table-column prop="peHeartRate"  label="心率(bpm)" width="100"></el-table-column>
      <el-table-column prop="peBloodOxygen"  label="血氧(%)" width="90"></el-table-column>
      <el-table-column prop="peTemperature"  label="体温(°C)" width="90"></el-table-column>
      <el-table-column prop="peBloodPressureHigh"  label="高压(收缩压)(mmHg)" width="120"></el-table-column>
      <el-table-column prop="peBloodPressureLow"  label="低压(舒张压)(mmHg)" width="120"></el-table-column>
      <el-table-column prop="peBloodGlucose"  label="血糖(mmol/L)" width="120"></el-table-column>
      <el-table-column prop="peBloodFat"  label="血脂(mmol/L)" width="120"></el-table-column>

      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button plain @click="show(scope.row)">
            查看详细信息
          </el-button>
        </template>
      </el-table-column>

     <el-table-column prop="peTime"  label="体检时间" width="100"></el-table-column>
     

    </el-table>

    <!--  分页查询  -->
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 15, 20]"
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

  name: "HealthArchives",
  data(){
    return{
      tableData:[],
      orderId:"",
      orderName:"",
      total:0,
      pageNum:1,
      pageSize:10,
      healthLevelNum:"",
      healthLevelSuggest:"",

    }
  },
  created() {
    //请求分页查询数据
    this.load()
  },

  methods:{
    show(row) {
      request.get("http://localhost:8081/and/showHealth", {
        params: {
          orderId: row.orderId
        }
      }).then(res=>{


        let data = ['编号：' + res.orderId,
                    '姓名：' + res.orderName,
                    '健康等级：' + res.healthLevelNum,
                   '健康建议：' + res.healthLevelSuggest,
                   '预警疾病：' + res.diseaseNum,
                   '疾病建议：' + res.diseaseSuggest,
        ];
        let newDatas = [];
        const h = this.$createElement;
        for (let i in data) {
          newDatas.push(h('p', null, data[i]));
        }
        this.$notify({
          title: '健康详情',
          message: h('i', {style:'color:teal'}, newDatas),
          type: 'success',
        });

      })
    },
    show1(row){

      // request.get("http://localhost:8081/elderly",id).then
    },
    handleSelectionChange(val){
      console.log(val)
      this.multipleSelection=val
    },
    reset() {
      this.orderId = ""
      this.orderName = ""
      this.orderIdCard = ""
      this.load()
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
    load(){
      request.get("http://localhost:8081/and/show",{
        params:{
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          orderId: this.orderId,
          orderName:this.orderName,
        }
      }).then(res=>{
        console.log(res)
        this.tableData=res.data
        this.total=res.total
      })
    },


  },

}
</script>

<style scoped>

</style>