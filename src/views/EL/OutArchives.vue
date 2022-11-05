<template>
  <div>
    <el-main>
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">退住档案</p>
        </div>
      <div class="function" style="margin-bottom: 30px;">
        <el-input
            style="margin-left:15px"
            class="Search"
            size="medium"
            placeholder="请输入名称"
            v-model="name">
        </el-input>
        <el-input
            style="margin-left:10px"
            class="Search"
            size="medium"
            placeholder="请输入性别"
            v-model="sex">
        </el-input>
        <el-button  style="margin-left:10px" @click="reset">重置</el-button>
        <el-button type="primary" @click="load">搜索</el-button>
      </div>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="idcard" label="身份证号"></el-table-column>
        <el-table-column prop="outtime" label="退住时间"></el-table-column>
        <el-table-column label="操作"  width="200" align="center">
          <template slot-scope="scope">
            <el-button type="success" @click="edit(scope.row)">回溯<i class="el-icon-edit"></i></el-button>
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

      <el-dialog title="批准单" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-width="120px">
          <el-form-item label="姓名" >
            <el-input v-model="form.name" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="年龄" >
            <el-input v-model="form.age" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别" >
            <el-input v-model="form.sex" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" >
            <el-input v-model="form.tel" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="地址" >
            <el-input v-model="form.address" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" >
            <el-input v-model="form.idcard" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="民族" >
            <el-input v-model="form.nation" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="学历" >
            <el-input v-model="form.education" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="大楼id" >
            <el-input v-model="form.buildingid" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="宿舍id" >
            <el-input v-model="form.dormitoryid" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="状态" >
            <el-input v-model="form.state" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="出院时间" >
            <el-input v-model="form.outtime" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </el-dialog>

    </el-main>
  </div>

</template>

<script>
import request from "@/utils/request";

export default {
  name: "OutArchives",
  data() {
    return {
      name:'',
      sex:'',
      input3: '',
      select: '',
      form:{},
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
      dialogFormVisible:false
    }
  },
  created() {
    this.load()
  },
  methods: {
    edit(row)
    {
      this.form = row
      this.dialogFormVisible = true
    },
    save(){
      request.post("http://localhost:8081/outarchive",this.form).then(res=>{
          this.$message.success("保存成功")
          this.dialogFormVisible=false
          this.load()
      })
    },
    reset() {
      this.name =""
      this.sex=""
      this.load()
    },
    load()
    {
      request.get("http://localhost:8081/pageo",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          name:this.name,
          sex:this.sex
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