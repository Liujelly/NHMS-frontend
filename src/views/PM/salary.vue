<template>
  <el-card class="box-card">
    员工工资管理
    <hr>
    <br>
    <el-row style="display: flex;justify-content: flex-start;">
      <!--搜索框-->
      <span style="">
        <el-input v-model="keyword" style="width: 200px; height: 20px;" placeholder="请输入员工姓名"
                  >
        </el-input>
        <el-select v-model="value" placeholder="请选择职位" style="margin-left: 10px;" >
          
          <el-option
            v-for="item1 in options"
            :key="item1.value"
            :label="item1.label"
            :value="item1.value">
          </el-option>
        </el-select>
        

        <el-form-item label="查询方式">
            <template slot-scope="props">
              <span v-if="props.row.inquiryMode == 0">and</span>
              <span v-if="props.row.inquiryMode == 1">or</span>
            </template>
          </el-form-item>
          <el-form-item label="查询方式">
            <el-select v-model="inquiryMode" placeholder="请选择查询方式" style="margin-left: 10px;" >         
          <el-option
            v-for="v in inquiryMode"
            :key="v.key"
            :label="v.label"
            :value="v.value">
          </el-option>
        </el-select>
          </el-form-item>
        

        <span style="margin-left: 10px; height: 20px;">
          <el-button type="success" @click="selectTable" icon="el-icon-search" style="margin-left: 10px;" >查询</el-button>
        </span>
        
        
      </span>
    </el-row>
    <br>
    <br>
    <!--表格数据及操作-->
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.employeeName }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <template>
              <span v-if="props.row.sex == 0">女</span>
              <span v-if="props.row.sex == 1">男</span>
            </template>
          </el-form-item>
          <el-form-item label="出生日期" :formatter="dateForma" prop="birth">
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
          <el-form-item label="邮箱">
            <span>{{ props.row.email }}</span>
          </el-form-item>
          <el-form-item label="电话">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="单位">
            <span>{{ props.row.deptName }}</span>
          </el-form-item>
          <el-form-item label="职位">
            <span>{{ props.row.positionName }}</span>
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
          
          <el-form-item label="入职时间" :formatter="dateForma">
            <span>{{ props.row.entryTime }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <template >
              <el-switch v-model="props.row.status"
                     disabled
                     active-value="1"
                     inactive-value="0">
              </el-switch>
            </template>
          </el-form-item>
          <!--<el-form-item label="合同期" :formatter="dataForma">
            <span>{{ props.row.contractTerm }}</span>
          </el-form-item>-->
          
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="employeeName">
    </el-table-column>
    <el-table-column
      label="职位"
      prop="positionName">
    </el-table-column>
    <el-table-column
      label="联系电话"
      prop="phone">
    </el-table-column>
    <el-table-column
      label="入职时间"
      prop="entryTime" :formatter="dateForma">
    </el-table-column>
    <el-table-column label="操作" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary"
                     v-has="'salary:upd'"
                     size="mini" @click="openTips(scope.row)">
            添加工资信息
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

    <el-dialog title="添加工资信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="员工姓名">
          <el-input v-model="form.employeeName" disabled placeholder="请输入员工名"></el-input>
        </el-form-item>
        <el-form-item label="部门名">
          <el-input v-model="form.deptName" disabled placeholder="请输入部门名"></el-input>
        </el-form-item>
        <el-form-item label="工资月份">
          <el-date-picker
            v-model="form.salaryMonth"
            type="month"
            value-format="yyyy-MM"
            @change="selectCount"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="员工本月出勤情况" v-show="showInfo">
          <br>
          <el-row id="info">
            <el-col :span="6">
              <el-form-item label=" 迟到:(次)">
                <el-input style="display: inline-block;width: 50px;"
                          readonly
                          v-model="attendanceInfo.count1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label=" 早退:(次)">
                <el-input style="display: inline-block;width: 50px;"
                          readonly
                          v-model="attendanceInfo.count2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="   缺勤:(次)">
                <el-input style="display: inline-block;width: 50px;"
                          readonly
                          v-model="attendanceInfo.count3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label=" 请假:(次)">
                <el-input style="display: inline-block;width: 50px;"
                          readonly
                          v-model="attendanceInfo.count4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="基本工资">
          <el-input v-model="form.mustSalary" @change="coumperSalary" type="number"></el-input>                
        </el-form-item>
        <el-form-item label="全勤工资">
          <el-input v-model="form.realitySalary" @change="coumperSalary" type="number"
                    placeholder="请输入全勤工资"></el-input>
        </el-form-item>
        <el-form-item label="迟到扣款">
          <el-input v-model="form.fundAmount" @change="coumperSalary" type="number"
                    placeholder="请输入迟到扣款"></el-input>
        </el-form-item>
        <el-form-item label="请假扣款">
          <el-input v-model="form.taxAmount" @change="coumperSalary" type="number"
                    placeholder="请输入请假扣款"></el-input>
        </el-form-item>
        <el-form-item label="个税">
          <el-input v-model="form.pensionAmount" @change="coumperSalary" type="number"
                    placeholder="请输入个税"></el-input>
        </el-form-item>
        <el-form-item label="五险一金">
          <el-input v-model="form.injuredMount" @change="coumperSalary" type="number"
                    placeholder="请输入五险一金"></el-input>
        </el-form-item>
        <el-form-item label="合计工资">
          <el-input v-model="form.totalSalary" type="number" placeholder="合计工资"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSarlary">确 定</el-button>
      </div>
    </el-dialog>

    <br>
    <el-divider>工资管理列表</el-divider>
    <br>
    <!--表格数据及操作-->
    <el-table :data="tableData2" border style="width: 100%" stripe ref="multipleTable"
              tooltip-effect="dark">
      <!--索引-->
      <el-table-column type="index" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="employeeName" label="姓名">
      </el-table-column>
      <el-table-column prop="salaryMonth" label="工资月份" :formatter="dateForma2" sortable>
      </el-table-column>
      <el-table-column prop="mustSalary" label="基本工资">
      </el-table-column>
      <el-table-column prop="realitySalary" label="全勤工资">
      </el-table-column>
      <el-table-column prop="fundAmount" label="迟到扣款">
      </el-table-column>
      <el-table-column prop="taxAmount" label="请假扣款">
      </el-table-column>
      <el-table-column prop="pensionAmount" label="个税">
      </el-table-column>
      <el-table-column prop="injuredMount" label="五险一金">
      </el-table-column>
      <el-table-column prop="totalSalary" label="合计工资">
      </el-table-column>
    </el-table>

    <!--分页条-->
    <el-pagination
      style="padding-top:15px"
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page="current2"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total2"
    ></el-pagination>
  </el-card>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "salary",
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

        attendanceInfo: "",
        dialogFormVisible: false,
        showInfo: false,
        deptList: [],
        thisUserId: "",
        options: [{
          value: '选项1',
          label: '前台'
        }, {
          value: '选项2',
          label: '护工'
        }, {
          value: '选项3',
          label: '会计'
        }, {
          value: '选项4',
          label: '厨师'
        }, {
          value: '选项5',
          label: '经理'
        },{
          value: '选项6',
          label: '技术人员'
        }
      ],
        value: '',
        form: {
          salaryMonth: "",
          employeeName: "",
          eid: "",
          totalSalary: 0,
          injuredMount: 0,
          pensionAmount: 0,
          taxAmount: 0,
          fundAmount: 0,
          realitySalary: 0,
          mustSalary: 0
        }
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
        return moment(date).format("YYYY-MM")
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
        this.showInfo = false;
        this.form.employeeName = row.employeeName;
        this.form.eid = row.id;
        this.form.deptName = row.deptName;
      },
      /**
       * 添加工资
       * */
      addSarlary() {
        this.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/employeeSalary/salary',
          data: {
            salaryMonth: this.form.salaryMonth,
            employeeName: this.form.employeeName,
            totalSalary: this.form.totalSalary,
            eid: this.form.eid,
            injuredMount: this.form.injuredMount,
            pensionAmount: this.form.pensionAmount,
            taxAmount: this.form.taxAmount,
            realitySalary: this.form.realitySalary,
            mustSalary: this.form.mustSalary,
            fundAmount: this.form.fundAmount,
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
       * 获取工资数据
       * @param limit
       * @param page
       * @param keyword
       */
      getAttendanceTableDate(limit, page) {
        this.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/employeeSalary/salarys',
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
      coumperSalary() {
        this.form.totalSalary =
          Number(this.form.mustSalary) +
          Number(this.form.realitySalary) -
          Number(this.form.fundAmount) -
          Number(this.form.taxAmount) -
          Number(this.form.pensionAmount) -
          Number(this.form.injuredMount);
      },
      selectCount() {
        this.$axios({
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/employeeAttendance/getAttendanceInfo?eid=' + this.form.eid + '&mounth=' + this.form.salaryMonth,
        }).then((response) => {
          this.showInfo = true;
          this.attendanceInfo = response.data.data;
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
      this.getDept();
      this.getAttendanceTableDate(this.pageSize, this.current)
    }
  }
</script>

<style scoped>
  #info >>> .el-input__inner {
    border: 0;
  }
</style>
