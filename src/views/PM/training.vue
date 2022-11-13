<template>
  <el-card class="box-card">
    培训管理
    <hr>
    <br>
    <el-row style="display: flex;justify-content: flex-start;">
      <!--搜索框-->
      <span style="">
        <el-input v-model="keyword" style="width: 200px" placeholder="请输入培训名"
                  size="mini"></el-input>
        <el-button type="success" @click="selectTable" icon="el-icon-search"
                   size="mini" v-has="'training:list'">搜索</el-button>
      </span>
      <!--新增按钮-->
      <span style="display: inline-block;margin-left: 30px">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
                   @click="addDialog" size="mini"
                   v-has="'training:add'"
                   round>新增
        </el-button>
      </span>
    </el-row>


    <br>
    <br>
    <!--表格数据及操作-->
    <el-table :data="tableData" border style="width: 100%" stripe ref="multipleTable"
              tooltip-effect="dark">
      <!--索引-->
      <el-table-column type="index" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="ename" label="受训人" sortable>
      </el-table-column>
      <el-table-column prop="trainingContent" label="培训内容" sortable>
      </el-table-column>
      <el-table-column prop="time" label="培训时间" :formatter="dateForma">
      </el-table-column>
      <el-table-column prop="type" label="培训类型">
      </el-table-column>
      <el-table-column prop="price" label="培训价格">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary"
                     v-has="'training:upd'"
                     icon="el-icon-edit" size="mini" @click="editThis(scope.row)">
            编辑
          </el-button>
          <el-button type="danger"
                     v-has="'training:del'"
                     icon="el-icon-delete" size="mini" @click="removeThis(scope.row)">
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

    <el-dialog title="添加培训" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="受训人">
          <span style="">
        <el-input v-model="ename" style="width: 200px" placeholder="请输入受训人姓名"
                  size="mini"></el-input>
        <el-button type="success" @click="getAllEmployee" icon="el-icon-search"
                   size="mini">搜索</el-button>
             <el-select v-model="form.eid" placeholder="请选择" v-if="selectList">
              <el-option
                v-for="item in selectEmployeeList"
                :key="item.id"
                :label="item.employeeName"
                :value="item.id">
              </el-option>
            </el-select>
         </span>
        </el-form-item>
        <el-form-item label="培训内容">
          <el-input v-model="form.trainingContent" placeholder="请输入培训内容"></el-input>
        </el-form-item>
        <el-form-item label="培训类型">
          <el-input v-model="form.type" placeholder="请输入培训类型"></el-input>
        </el-form-item>
        <el-form-item label="培训价格">
          <el-input v-model="form.price" placeholder="请输入培训价格"></el-input>
        </el-form-item>
        <el-form-item label="培训时间">
          <el-date-picker
            v-model="form.time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNew">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="修改培训信息" :visible.sync="editdialog">
      <el-form :model="form">
        <el-form-item label="受训人">
          <el-input v-model="form.ename" disabled></el-input>
        </el-form-item>
        <el-form-item label="培训内容">
          <el-input v-model="form.trainingContent" placeholder="请输入培训内容"></el-input>
        </el-form-item>
        <el-form-item label="培训类型">
          <el-input v-model="form.type" placeholder="请输入培训类型"></el-input>
        </el-form-item>
        <el-form-item label="培训价格">
          <el-input v-model="form.price" placeholder="请输入培训价格"></el-input>
        </el-form-item>
        <el-form-item label="培训时间">
          <el-date-picker
            v-model="form.time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
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
  import moment from 'moment'

  export default {
    name: "dept",
    data() {
      return {
        tableData: [],   //表格数据
        keyword: '',   //查询输入框数据
        total: 0, // 总条数
        pageSize: 10,     // 每页显示的条数
        current: 1,  // 当前页码
        ename: "",
        form: {
          eid: "",
          ename: "",
          trainingContent: '',
          time: '',
          type: "",
          price: ""
        },
        dialogFormVisible: false,
        editdialog: false,
        selectList: false,
        thisUserId: "",
        selectEmployeeList: []
      }
    },
    methods: {
      /**
       * 日期格式化
       * @param row
       * @param column
       * @returns {string}
       */
      dateForma(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return ''
        }
        return moment(date).format("YYYY-MM-DD")
      },
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
          url: 'http://localhost:8081/training/listAllTraining',
          data: {
            limit: limit,
            page: page,
            trainingContent: keyword
          }
        }).then((response) => {
          if (response.data.msg != "SUCCESS") {
            this.$message.error(response.data.msg);
          }
          this.tableData = response.data.data.records;
          this.total = response.data.data.total; //totalcount
          this.current = response.data.data.current; //页数
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 添加新培训
       */
      addNew() {
        this.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/training/addTraining',
          data: {
            trainingContent: this.form.trainingContent,
            time: this.form.time,
            type: this.form.type,
            price: this.form.price,
            eid: this.form.eid,
            createBy: localStorage.getItem("uId")
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
       * 删除当前培训
       * @param row
       */
      removeThis(row) {
        this.$axios({
          method: 'delete',
          url: 'http://localhost:8081/training/delTraining?id=' + row.id,
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
        this.ename = "";
        this.selectEmployeeList = "";
        this.clearValue()
        this.dialogFormVisible = true;
        this.selectList = false;
      },
      /**
       * 打开编辑弹出层
       * @param row
       */
      editThis(row) {
        this.clearValue()
        this.form.id = row.id;
        this.editdialog = true;
        this.form.eid = row.eid;
        this.form.ename = row.ename;
        this.form.trainingContent = row.trainingContent;
        this.form.time = row.time;
        this.form.type = row.type;
        this.form.price = row.price;
      },
      /**
       * 更新当前培训
       */
      updThis() {
        this.$axios({
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/training/updTraining',
          data: {
            id: this.form.id,
            eid: this.form.eid,
            trainingContent: this.form.trainingContent,
            time: this.form.time,
            type: this.form.type,
            price: this.form.price,
            updateBy: localStorage.getItem("uId")
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
      getAllEmployee() {
        this.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/employee/listAllEmployee',
          data: {
            limit: 20,
            page: 1,
            employeeName: this.ename
          }
        }).then((response) => {
          this.selectList = true;
          this.selectEmployeeList = response.data.data.records;
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    created() {
      /**
       * 页面渲染调用一次获取表格
       */
      this.getTableDate(this.pageSize, this.current);
    }
  }
</script>

