<template>
  <div>
    <div class=" right-bar" style="width: 1500px; height: 500px" >
      <div>

        <div style="margin: 10px 0">
          <el-button type="primary" style="margin-left:10px" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
          <el-input style="width: 200px; margin-left: 20px" placeholder="" suffix-icon="el-icon-search" v-model="pname"></el-input>
          <el-button style="margin-left:10px" class="ml-5" type="primary" @click="load" >搜索</el-button>
          <el-button  style="margin-left:10px" type="warning"  @click="reset">重置</el-button>

          </div>
         <div>
           <el-table :data="tableData" border stripe  :header-cell-class-name="headerBg">


             <el-table-column prop="pName" label="接待人" width="100"></el-table-column>
             <el-table-column prop="pTime" label="巡查时间" width="300"></el-table-column>
             <el-table-column prop="pPerson" label="巡查人" width="300"></el-table-column>
             <el-table-column prop="pContent" label="巡查对象" width="250"></el-table-column>
             <el-table-column prop="pUnit" label="巡查单位" width="250"></el-table-column>
             <el-table-column prop="pSide" label="涉及方面" width="200"></el-table-column>
             <el-table-column label="操作" width="300">
               <template slot-scope="scope">
                 <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
                 <el-button type="danger"   @click="del(scope.row.pId)">删除<i class="el-icon-remove-outline"></i></el-button>

               </template>
             </el-table-column>
           </el-table>
           <div style="padding: 10px 0">
             <el-pagination
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="pageNum"
                 :page-sizes="[2, 5, 10, 20]"
                 :page-size="pageSize"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total">
             </el-pagination>
           </div>
           <el-dialog title="巡查信息" :visible.sync="dialogFormVisible" width="30%" >
             <el-form label-width="80px" size="small">
               <el-form-item label="接待人" >
                 <el-input v-model="form.pName" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="巡查时间" >
                 <el-input v-model="form.pTime" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="巡查人" >
                 <el-input v-model="form.pPerson" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="巡查对象" >
                 <el-input v-model="form.pContent" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="巡查单位" >
                 <el-input v-model="form.pUnit" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="涉及方面" >
                 <el-input  v-model="form.pSide" autocomplete="off"></el-input>
               </el-form-item>
             </el-form>
             <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="save">确 定</el-button>
             </div>
           </el-dialog>


         </div>

      </div>
          <div class="function left-bar" style="width: 500px; height: 500px" >

      <div style="margin: 20px 0;width: 500px">
      <el-input
          class="Search"
          type="textarea"
          placeholder="请输入内容"
          maxlength="200"
          show-word-limit
          style="width: 500px"
      >
      </el-input>
    </div>
      <el-button type="primary" style="margin-left:10px" >发布</el-button>
      <el-button  style="margin-left:10px" type="warning"  @click="reset">重置</el-button>
    </div>


    </div>
    </div >


</template>

<script>
import request from "@/utils/request";
export default {
  name: "patrol",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 2,
      form: {},
      dialogFormVisible: false,
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      LogoTextShow: true,
      headerBg: 'headerBg',
      pname:"",
    }
  },
  created() {
    //请求分页查询
    this.load()
  },
  methods: {
    load() {
      request.get("/pagepatrol", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }

      }).then(res => {
        console.log(res);
        this.tableData = res.data
        this.total = res.total

      })
    },
    save() {
      console.log(this.form)
      request.post("/addpatrol", this.form).then(res => {
        this.$message.success("保存成功")
        this.dialogFormVisible = false
        this.load()
      })
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(row) {
      this.form = row
      this.dialogFormVisible = true
    },

    del(pId) {
      request.delete("/deletepatrol/" + pId).then(res => {
        if (res) {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    reset() {
      this.pname = ""
      this.load()
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
  }
}

</script>
data() {
return {
text: '',
textarea: ''
}
}
<style>
.function{
  margin-top:20px;
  padding: 20px;
  background-color: white;
  border-radius: 7px;
}

.Search{
  width: 580px;
}






</style>