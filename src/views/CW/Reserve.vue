<template>
  <el-main>
    <div style="margin-top:-20px">
      <p style="font-size:20px;font-weight: bold;">预备金管理</p>
    </div>
    <div class="function" style="margin-bottom: 30px;">
      <el-button type="primary" @click="addreserve">增加<i class="el-icon-circle-plus-outline"></i></el-button>
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
      <el-table-column prop="jname" label="交费人姓名"></el-table-column>
      <el-table-column prop="reserveprice" label="预备金"></el-table-column>
      <el-table-column prop="tel" label="电话"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column label="操作"  width="200" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="edit(scope.row)">修改<i class="el-icon-edit"></i></el-button>
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
    <el-dialog title="批准单" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="120px">
        <el-form-item label="姓名" >
          <el-input v-model="form.name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="交费人" >
          <el-input v-model="form.jname" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="预备金" >
          <el-input v-model="form.reserveprice" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" >
          <el-input v-model="form.tel" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="日期" >
          <el-input v-model="form.date" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">批准</el-button>
      </div>
    </el-dialog>


  </el-main>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Reserve",
  data() {
    return {
      name:"",
      sex:"",
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
    del(id){
      request.delete("/reserve/"+id).then(res=>{
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
      this.form = row
      this.dialogFormVisible = true
    },
    save(){
      request.post("/reserve",this.form).then(res=>{
        this.$message.success("保存成功")
        this.dialogFormVisible=false
        this.load()
      })
    },
    reset() {
      this.name = ""
      this.sex = ""
      this.load()
    },
    load()
    {
      request.get("/pagereserve",{
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
    addreserve()
    {
      this.form={}
      this.dialogFormVisible=true
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

<style scoped>

</style>
