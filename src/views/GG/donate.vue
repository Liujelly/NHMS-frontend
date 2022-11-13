<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="" suffix-icon="el-icon-search" v-model="dnmae"></el-input>

      <el-button class="ml-5" type="primary" @click="load" >搜索</el-button>
      <el-button   type="warning"  @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      <el-button type="danger">批量删除<i class="el-icon-remove-outline"></i></el-button>
    </div>

    <el-table :data="tableData" border stripe  :header-cell-class-name="headerBg">

      <el-table-column prop="dName" label="捐赠人" width="100"></el-table-column>
      <el-table-column prop="dSex" label="性别" width="50"></el-table-column>
      <el-table-column prop="dSource" label="籍贯" width="250"></el-table-column>
      <el-table-column prop="dAge" label="年龄" width="200"></el-table-column>
      <el-table-column prop="dPhone" label="电话号码" width="300"></el-table-column>
      <el-table-column prop="dGoodsname" label="物资名" width="250"></el-table-column>
      <el-table-column prop="dGoodsclass" label="物资类别" width="250"></el-table-column>
      <el-table-column prop="dGoodsnumber" label="数量" width="50"></el-table-column>
      <el-table-column prop="dTime" label="捐赠时间" width="250"></el-table-column>


      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
            <el-button type="danger"   @click="del(scope.row.dId)">删除<i class="el-icon-remove-outline"></i></el-button>

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

    <el-dialog title="捐赠信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="80px" size="small">
        <el-form-item label="捐赠人" >
          <el-input v-model="form.dName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-input v-model="form.dSex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" >
          <el-input  v-model="form.dAge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="籍贯" >
          <el-input v-model="form.dSource" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" >
          <el-input v-model="form.dPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="捐赠物资" >
          <el-input v-model="form.dGoodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物资类别" >
          <el-input v-model="form.dGoodsclass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物资数量" >
          <el-input v-model="form.dGoodsnumber" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="捐赠时间" >
            <el-input
                v-model="form.dTime" autocomplete="off"></el-input>
          </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import request from "@/utils/request";

export default {
  name: "donate",
  data() {
    return {
      tableData: [],
      total:0,
      pageNum: 1,
      pageSize:2,
      form:{},
      dialogFormVisible:false,
      collapseBtnClass:'el-icon-s-fold',
      isCollapse: false,
      sideWidth:200,
      LogoTextShow:true,
      headerBg:'headerBg'
    }
  },
  created() {
    //请求分页查询
    this.load()
  },
  methods: {
    load() {
      request.get("http://localhost:8081/pagedonate", {
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
      request.post("http://localhost:8081/add", this.form).then(res => {
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

    del(dId) {
      request.delete("http://localhost:8081/delete/" + dId).then(res => {
        if (res) {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
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


