<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="" suffix-icon="el-icon-search" v-model="vname"></el-input>

      <el-button class="ml-5" type="primary" @click="load" >搜索</el-button>
      <el-button   type="warning"  @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      <el-button type="danger">批量删除<i class="el-icon-remove-outline"></i></el-button>
    </div>

    <el-table :data="tableData" border stripe  :header-cell-class-name="headerBg">

      <el-table-column prop="vId" label="探望编号" width="200"></el-table-column>
      <el-table-column prop="vName" label="探望人" width="100"></el-table-column>
      <el-table-column prop="vSex" label="性别" width="50"></el-table-column>
      <el-table-column prop="vPhone" label="电话号码" width="300"></el-table-column>
      <el-table-column prop="vNumber" label="探望人数" width="250"></el-table-column>
      <el-table-column prop="oldname" label="探望对象" width="250"></el-table-column>
      <el-table-column prop="oldid" label="老人编号" width="50"></el-table-column>
      <el-table-column prop="vTime" label="申请时间" width="250"></el-table-column>
      <el-table-column prop="vCometime" label="探望时间" width="250"></el-table-column>
      <el-table-column prop="vRelation" label="探望关系" width="250"></el-table-column>
      <el-table-column prop="vDinner" label="是否用餐" width="250"></el-table-column>
      <el-table-column prop="vBestow" label="是否留宿" width="250"></el-table-column>
      <el-table-column prop="vHeath" label="健康状况" width="250"></el-table-column>
      <el-table-column prop="vDuration" label="探望时长" width="250"></el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
          <el-button type="danger"   @click="del(scope.row.vId)">删除<i class="el-icon-remove-outline"></i></el-button>

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

    <el-dialog title="探望信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="80px" size="small">
        <el-form-item label="探望人" >
          <el-input v-model="form.vName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-input v-model="form.vSex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" >
          <el-input v-model="form.vPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="探望人数" >
          <el-input v-model="form.vNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="探望对象" >
          <el-input v-model="form.oldname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="老人编号" >
          <el-input  v-model="form.oldid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请时间" >
          <el-input v-model="form.vTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="探望时间" >
          <el-input v-model="form.vCometime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否用餐" >
          <el-input v-model="form.vDinner" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否留宿" >
          <el-input v-model="form.vBestow" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康状况" >
          <el-input v-model="form.vHeath" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="探望时长" >
          <el-input v-model="form.vDuration" autocomplete="off"></el-input>
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
      request.get("http://localhost:8081/pagevisit", {
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
      request.post("http://localhost:8081/addvisit", this.form).then(res => {
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
      request.delete("http://localhost:8081/deletevisit/" + vId).then(res => {
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


