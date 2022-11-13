<template>
  <el-main>

      <div style="margin: 10px 0">
        <el-input style="width: 200px" v-model="orderId" suffix-icon="el-icon-search" placeholder="请输入编号" ></el-input>
        <el-input style="width: 200px; margin-left: 5px" v-model="orderName" suffix-icon="el-icon-user" placeholder="请输入姓名" class="ml-5" ></el-input>
        <el-input style="width: 200px;margin-left: 5px " v-model="orderIdCard" suffix-icon="el-icon-postcard" placeholder="请输入身份证号"  class="ml-5"></el-input>
        <el-button style="margin-left: 5px" class="ml-5" type="primary" @click="load">搜索</el-button>
        <el-button  type="warning" @click="reset">重置</el-button>
      </div>

    <!--  老人信息展示  -->
    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column prop="orderId" label="老人编号" width="140"></el-table-column>
      <el-table-column prop="orderName" label="姓名" width="140"></el-table-column>
      <el-table-column prop="orderIdCard"  label="身份证号" width="200"></el-table-column>
    <!--  录入状态    -->
      <el-table-column
          prop="orderState"
          label="录入状态"
          width="100"
          :filters="[{ text: '已录入', value: '已录入' }, { text: '未录入', value: '未录入' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.orderState === '已录入' ? 'success' : 'primary'"
              disable-transitions>{{scope.row.orderState}}</el-tag>
        </template>
      </el-table-column>


      <!--  增加/修改/查看 按钮    -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success"  size="small" @click="savePE(scope.row)">录入体检信息<i class="el-icon-thumb"></i></el-button>
          <el-button type="primary" size="small" @click="selectPE(scope.row)">查看体检信息<i class="el-icon-info"></i></el-button>
          <el-button type="danger"  size="small" @click="update(scope.row)">修改体检信息 <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger"  style="margin-left: 20px" size="small" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
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

    <!-- 查看/修改 体检数据对话框   -->
    <el-dialog v-bind:title="dialogTitle" :visible.sync="dialogFormVisible" width="30%">
      <el-form  label-width="80px" >
        <el-form-item label="体检编号" >
          <el-input v-model="form.peId" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="老人编号" >
          <el-input v-model="form.orderId" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" >
          <el-input v-model="form.peName" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-input v-model="form.peGender" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" >
          <el-input v-model="form.peAge" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="体重" >
          <el-input v-model="form.peWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身高" >
          <el-input v-model="form.peHeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="体温" >
          <el-input v-model="form.peTemperature" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="心率" >
          <el-input v-model="form.peHeartRate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="血氧" >
          <el-input v-model="form.peBloodOxygen" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="高压" >
          <el-input v-model="form.peBloodPressureHigh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="低压" >
          <el-input v-model="form.peBloodPressureLow" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="血糖" >
          <el-input v-model="form.peBloodGlucose" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="血脂" >
          <el-input v-model="form.peBloodFat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="体检时间" >
          <el-input v-model="form.peTime" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updatePE">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 录入体检数据对话框   -->
    <el-dialog title="录入体检信息" :visible.sync="dialogFormVisibleInput" width="30%">
      <el-form  label-width="120px"   >
        <el-form-item label="老人编号" >
          <el-input v-model="formInput.orderId" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" >
          <el-input v-model="formInput.peName" :disabled="true" oninput="value=value.replace(/\s+/g,'')" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" >
          <el-input v-model="formInput.peGender" :disabled="true"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄"   >
          <el-input v-model="formInput.peAge" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="体重(千克)" >
          <el-input  v-model="formInput.peWeight"
                     oninput = "if(value> 260)value=260;if(value<0)value=25"
                     onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
                     onKeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false"
                     autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="身高(厘米)" >
          <el-input v-model="formInput.peHeight"
                    oninput = "if(value> 260)value=260;if(value<0)value=100"
                    onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
                    onKeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="体温(摄氏度)" >
          <el-input v-model="formInput.peTemperature"
                    oninput = "if(value> 42)value=42;if(value<0)value=1"
                    onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
                    onKeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="心率(次/分钟)" >
          <el-input v-model="formInput.peHeartRate"
                    oninput = "if(value> 220)value=200;if(value<0)value=0"
                    onkeyup="this.value=this.value.replace(/\D/g,'')"
                    onafterpaste="this.value=this.value.replace(/\D/g,'')"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="血氧(%)" >
          <el-input v-model="formInput.peBloodOxygen"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="高压(mmHg)" >
          <el-input v-model="formInput.peBloodPressureHigh"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="低压(mmHg)" >
          <el-input v-model="formInput.peBloodPressureLow" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="血糖(mmol/L)" >
          <el-input v-model="formInput.peBloodGlucose" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="血脂(mmol/L)" >
          <el-input v-model="formInput.peBloodFat" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>



  </el-main>

</template>

<script>

import request from "@/utils/request";
export default {
    name:"HealthInput",
      data() {
          return {
            formInline: {
              user: '',
              region: ''
            },

            data:[],
            form:{},
            formInput:{},
            peId:"",
            peName:"",
            peGender:"",
            peAge:"",
            peWeight:"",
            peHeight:"",
            peTemperature:"",
            peHeartRate:"",
            peBloodOxygen:"",

            peBloodFat:"",
            peBloodGlucose:"",
            peBloodPressureLow:"",
            peBloodPressureHigh:"",

            peTime:new Date,
            tableData: [],
            orderId:"",
            orderName:"",
            orderIdCard:"",
            orderState:"",

            total:0,
            pageNum:1,
            pageSize:10,
            dialogFormVisible:false,
            dialogFormVisibleInput:false,
            dialogTitle:'',

            value1:"",

            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() > Date.now() - 8.64e6;//如果不包括今天。就是return time.getTime() > Date.now() - 24*3600*1000;
              }
            },



          }
      },

  created() {
    //请求分页查询数据
    this.load()
  },
    methods: {

      del(orderId) {
        request.get("order/delete", {
          param: {
            orderId: this.orderId
          }
        }).then(res => {
          if (res) {
            this.$message.success("删除成功")
            this.load()
          } else {
            this.$message.error("删除失败")
          }
        })
      },


      //体检状态标签
      filterTag(value, row) {
        return row.orderState === value;
      },


      load1() {
        request.get("/order/page1", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            orderId: this.orderId,
            orderName: this.orderName,
            orderIdCard: this.orderIdCard,
            radio1: this.radio1,
            radio2: this.radio2,
          }
        }).then(res => {
          console.log(res)
          this.tableData = res.records
          this.total = res.total
        })
      },
      reset() {
        this.orderId = ""
        this.orderName = ""
        this.orderIdCard = ""
        this.load()
      },
      //修改体检数据
      updatePE() {
        if (this.dialogTitle === "修改体检信息") {
          request.post("/exam/updatePE", this.form).then(res => {
            if (res) {
              this.$message.success("修改成功")
              this.dialogFormVisible = false
              this.load()
            } else {
              this.$message.error("修改失败")
            }
          })
        } else {
          this.dialogFormVisible = false
        }

      },
      //修改体检信息弹框
      update(row) {
        const _this = this
        _this.dialogTitle = "修改体检信息"
        _this.dialogFormVisible = true
        request.get("/exam/show", {
              params: {
                orderId: row.orderId
              }
            }
        ).then(res => {
          this.form = res
        })

      },
      //存入体检数据
      save() {
        request.post("/exam/savePE", this.formInput).then(res => {
          if (res) {
            this.$message.success("保存成功")
            this.dialogFormVisibleInput = false
            this.load()
          } else {
            this.$message.error("保存失败")
          }

        })


      },
      //录入体检信息
      savePE(row) {
        if(row.orderState==="已录入")
        {
          this.$message.error("体检数据已录入")
          this.dialogFormVisibleInput=false;
        }
        else
        {
          this.dialogFormVisibleInput = true

          this.formInput = {}
          this.formInput.orderId = row.orderId
          this.formInput.peName = row.orderName

          let orderIdCard=row.orderIdCard
          let gender=null
          let age=0
          let myDate = new Date()
          let month = myDate.getMonth() + 1
          let day = myDate.getDate()

          age = myDate.getFullYear() - orderIdCard.substring(6, 10) - 1

          if (orderIdCard.substring(10, 12) < month || orderIdCard.substring(10, 12) == month && orderIdCard.substring(12, 14) <= day) age++
          gender = orderIdCard.substring(16,17);
          if(gender % 2 === 0)
            gender = '女';
          else if(gender%2===1)
            gender = '男';

          this.formInput.peGender=gender
          this.formInput.peAge=age




        }

      },
      cancel(){
        this.dialogFormVisibleInput = false

      },
      handleSelectionChange(val){
        console.log(val)
        this.multipleSelection=val
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
      selectPE(row){
        const _this=this
        _this.dialogTitle="查看体检信息"
        _this.dialogFormVisible=true
        request.get("/exam/show",{
          params:{
            orderId:row.orderId
          }
            }
        ).then(res=>{
          this.form=res
        })
      },

      load(){
        request.get("/order/page",{
          params:{
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            orderId: this.orderId,
            orderName:this.orderName,
            orderIdCard: this.orderIdCard,
            orderState: this.orderState
          }
        }).then(res=>{
          console.log(res)
          this.tableData=res.data
          this.total=res.total
        })
      }


    }
  }
</script>

<style >
.headerBg{
  background-color: #eee !important;
}
</style>