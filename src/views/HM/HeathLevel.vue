<template>
  <el-main>
    <div style="margin-top: -20px">
      <p style="font-size: 20px;font-weight: bold">老人健康等级</p>
    </div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" v-model="orderId" suffix-icon="el-icon-search" placeholder="请输入编号" ></el-input>
      <el-input style="width: 200px; margin-left: 5px" v-model="orderName" suffix-icon="el-icon-user" placeholder="请输入姓名" class="ml-5" ></el-input>
      <el-button style="margin-left: 5px" class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button  type="warning" @click="reset">重置</el-button>
    </div>
    <el-table :data="tableData" >
      <el-table-column prop="orderId" label="老人编号" width="120"></el-table-column>
      <el-table-column prop="orderName" label="姓名" width="120"></el-table-column>
      <el-table-column prop="healthIndexNum"  label="老人健康指数" width="120"></el-table-column>
      <el-table-column prop="healthLevelNum"  label="老人健康等级" width="120"></el-table-column>
      <el-table-column prop="suggest"  label="健康详情" width="420"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success"  size="small" @click="add(scope.row)">进行分析 <i class="el-icon-edit"></i></el-button>
          <el-button type="primary"  size="small" @click="update(scope.row)">更正分析 <i class="el-icon-edit"></i></el-button>

        </template>
      </el-table-column>
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

    <el-dialog title="更正分析" :visible.sync="dialogFormVisible" width="40%">
      <el-form  label-width="130px" >
        <el-form-item label="老人编号" >
          <el-input v-model="form.orderId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分析结果" >
          <el-input v-model="form.suggest" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateStandard">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import request from "@/utils/request";

export default {
  name:"HealthLevel",
  data() {

    return {
      tableData: [],
      orderId: "",
      orderName: "",
      dialogFormVisible:false,
      form:[],
      suggest: "",
      total:0,
      pageNum:1,
      pageSize:10,


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
    updateStandard(){
      request.post("/healthLevel/update",this.form).then(res=>{
        if(res){
          this.$message.success("更正成功")
          this.dialogFormVisible=false
          this.load()
        }
        else {
          this.$message.error("更正失败")
        }
      })
    },
    cancel(){
      this.dialogFormVisible=false
    },

    add(row){
      let orderId=row.orderId;
      console.log(orderId)
      request.post("/healthLevel/add",row.orderId).then(res=>{
        console.log(row.orderId)
        if(res){
          this.$message.success("分析成功")
          this.load()

        }
        else
          this.$message.error("数据有误")

      })
    },
    update(row){
      this.form={};
      this.form=row;
      this.dialogFormVisible=true;

    },
    load(){
      request.get("/healthLevel/show",{
        params:{
          orderId: this.orderId,
          orderName:this.orderName,
          healthIndexNum:this.healthIndexNum,
          healthLevelNum:this.healthLevelNum,
          suggest:this.suggest,
          pageNum:this.pageNum,
          pageSize:this.pageSize

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