<template>
  <el-card class="box-card">
    部门管理
    <hr>
    <br>
    <el-row style="display: flex;justify-content: flex-start;">
      <!--搜索框-->
      <span style="">
        <el-input v-model="keyword" style="width: 200px" placeholder="请输入职位名称" 
                  size="mini" ></el-input>
        <el-button type="success" @click="selectTable" icon="el-icon-search"
                   v-has="'dept:list'"
                   size="mini">搜索</el-button>
      </span>
      <!--新增按钮-->
      <span style="display: inline-block;margin-left: 30px">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
                   @click="addDialog" size="mini"
                   v-has="'dept:add'"
                   round>新增
        </el-button>
      </span>
    </el-row>


    <br>
    <br>
    <!--表格数据及操作-->
    <el-table :data="tableData" style="width: 100%" stripe ref="multipleTable"
              tooltip-effect="dark">
      <!--索引-->
      <el-table-column type="index" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="deptName" label="职位名称" sortable>
      </el-table-column>
      <el-table-column prop="deptDescribe" label="职位描述">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"
                     v-has="'dept:upd'"
                     @click="editThis(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"
                     v-has="'dept:del'"
                     @click="removeThis(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>

    <!--分页条-->
    <el-pagination
      style="padding-top:15px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog title="添加新职位" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="职位名">
          <el-input v-model="form.deptName" placeholder="请输入职位名"></el-input>
        </el-form-item>
        <el-form-item label="职位描述">
          <el-input v-model="form.deptDescribe" placeholder="请输入职位描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNew">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="修改职位信息" :visible.sync="editdialog">
      <el-form :model="form">
        <el-form-item label="职位名">
          <el-input v-model="form.deptName" placeholder="请输入职位名"></el-input>
        </el-form-item>
        <el-form-item label="职位描述">
          <el-input v-model="form.deptDescribe" placeholder="请输入职位描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialog = false">取 消</el-button>
        <el-button type="primary" @click="updThis">确 定</el-button>
      </div>
    </el-dialog>


  </el-card>
</template>

<script>
  export default {
    name: "dept",
    data() {
      return {
        tableData: [],   //表格数据
        keyword: '',   //查询输入框数据
        total: 0, // 总条数
        pageSize: 10,     // 每页显示的条数
        current: 1,  // 当前页码
        form: {
          deptName: '',
          deptDescribe: '',
          id: ""
        },
        dialogFormVisible: false,
        editdialog: false,
        trsData: [],
        trsValue: [],
        thisUserId: ""
      }
    },
    methods: {
      /**
       * 表格索引
       * @param index
       * @returns {*}
       */
      indexMethod(index) {
        return index;
      },
      /**
       * 监听数据表格每页条数变化并更新表格数据
       * @param val
       */
      handleSizeChange(val) {
        this.getTableDate(val, this.current, null);
      },
      /**
       * 监听页码变化并更新表格
       * @param val
       */
      handleCurrentChange(val) {
        this.getTableDate(this.limit, val, null);
      },
      /**
       * 关键字查询
       */
      selectTable() {
        this.getTableDate(this.limit, this.current, this.keyword);
      },
      /**
       * 获取表格数据
       * @param limit
       * @param page
       * @param keyword
       */
      getTableDate(limit, page, keyword) {
        this.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/dept/listAllDept',
          data: {
            limit: limit,
            page: page,
            deptName: keyword
          }
        }).then((response) => {
          this.tableData = response.data.data.records;
          this.total = response.data.data.total; //totalcount
          this.current = response.data.data.current; //页数
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 添加新部门
       */
      addNew() {
        this.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/dept/addDept',
          data: {
            deptName: this.form.deptName,
            deptDescribe: this.form.deptDescribe,
          }
        }).then((response) => {
          if (response.data.msg == "添加成功！") {
            this.$message.success(response.data.msg);
            this.clearValue()
            this.dialogFormVisible = false;
            this.getTableDate(this.pageSize, this.current);
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 删除当前职位
       * @param row
       */
      removeThis(row) {
        this.$axios({
          method: 'delete',
          url: 'http://localhost:8081/dept/delDept?id=' + row.id,
        }).then((response) => {
          if (response.data.msg == "删除成功！") {
            this.$message.success(response.data.msg);
            this.getTableDate(this.pageSize, this.current);
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 打开添加弹出层
       */
      addDialog() {
        this.clearValue()
        this.dialogFormVisible = true;
      },
      /**
       * 打开编辑弹出层
       * @param row
       */
      editThis(row) {
        this.clearValue()
        this.form.id = row.id;
        this.editdialog = true;
        this.form.deptName = row.deptName;
        this.form.deptDescribe = row.deptDescribe;
      },
      /**
       * 更新当前职位
       */
      updThis() {
        this.$axios({
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/dept/updDept',
          data: {
            id: this.form.id,
            deptName: this.form.deptName,
            deptDescribe: this.form.deptDescribe
          }
        }).then((response) => {
          if (response.data.msg == "更新成功！") {
            this.$message.success(response.data.msg);
            this.clearValue()
            this.editdialog = false;
            this.getTableDate(this.pageSize, this.current);
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 清空弹层值
       */
      clearValue() {
        Object.keys(this.form).forEach((key) => (this.form[key] = ''))
      },
    },
    created() {
      /**
       * 页面渲染调用一次获取表格
       */
      this.getTableDate(this.pageSize, this.current);
    }
  }
</script>

