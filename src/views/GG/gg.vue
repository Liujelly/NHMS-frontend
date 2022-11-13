<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入申请人姓名" suffix-icon="el-icon-search" v-model="aname"></el-input>

      <el-button class="ml-5" type="primary" @click="load" >搜索</el-button>
      <el-button   type="warning"  @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      <el-button type="danger">批量删除<i class="el-icon-remove-outline"></i></el-button>
    </div>

    <el-table :data="tableData" border stripe  :header-cell-class-name="headerBg">

      <el-table-column prop="aname" label="姓名" width="100"></el-table-column>
      <el-table-column prop="aage" label="年龄" width="50"></el-table-column>
      <el-table-column prop="asex" label="性别" width="50"></el-table-column>
      <el-table-column prop="aphone" label="电话号码" width="200"></el-table-column>
      <el-table-column prop="aemail" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="aaddress" label="地址" width="300"></el-table-column>
      <el-table-column prop="anumber" label="人数" width="50"></el-table-column>
      <el-table-column prop="applytime" label="申请时间" width="250"></el-table-column>
      <el-table-column prop="acometime" label="来访时间" width="250"></el-table-column>
      <el-table-column prop="aactive" label="活动" width="200"></el-table-column>
      <el-table-column prop="aactiveTime" label="活动时长" width="50"></el-table-column>
      <el-table-column prop="aheath" label="健康状况" width="100"></el-table-column>
      <el-table-column prop="astate" label="状态" width="100"></el-table-column>
      <el-table-column  prop="astate" label="审核" width="100">
        <template slot-scope="scope">

          <el-button type="success" @click="handleEdit1(scope.row)">审核</el-button>
        </template>


      </el-table-column>




      <el-table-column label="操作" width="240">
        <template slot-scope="scope">

          <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>

          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除这条数据？"
              @confirm="del(scope.row.aid)">
            <el-button type="danger" slot="reference">删除<i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
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
    <el-dialog title="申请信息" :visible.sync="dialogFormVisible1" width="30%" >
      <el-form label-width="80px" size="small">
        <el-form-item label="审核" >
          <el-radio-group v-model="form.astate">
            <el-radio label="通过"></el-radio>
            <el-radio label="不通过"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="save1">确 定
        </el-button>

      </div>
    </el-dialog>


    <el-dialog title="申请信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="80px" size="small">

        <el-form-item label="申请人" >
          <el-input
              v-model="form.aname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" >

          <el-input

            v-model="form.aage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" >

          <el-radio-group v-model="form.asex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>


        </el-form-item>
        <el-form-item label="电话号码" >

          <el-input
              placeholder=“手机号”  v-model="form.aphone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input
              v-model="form.aemail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请时间" >
          <el-input
              v-model="form.applytime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="来访时间" >
          <el-input
              v-model="form.acometime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" >
          <el-input
              v-model="form.aaddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="人数" >
          <el-input
              v-model="form.anumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动" >
          <el-input
              v-model="form.aactive" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时长" >
          <el-input
              v-model="form.aactiveTime" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="健康状况" >
          <el-input
              v-model="form.aheath" autocomplete="off"></el-input>
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

  name: "applyInformation",
  data() {
    return{
      tableData: [],
      total:0,
      pageNum: 1,
      pageSize:2,
      aname:"",
      form:{},
      dialogFormVisible:false,
      dialogFormVisible1:false,
      collapseBtnClass:'el-icon-s-fold',
      isCollapse: false,
      sideWidth:200,
      LogoTextShow:true,
      headerBg:'headerBg',
      astate:"",


    }
  },
  created() {
    //请求分页查询
    this.load()
  },


  methods: {
    load() {
      request.get("http://localhost:8081/apply/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          aname: this.aname,
        }

      }).then(res => {
        console.log(res);

        this.tableData = res.data
        this.total = res.total

      })
    },
    save() {
      console.log(this.form)
      request.post("http://localhost:8081/apply", this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    save1() {
      console.log(this.form)
      request.post("http://localhost:8081/apply", this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")
          this.dialogFormVisible1 = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
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
    handleEdit1(row) {
      this.form = row
      this.dialogFormVisible1 = true
    },
    reset() {
      this.aname = ""
      this.load()
    },
    del(Aid) {
      request.delete("http://localhost:8081/apply/" + Aid).then(res => {
        if (res) {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },


    date(row) {
      this.dialogFormVisible = true
      this.form.applytime = row.value1

      let value1 = applytime
      return {
        applytime: ""
      }

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

