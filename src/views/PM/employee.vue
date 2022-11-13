<template>
  <el-card class="box-card">
    员工信息管理
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
          <el-button type="success" @click="selectTable" icon="el-icon-search">查询</el-button>
        </span>
        
        
      </span>
      <!--新增按钮-->
      <span style="display: inline-block;margin-left: 20px; height: 20px;">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
                   @click="addDialog" 
                   round>新增
        </el-button>
      </span>
    </el-row>
    <br>
    <br>
    <!--表格数据及操作-->
    <el-table
    :data="tableData"
    style="width: 100%" stripe ref="multipleTable"
              tooltip-effect="dark">
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
          
          <el-form-item label="入职时间" :formatter="dateForma">
            <span>{{ props.row.entryTime }}</span>
          </el-form-item>
          <el-form-item label="在职状态">
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
      prop="entryTime" :formatter="dateForma">
    </el-table-column>
    
    <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editThis(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeThis(scope.row)">
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

    <el-dialog title="添加新员工" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="员工姓名">
          <el-input v-model="form.employeeName" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" size="medium">
            <el-radio label="0">女</el-radio>
            <el-radio label="1">男</el-radio>
          </el-radio-group> 
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="请选择出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="form.idNo" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状态">
          <el-select v-model="form.maritalStatus" placeholder="请选择">
            <el-option
              v-for="m in maritalStatusList"
              :key="m.key"
              :label="m.label"
              :value="m.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="form.nation" placeholder="请输入民族"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="form.politicCountenance" placeholder="请选择">
            <el-option
              v-for="p in politicCountenance"
              :key="p.key"
              :label="p.label"
              :value="p.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input 
                    v-model.trim="form.phone"
                    placeholder="请输入联系方式"
                    oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                    maxlength="11"
                   @input="handleInput"
                    ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <!-- <el-form-item label="部门">
          <el-select v-model="form.deptId" placeholder="请选择">
            <el-option
              v-for="dept in deptList"
              :key="dept.id"
              :label="dept.deptName"
              :value="dept.id">{{dept.deptName}}
            </el-option>
          </el-select>

        </el-form-item> -->
        <el-form-item label="职位">
          <el-input v-model="form.positionName" placeholder="请输入职位"></el-input>
        </el-form-item>
        
        <el-form-item label="教育背景">
          <el-select v-model="form.educationalBackground" placeholder="请选择">
            <el-option
              v-for="e in educationalBackground"
              :key="e.key"
              :label="e.label"
              :value="e.key">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="毕业学校">
          <el-input v-model="form.school" placeholder="请输入毕业学校"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker
            v-model="form.entryTime"
            type="date"
            placeholder="请选择入职时间">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="合同期">
          <el-date-picker
            v-model="form.contractTerm"
            type="date"
            placeholder="请选择合同期">
          </el-date-picker>
        </el-form-item>-->
       
        <el-form-item label="在职状态">
          <el-switch v-model="switchon"></el-switch>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNew">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="修改员工信息" :visible.sync="editdialog">
      <el-form :model="form">
        <el-form-item label="员工姓名">
          <el-input v-model="form.employeeName" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <!--<el-upload
          class="avatar-uploader"
          action="/api/upload/employeePhotoUpload"
          :show-file-list="false"
          :headers="myHeaders"
          :data="{id:form.id}"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>-->
        
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" size="medium">
            <el-radio label="0">女</el-radio>
            <el-radio label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="请选择出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="form.idNo" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状态">
          <el-select v-model="form.maritalStatus" placeholder="请选择">
            <el-option
              v-for="m in maritalStatusList"
              :label="m.label"
              :key="m.key"
              :value="m.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="form.nation" placeholder="请输入民族"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="form.politicCountenance" placeholder="请选择">
            <el-option
              v-for="p in politicCountenance"
              :label="p.label"
              :key="p.key"
              :value="p.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input 
                    v-model.trim="form.phone"
                    placeholder="请输入联系方式"
                    oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                    maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <!-- <el-form-item label="部门" :required="true">
          <el-select v-model="form.deptId" placeholder="请选择">
            <el-option
              v-for="dept in deptList"
              :key="dept.id"
              :label="dept.deptName"
              :value="dept.id">{{dept.deptName}}
            </el-option>
          </el-select>

        </el-form-item> -->
        <el-form-item label="职位">
          <el-input v-model="form.positionName" placeholder="请输入职位"></el-input>
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="form.academicTitle" placeholder="请输入职称"></el-input>
        </el-form-item>
        <el-form-item label="教育背景">
          <el-select v-model="form.educationalBackground" placeholder="请选择">
            <el-option
              v-for="e in educationalBackground"
              :key="e.key"
              :label="e.label"
              :value="e.key">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="毕业学校">
          <el-input v-model="form.school" placeholder="请输入毕业学校"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker
            v-model="form.entryTime"
            type="date"
            placeholder="请选择入职时间">
          </el-date-picker>
        </el-form-item>
        <!--<el-form-item label="合同期">
          <el-date-picker
            v-model="form.contractTerm"
            type="date"
            placeholder="请选择合同期">
          </el-date-picker>
        </el-form-item>-->
        <el-form-item label="在职状态">
          <el-switch v-model="switchon"></el-switch>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialog = false">取 消</el-button>
        <el-button type="primary" @click="updThis">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<script>
  import moment from 'moment'
  // import axios from 'axios'
  export default {
    name: "employee",
    data() {

      const phone = (rule, value, callback) => {
      const regCN = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (!regCN.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
      return {       
        tableData: [],   //表格数据
        keyword: '',   //查询输入框数据
        total: 0, // 总条数
        pageSize: 10,     // 每页显示的条数
        current: 1,  // 当前页码
        imageUrl: "",
        myHeaders: {Authorization: localStorage.getItem('token')},
        rule:{
          phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: phone, trigger: 'change' }]
        
        },
          

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
      
  
        maritalStatusList: [
          {
            key: "1",
            label: "已婚"
          }, {
            key: "0",
            label: "未婚"
          }
        ],
        politicCountenance: [
          {
            key: "0",
            label: "共青团员"
          }, {
            key: "1",
            label: "中共预备党员"
          }, {
            key: "2",
            label: "中共党员"
          },
          {
            key: "3",
            label: "群众"
          }
        ],
        is_dimission:[
          {
            key:"0",
            label:"离职"
          },
          {
            key:"1",
            label:"在职"
          }
        ],
        educationalBackground: [
          {
            key: "0",
            label: "大专"
          }, {
            key: "1",
            label: "本科"
          }, {
            key: "2",
            label: "硕博"
          }, {
            key: "3",
            label: "其他"
          }
        ],
        form: {
          employeeName: '',
          sex: '',
          birth: '',
          idNo: '',
          maritalStatus: '',
          nation: '',
          politicCountenance: '',
          email: '',
          phone: '',
          address: '',
          deptId: '',
          positionName: '',
          academicTitle: '',
          educationalBackground: '',
          school: '',
          entryTime: '',
          status: '',
          contractTerm: '',
          createBy: '',
          id: "",
          is_dimission:""
        },
        dialogFormVisible: false,
        editdialog: false,
        switchon: true,
        editSwitchon: true,
        deptList: {},
        trsValue: [],
        thisUserId: ""
      }
    },
    mounted() {
      // this.getTableDate();
      console.log("123")
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
      getTableDate:function(limit, page, keyword) {
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
          var redata = response.data.data.records;
          for (let i = 0; i < redata.length; i++) {
            redata[i].photoUrl = 'http://localhost:8081/upload/showPhoto?fileName=' + redata[i].photoUrl
          }
          console.log(redata)
          this.tableData = redata;
          console.log(this.tableData);
          this.total = response.data.data.total; //totalcount
          this.current = response.data.data.current; //页数
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 添加新员工
       */
      addNew() {
        if (this.switchon == true) {
          this.form.status = 1
        } else {
          this.form.status = 0
        }
        if(this.deptList == null){
          alert('服务器错误');
          return;
        }
        console.log(this.deptList.id)
        this.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/employee/addEmployee',
          data: {
            employeeName: this.form.employeeName,
            sex: this.form.sex,
            birth: this.form.birth,
            idNo: this.form.idNo,
            maritalStatus: this.form.maritalStatus,
            nation: this.form.nation,
            politicCountenance: this.form.politicCountenance,
            email: this.form.email,
            phone: this.form.phone,
            address: this.form.address,
            deptId: this.deptList.id,
            deptName: this.deptList.deptName,
            positionName: this.form.positionName,
            academicTitle: this.form.academicTitle,
            educationalBackground: this.form.educationalBackground,
            school: this.form.school,
            entryTime: this.form.entryTime,
            status: this.form.status,
            contractTerm: this.form.contractTerm,
            createBy: localStorage.getItem("uId"),
            is_dimission:this.form.is_dimission
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
       * 删除当前员工
       * @param row
       */
      removeThis(row) {
        this.$axios({
          method: 'delete',
          url: 'http://localhost:8081/employee/delEmployee?id=' + row.id,
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
        if (row.photoUrl != null || row.photoUrl != "") {
          this.imageUrl = 'http://localhost:8081/upload/showPhoto?fileName=' + row.photoUrl
        } else {
          this.imageUrl = "https://img0.baidu.com/it/u=3640332497,3089915405&fm=26&fmt=auto&gp=0.jpg"
        }
        this.editdialog = true;
        this.form.id = row.id;
        this.form.employeeName = row.employeeName;
        this.form.sex = row.sex;
        this.form.birth = row.birth;
        this.form.idNo = row.idNo;
        this.form.maritalStatus = row.maritalStatus;
        this.form.nation = row.nation;
        this.form.politicCountenance = row.politicCountenance;
        this.form.email = row.email;
        this.form.phone = row.phone;
        this.form.address = row.address;
        this.form.deptId = this.deptList.id,
        this.form.deptName = this.deptList.deptName,
        this.form.positionName = row.positionName;
        this.form.academicTitle = row.academicTitle;
        this.form.educationalBackground = row.educationalBackground;
        this.form.school = row.school;
        this.form.entryTime = row.entryTime;
        this.form.status = row.status;
        this.form.is_dimission = row.is_dimission;
        this.form.contractTerm = row.contractTerm;
        if (row.status == 0) {
          this.form.status = false;
          this.editSwitchon = false
        } else {
          this.form.status = true;
          this.editSwitchon = true;
        }
      },
      /**
       * 更新当前员工
       */
      updThis() {
        if (this.switchon == true) {
          this.form.status = 1
        } else {
          this.form.status = 0
        }
        this.$axios({
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          url: 'http://localhost:8081/employee/updEmployee',
          data: {
            id: this.form.id,
            employeeName: this.form.employeeName,
            sex: this.form.sex,
            birth: this.form.birth,
            idNo: this.form.idNo,
            maritalStatus: this.form.maritalStatus,
            nation: this.form.nation,
            politicCountenance: this.form.politicCountenance,
            email: this.form.email,
            phone: this.form.phone,
            address: this.form.address,
            deptId: this.deptList.id,
            deptName: this.deptList.deptName,
            positionName: this.form.positionName,
            academicTitle: this.form.academicTitle,
            educationalBackground: this.form.educationalBackground,
            school: this.form.school,
            entryTime: this.form.entryTime,
            status: this.form.status,
            contractTerm: this.form.contractTerm,
            updateBy: localStorage.getItem("uId"),
            is_dimission: this.form.is_dimission
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
      /**
       * 获取全部部门
       */
      getDept() {
        this.$axios({
          method: 'post',
          url: 'http://localhost:8081/dept/listAllDeptName',
        }).then((response) => {
          this.deptList = JSON.parse(JSON.stringify(response.data.data[0]));
        }).catch((error) => {
          console.log(error)
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        if (res.msg == "上传成功!") {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG ,PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    created() {
      /**
       * 页面渲染调用一次获取表格
       */
      this.getDept();
      this.getTableDate(this.pageSize, this.current);
      

    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  #ep{
    width: 50px;
    height: 50px;
  }
</style>
