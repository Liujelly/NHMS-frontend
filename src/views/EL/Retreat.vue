<template>
  <div>
    <el-main>
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">退院信息管理</p>
        </div>
      <div class="function" style="margin-bottom: 30px;">
        <el-button type="primary" @click="addretreat">添加退院信息<i class="el-icon-circle-plus-outline"></i></el-button>
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
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="buildingid" label="大楼ID"></el-table-column>
        <el-table-column prop="dormitoryid" label="宿舍ID"></el-table-column>
        <el-table-column label="操作"  width="200" align="center">
          <template slot-scope="scope">
            
            <el-button size="small" type="danger" @click="del(scope.row.id)">删 除 <i class="el-icon-remove-outline"></i></el-button>
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
          <el-input v-model="form.id" autocomplete="off" type="hidden"></el-input>
          <el-select v-model="value" placeholder="请选择老人ID" @focus="getChoiceList">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.id"
                :value="item.id"
            >
            </el-option>
          </el-select>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="收货地址" :visible.sync="dialogFormVisible1">
        <el-form :model="form1" label-width="120px">
          <el-form-item label="姓名" >
            <el-input v-model="form1.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" >
            <el-input v-model="form1.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" >
            <el-input v-model="form1.sex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="大楼ID" >
            <el-input v-model="form1.buildingid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="宿舍ID" >
            <el-input v-model="form1.dormitoryid" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="save1">确 定</el-button>
        </div>
      </el-dialog>

    </el-main>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Retreat",
  data() {
    return {
      name:'',
      sex:'',
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
      value: "",
    }
  },
  created() {
    this.load()
  },
  methods: {
    del(id){
      request.delete("/retreat/"+id).then(res=>{
        if(res){
          this.$message.success("保存成功")
          this.dialogFormVisible1=false
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
      request.post("/retreatedit",this.form1).then(res=>{
        if(res){
          this.$message.success("保存成功")
          this.dialogFormVisible1=false
          this.load()
        }
        else{
          this.$message.error("保存失败")
        }
      })
    },
    save()
    {
      request.post("/retreatadd",this.value).then(res=>{
        this.$message.success("保存成功")
        this.dialogFormVisible=false
        this.load()
      })
    },
    addretreat()
    {
      this.form={}
      this.dialogFormVisible=true
    },
    getChoiceList(){
      this.getid()
    },
    getid()
    {
      request.get("/retreatid").then(res=>{
        console.log(res)
        this.options=res.data
      })
    },
    reset() {
      this.name = ""
      this.sex=""
      this.load()
    },
    load()
    {
      request.get("/page4",{
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
.headerBg {
  background: #eee!important;
}

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
