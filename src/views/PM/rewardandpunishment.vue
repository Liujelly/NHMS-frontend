<template>
  <el-card class="box-card">
    <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">奖惩管理</p>
        </div>
    <el-row style="display: flex;justify-content: flex-start;">
      <!--搜索框-->
      <span style="">
        <el-input v-model="keyword" style="width: 200px; height: 20px;" placeholder="请输入员工姓名"></el-input>
                  <span style="margin-left: 10px; height: 20px;">
            <el-button type="success" @click="selectTable" icon="el-icon-search">查询</el-button>
        </span>
      </span>
      <!--新增按钮-->
      <span style="display: inline-block;margin-left: 20px; height: 20px;">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDialog" round>新增</el-button>
      </span>
    </el-row>
    <br>
    <!--表格数据及操作-->
    <el-table :data="tableData" style="width: 100%" stripe ref="multipleTable"
              tooltip-effect="dark">
      <!--索引-->
      <el-table-column type="index" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="ename" label="被奖惩人" sortable>
      </el-table-column>
      <el-table-column prop="reason" label="奖惩原因" sortable>
      </el-table-column>
      <el-table-column prop="time" label="奖惩时间" :formatter="dateForma">
      </el-table-column>
      <el-table-column prop="type" label="奖惩类型">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.type == 0">奖</el-tag>
          <el-tag v-if="scope.row.type == 1">惩</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary"
                     v-has="'rp:upd'"
                     icon="el-icon-edit" size="mini" @click="editThis(scope.row)">
            编辑
          </el-button>
          <el-button type="danger"
                     v-has="'rp:del'"
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

    <el-dialog title="添加奖惩" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="被奖惩人">
          <span style="">
        <el-input v-model="ename" style="width: 200px" placeholder="请输入被奖惩人"
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
        <el-form-item label="奖惩原因">
          <el-input v-model="form.reason" placeholder="请输入奖惩原因"></el-input>
        </el-form-item>
        <el-form-item label="奖惩类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              :key="0"
              label="奖励"
              :value="0">
            </el-option>
            <el-option
              :key="1"
              label="惩罚"
              :value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖惩时间">
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


    <el-dialog title="修改奖惩信息" :visible.sync="editdialog">
      <el-form :model="form">
        <el-form-item label="受训人">
          <el-input v-model="form.ename" disabled></el-input>
        </el-form-item>
        <el-form-item label="奖惩原因">
          <el-input v-model="form.reason" placeholder="请输入奖惩原因"></el-input>
        </el-form-item>
        <el-form-item label="奖惩类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              label="奖励"
              :value="'0'">
            </el-option>
            <el-option
              label="惩罚"
              :value="'1'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖惩时间">
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
    name: "rewardandpunishment",
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
          reason: '',
          time: '',
          type: "",
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
          url: 'http://localhost:8081/rewards-and-punishments/listAllRewardsAndPunishments',
          data: {
            limit: limit,
            page: page,
            ename: keyword
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
       * 添加新奖惩
       */
      addNew() {
        this.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/rewards-and-punishments/addRewardsAndPunishments',
          data: {
            reason: this.form.reason,
            time: this.form.time,
            type: this.form.type,
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
       * 删除当前奖惩
       * @param row
       */
      removeThis(row) {
        this.$axios({
          method: 'delete',
          url: 'http://localhost:8081/rewards-and-punishments/delRewardsAndPunishments?id=' + row.id,
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
        this.form.reason = row.reason;
        this.form.time = row.time;
        this.form.type = row.type;
      },
      /**
       * 更新当前奖惩
       */
      updThis() {
        this.$axios({
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/rewards-and-punishments/updRewardsAndPunishments',
          data: {
            id: this.form.id,
            eid: this.form.eid,
            reason: this.form.reason,
            time: this.form.time,
            type: this.form.type,
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

