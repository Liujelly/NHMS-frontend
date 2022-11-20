<template>
  <el-card class="box-card">
    <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">员工考勤管理</p>
        </div>
    
    <el-row style="display: flex;justify-content: flex-start;">
      <!--搜索框-->
      <span style="">
        <el-input v-model="keyword" style="width: 200px; height: 20px;" placeholder="请输入员工姓名"></el-input>
                  <span style="margin-left: 10px; height: 20px;">
            <el-button type="success" @click="selectTable" icon="el-icon-search">查询</el-button>
        </span>
      </span>
    </el-row>
    
    <br>
    <!--表格数据及操作-->
    <el-table
    :data="tableData"
    style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="工号">
                        <span>{{ props.row.employeeId }}</span>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <span>{{ props.row.employeeName }}</span>
                    </el-form-item>          
                    <el-form-item label="性别">
                        <template>
                            <span v-if="props.row.sex == 0">女</span>
                            <span v-if="props.row.sex == 1">男</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="出生日期" :formatter="dateForma" props="birth">
                        <span>{{ props.row.birth }}</span>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <span>{{ props.row.idNo }}</span>
                    </el-form-item>
                    <el-form-item label="婚姻状态">
                        <template >
                            <span v-if="props.row.maritalStatus == 0">未婚</span>
                            <span v-if="props.row.maritalStatus == 1">已婚</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="民族">
                        <span>{{ props.row.nation }}</span>
                    </el-form-item>
                    <el-form-item label="政治面貌">
                        <template>
                            <span v-if="props.row.politicCountenance == 0">共青团员</span>
                            <span v-if="props.row.politicCountenance == 1">中共预备党员</span>
                            <span v-if="props.row.politicCountenance == 2">中共党员</span>
                            <span v-if="props.row.politicCountenance == 3">群众</span>
                        </template>           
                    </el-form-item>
                    <el-form-item label="地址">
                        <span>{{props.row.address}}</span>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <span>{{ props.row.email }}</span>
                    </el-form-item>
                    <el-form-item label="电话">
                        <span>{{ props.row.phone }}</span>
                    </el-form-item>
                    <el-form-item label="职位">
                        <span>{{ props.row.deptName }}</span>
                    </el-form-item>       
                    <el-form-item label="教育背景">
                        <template>
                            <span v-if="props.row.educationalBackground == 0">大专</span>
                            <span v-if="props.row.educationalBackground == 1">本科</span>
                            <span v-if="props.row.educationalBackground == 2">硕博</span>
                            <span v-if="props.row.educationalBackground == 3">其他</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="毕业学校">
                        <span>{{ props.row.school }}</span>
                    </el-form-item>    
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
            label="工号"
            prop="employeeId">
        </el-table-column>
        <el-table-column
            label="姓名"
            prop="employeeName">
        </el-table-column>   
        <el-table-column
            label="职位"
            prop="deptName">
        </el-table-column>
        <el-table-column
            label="联系电话"
            prop="phone">
        </el-table-column>
        <el-table-column
            label="入职时间"
            prop="entryTime" 
            :formatter="dateForma">
        </el-table-column>
        <el-table-column prop="status" label="在职状态">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.status"
                    disabled
                    active-value="1"
                    inactive-value="0">
                </el-switch>
            </template>
        </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="openTips(scope.row)"
                     v-has="'attendance:add'">
            添加出勤信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>

    <!--分页条-->
    <!--<el-pagination
      style="padding-top:15px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>-->
    

    <el-dialog title="添加出勤信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="员工姓名">
          <el-input v-model="form.ename" disabled placeholder="请输入员工名"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.deptName" disabled placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item label="出勤情况">
          <el-select v-model="form.attendance" placeholder="请选择">
            <el-option
              v-for="a in attendanceList"
              :key="a.key"
              :label="a.label"
              :value="a.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上班时间">
          <el-time-picker
            v-model="form.goWorkTime"
            style="width: 350px;"
            :picker-options="{selectableRange: '07:30:00 - 09:30:00'}"
            placeholder="请选择07:30:00 - 09:30:00的任意时间点">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="下班时间">
          <el-time-picker
            v-model="form.goOffWorkTime"
            style="width: 350px;"
            :picker-options="{selectableRange: '15:30:00 - 23:59:59'}"
            placeholder="请选择15:30:00 - 23:59:59的任意时间点">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks" placeholder="请输入备注说明"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAtterdance">确 定</el-button>
      </div>
    </el-dialog>

    
    <el-divider>出勤列表</el-divider>
    
    <!--表格数据及操作-->
    <el-table :data="tableData2"  style="width: 100%" stripe ref="multipleTable"
              tooltip-effect="dark">
      <!--索引-->
      <el-table-column type="index" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="ename" label="姓名" sortable>
      </el-table-column>
      <el-table-column prop="deptName" label="职位">
      </el-table-column>
      <el-table-column prop="educationalBackground" label="教育背景">
        <template slot-scope="scope">
          <span v-if="scope.row.attendance == 1">正常</span>
          <span v-if="scope.row.attendance == 2">迟到</span>
          <span v-if="scope.row.attendance == 3">早退</span>
          <span v-if="scope.row.attendance == 4">缺勤</span>
          <span v-if="scope.row.attendance == 5">请假</span>
        </template>
      </el-table-column>
      <el-table-column prop="goWorkTime" label="上班时间" :formatter="dateForma2" width="150">
      </el-table-column>
      <el-table-column prop="goOffWorkTime" label="下班时间" :formatter="dateForma2" width="150">
      </el-table-column>
    </el-table>

    <!--分页条-->
    <!--<el-pagination
      style="padding-top:15px"
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page="current2"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total2"
    ></el-pagination>-->
    
  </el-card>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "attendance",
    data() {
      return {
        tableData: [],   //表格数据
        tableData2: [],   //表格数据
        keyword: '',   //查询输入框数据
        total: 0, // 总条数
        pageSize: 10,     // 每页显示的条数
        current: 1,  // 当前页码

        total2: 0, // 总条数
        pageSize2: 10,     // 每页显示的条数
        current2: 1,  // 当前页码

        dialogFormVisible: false,
        deptList: [],
        thisUserId: "",
        form: {
          eid: "",
          ename: "",
          deptName: "",
          attendance: "",
          remarks: "",
          goWorkTime: "",
          goOffWorkTime: "",
        },
        attendanceList: [
          {
            key: "1", label: "正常"
          }, {
            key: "2", label: "迟到"
          }, {
            key: "3", label: "早退"
          }, {
            key: "4", label: "缺勤"
          }, {
            key: "5", label: "请假"
          },
        ]
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
       * 日期格式化
       * @param row
       * @param column
       * @returns {string}
       */
      dateForma2(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return ''
        }
        return moment(date).format("HH:mm:ss")
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
       * 监听数据表格每页条数变化并更新表格数据
       * @param val
       */
      handleSizeChange2(val) {
        this.getAttendanceTableDate(val, this.current2, null);
      },
      /**
       * 监听页码变化并更新表格
       * @param val
       */
      handleCurrentChange2(val) {
        this.getAttendanceTableDate(this.limit, val, null);
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
          url: 'http://localhost:8081/employee/listAllEmployee',
          data: {
            limit: limit,
            page: page,
            employeeName: keyword
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
       * 清空弹层值
       */
      clearValue() {
        Object.keys(this.form).forEach((key) => (this.form[key] = ''))
      },
      /**
       * 获取全部部门名
       */
      getDept() {
        this.$axios({
          method: 'post',
          url: 'http://localhost:8081/dept/listAllDeptName',
        }).then((response) => {
          this.deptList = response.data.data;
        }).catch((error) => {
          console.log(error)
        })
      },
      openTips(row) {
        this.dialogFormVisible = true;
        this.form.ename = row.employeeName;
        this.form.eid = row.id;
        this.form.deptName = row.deptName;
      },
      addAtterdance() {
        this.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/employeeAttendance/attendanceAdd',
          data: {
            eid: this.form.eid,
            deptName: this.form.deptName,
            attendance: this.form.attendance,
            remarks: this.form.remarks,
            goWorkTime: this.form.goWorkTime,
            goOffWorkTime: this.form.goOffWorkTime,
            createBy: localStorage.getItem("uId")
          }
        }).then((response) => {
          this.$message.success(response.data.msg);
          this.clearValue()
          this.dialogFormVisible = false;
          this.getAttendanceTableDate(this.pageSize, this.current);
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 获取出勤数据
       * @param limit
       * @param page
       */
      getAttendanceTableDate(limit, page) {
        this.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/employeeAttendance/attendances',
          data: {
            limit: limit,
            page: page
          }
        }).then((response) => {
          if (response.data.msg != "SUCCESS") {
            this.$message.error(response.data.msg);
          }
          this.tableData2 = response.data.data.records;
          this.total2 = response.data.data.total; //totalcount
          this.current2 = response.data.data.current; //页数
        }).catch((error) => {
          console.log(error)
        })
      },
    },
    created() {
      /**
       * 页面渲染调用一次获取表格
       */
      this.getTableDate(this.pageSize, this.current);
      this.getDept();
      this.getAttendanceTableDate(this.pageSize, this.current)
    }
  }
</script>

