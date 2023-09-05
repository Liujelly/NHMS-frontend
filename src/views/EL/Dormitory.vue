<template>
  <div>
    <el-main>
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">宿舍分配</p>
        </div>
      <div class="function" style="margin-bottom: 30px;">
        <el-input
            style="margin-left:15px"
            class="Search"
            size="medium"
            placeholder="请输入床位状态"
            v-model="state">
        </el-input>
        <el-button  style="margin-left:10px" @click="reset">重置</el-button>
        <el-button type="primary" @click="load">搜索</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="buildingId" label="楼宇ID" width="200"></el-table-column>
        <el-table-column prop="dormName" label="宿舍ID" width="200"></el-table-column>
        <el-table-column prop="dormType" label="宿舍类型" width="200"></el-table-column>
        <el-table-column prop="bedStatus" label="床位状态" width="200"
                         :filters="[{ text: '未满员', value: '未满员' }, { text: '已满员', value: '已满员' }]"
                         :filter-method="filterTag"
                         filter-placement="bottom-end">>
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.bedStatus === '未满员' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.bedStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="bedAvailable" label="剩余床位" width="200"></el-table-column>
        <el-table-column label="操作"  width="200" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="edit(scope.row)" :style="{ display: visibleLine }">分配<i class="el-icon-edit"></i></el-button>
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
          <el-form-item label="大楼ID" >
            <el-input v-model="form.buildingId" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="宿舍ID" >
            <el-input v-model="form.dormName" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="宿舍类型" >
            <el-input v-model="form.dormType" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="宿舍状态" >
            <el-input v-model="form.bedStatus" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="剩余床位" >
            <el-input v-model="form.bedAvailable" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="宿舍内老人ID" >
            <el-input v-model="form.elderlyIds" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="老人ID" >
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

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Dormitory",
  data() {
    return {
      state:"",
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
      dialogFormVisible:false,
      visibleLine:'',
      options: [],
      value: "",
    }
  },
  created() {
    this.load()
  },
  methods: {
    filterTag(value, row) {
      return row.bedStatus === value;
    },
    save()
    {
      request.post("/dormitory",this.form).then(res=>{
          this.$message.success("保存成功")
          this.dialogFormVisible=false
          this.load()
      })
    },
    edit(row)
    {
      this.form = row;
      if (row.bedStatus!="已满员")
      {
      this.dialogFormVisible = true;
      }
      else {
        this.dialogFormVisible = false;
      }

    },
    getChoiceList(){
      this.getid()
    },
    getid()
    {
      request.get("/id").then(res=>{
        console.log(res)
        this.options=res.data
      })
    },
    reset() {
      this.state = ""
      this.load()
    },
    load()
    {
      request.get("/page3",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          state:this.state
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
