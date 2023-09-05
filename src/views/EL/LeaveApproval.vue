<template>
  <div>
    <el-main>
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">请假批准</p>
        </div>
      <div class="function" style="margin-bottom: 30px;">
        <el-button type="primary" @click="addleave">请假信息添加<i class="el-icon-circle-plus-outline"></i></el-button>
        <el-input
            style="margin-left:15px"
            class="Search"
            size="medium"
            placeholder="请输入名称"
            v-model="name">
        </el-input>
        <el-button  style="margin-left:10px" @click="reset">重置</el-button>
        <el-button type="primary" @click="load">搜索</el-button>
      </div>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="ltime" label="请假日期"></el-table-column>
        <el-table-column prop="duration" label="时长"></el-table-column>
        <el-table-column label="操作"  width="200" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="edit(scope.row)">批准<i class="el-icon-edit"></i></el-button>
            <el-button size="small" type="danger" @click="del(scope.row.id)">驳回<i class="el-icon-remove-outline"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding: 10px 0">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[2, 5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
      <el-dialog title="请选择老人ID" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-width="120px">

          <el-form-item label="ID" >
          <el-select v-model="form.id" placeholder="请选择老人ID" @focus="getChoiceList">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.id"
                :value="item.id"
            >
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="请假时间" >
            <el-input v-model="form.ltime" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="请假时长" >
            <el-input v-model="form.duration" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="批准单" :visible.sync="dialogFormVisible1">
        <el-form :model="form1" label-width="120px">
          <el-form-item label="ID" >
            <el-input v-model="form1.id" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名" >
            <el-input v-model="form1.name" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="电话" >
            <el-input v-model="form1.tel" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="请假日期" >
            <el-input v-model="form1.ltime" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="时长" >
            <el-input v-model="form1.duration" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取消</el-button>
          <el-button type="primary" @click="save1">确定</el-button>
        </div>
      </el-dialog>

    </el-main>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Leave",
  data()
  {
    return {
      name:'',
      input3: '',
      select: '',
      form:{},
      form1:{},
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:10,
      msg: "hello 青哥哥",
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: 'headerBg',
      dialogFormVisible:false,
      dialogFormVisible1:false,
      options: [],
      value:"",
      nowDate: "", // 当前日期
    }
  },
  mounted() {
    this.currentTime();
  },
  created() {
    this.load()
  },
  methods: {
    del(id){
      request.delete("/leave/"+id).then(res=>{
        if(res){
          this.$message.success("保存成功")
          this.dialogFormVisible=false
          this.load()
        }
        else{
          this.$message.error("保存失败")
        }
      })
    },
    edit(row)
    {
      this.form1 = row
      this.dialogFormVisible1 = true
    },
    save1()
    {
      request.post("/leaveapproval",this.form1).then(res=>{
        this.$message.success("保存成功")
        this.dialogFormVisible1=false
        this.load()
      })
    },

    save()
    {
      request.post("/leaveadd",this.form).then(res=>{
        this.$message.success("保存成功")
        this.dialogFormVisible=false
        this.load()
      })
    },
    addleave()
    {
      this.form={}
      var tradeDate = new Date();
      var yyyyMMdd = tradeDate.getFullYear() + "-"
          + (tradeDate.getMonth() + 1) + "-" + tradeDate.getDate();
      this.form.ltime=yyyyMMdd
      this.dialogFormVisible=true
    },
    getChoiceList(){
      this.getid()
    },
    getid()
    {
      request.get("/leaveid").then(res=>{
        console.log(res)
        this.options=res.data
      })
    },
    reset() {
      this.name = ""
      this.load()
    },
    load()
    {
      request.get("/pagel",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          name:this.name,
        }
      }).then(res=>{
            console.log(res)
            this.tableData=res.data
            this.total=res.total
          }
      )
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
    }
  }

}
</script>
<style>
.function{
  margin-top:20px;
  padding: 20px;
  background-color: white;
  border-radius: 7px;
}
.Search{
  width: 200px;
}
</style>
<style>
.headerBg {
  background: #eee!important;
}
</style>

