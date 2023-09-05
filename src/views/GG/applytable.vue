<template>

    <div>
      <div id="ApplyHeader">
        <h1>申请表</h1>
      </div>
      <div id="ApplyComponent">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="申请人" >
          <el-input
              v-model="form.aname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" >
          <el-input
              v-model="form.aage" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-radio-group v-model="form.asex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
          <el-form-item label="电话" >
            <el-input v-model="form.aphone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" >
            <el-input v-model="form.aemail" autocomplete="off"></el-input>
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
              v-model="form.aheath" autocomplete="off">
          </el-input>
        </el-form-item>

      </el-form>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
        <div slot="footer" class="dialog-footer">

      <el-form-item title="申请信息" :visible.sync="dialogFormVisible" width="30%" >
      </el-form-item>
    </div>
    </div>
</template>
<script>
import request from "@/utils/request";

export default {
  name: "applytable",
  data() {

    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 2,
      aname: "",
      form: {},
      dialogFormVisible: false,
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      LogoTextShow: true,
      headerBg: 'headerBg',
    }
  },
  methods: {
    load() {
      request.get("/applytable/page", {
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
      request.post("/applytable", this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
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
    reset() {
      this.aname = ""
      this.load()
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


    filter: {
      handler() {
        const realList = this.copyList.filter(order => {
          return Object.keys(this.filter).reduce((flag, item) => {
            if (!flag) {
              return false
            } else {
              return this.filter[item].trim() ? String(order[item]).indexOf(this.filter[item]) !== -1 : true
            }
          }, true)
        })
        this.tableData = realList
      },
      deep: true
    },
  }
}

</script>

<style>
#ApplyHeader {
  text-align: center;
}
#ApplyComponent {
  margin-left: 26%;
  margin-right: 30%;
}


</style>