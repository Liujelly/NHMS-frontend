<template>
  <div>
    <el-main>
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">老人入院信息管理</p>
        </div>
      <div class="function" style="margin-bottom: 30px;">
        <el-button  type="success"  style="margin-left:5px;margin-right:10px" @click="addcheckin">新增</el-button>
        <el-input
            style="margin-left:15px"
            class="Search"
            size="medium"
            placeholder="请输入名称"
            v-model="name">
        </el-input>
        <el-input
            style="margin-left:10px"
            class="Search"
            size="medium"
            placeholder="请输入性别"
            v-model="sex">
        </el-input>
        <el-button  style="margin-left:10px" @click="reset">重置</el-button>
        <el-button type="primary" @click="load">搜索</el-button>
      </div>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" ></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="idcard" width="180" label="身份证号"></el-table-column>
        <el-table-column label="操作"  width="200" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="edit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
            <el-popconfirm
                class="ml-5"
                confirm-button-text='确定'
                cancel-button-text='我再想想'
                icon="el-icon-info"
                icon-color="red"
                title="您确定删除吗？"
                @confirm="del(scope.row.id)"
            >
              <el-button type="danger" slot="reference" size="small">删除 <i class="el-icon-remove-outline"></i></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div style="padding: 10px 0">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[2, 5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>

      <el-dialog title="信息编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-width="120px" :rules="rules" ref="form">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" autocomplete="off" @input="form.name=form.name.replace(/[^\u4E00-\u9FA5]/g,'')" maxlength=4>
            </el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" @input="form.age=form.age.replace(/[^\d]/g,'')" maxlength=3 autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号码" prop="tel" >
            <el-input v-model="form.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.address" placeholder="请选择地址">
              <el-option label="江苏省" value="江苏省"></el-option>
              <el-option label="河南省" value="河南省"></el-option>
              <el-option label="江西省" value="江西省"></el-option>
              <el-option label="台湾省" value="台湾省"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号"  prop="idcard" >
            <el-input v-model="form.idcard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="民族" prop="nation" >
            <el-input v-model="form.nation" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-input v-model="form.education" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form');">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "CheckIn",
  data() {
    const checkMobile = (rule, value, callback) => {
      const regCN = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (!regCN.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    const isCnNewID = (rule, value, callback) => {
      var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
      var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
      if (/^\d{17}\d|x$/i.test(value)) {
        var sum = 0, idx;
        for (var i = 0; i < value.length - 1; i++) {
          // 对前17位数字与权值乘积求和
          sum += parseInt(value.substr(i, 1), 10) * arrExp[i];
        }
        // 计算模（固定算法）
        idx = sum % 11;
        // 检验第18为是否与校验码相等
        if (arrValid[idx] == value.substr(17, 1).toUpperCase()) {
          callback()
        } else {
          callback("身份证格式有误")
        }
      } else {
        callback("身份证格式有误")
      }
    }
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { min: 2, max: 3, message: '长度在 2 到 3 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
        ],
        nation: [
          { required: true, message: '请输入民族', trigger: 'blur' },
        ],
        education: [
          { required: true, message: '请输入民族', trigger: 'blur' },
        ],
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'change' }
        ],
        idcard: [
          { required: true, message: "身份证不能为空", trigger: "blur" },
          {  //调用上面定义的方法校验格式是否正确
            validator: isCnNewID,trigger: "blur"
          }
        ]
      },
      name:"",
      sex:"",
      input3: '',
      select: '',
      form:{},
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:10,
      msg: "hello 青哥哥",
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: 'headerBg',
      dialogFormVisible:false
    }
  },
  created() {
    this.load()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request.post("/checkin",this.form).then(res=>{
            this.$message.success("保存成功")
            this.dialogFormVisible=false
            this.load()
          })} else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    del(id){
      request.delete("/checkin/"+id).then(res=>{
        if(res){
          this.$message.success("保存成功")
          this.dialogFormVisible=false
          this.load()
        }
        else{
          this.$message.error("保存失败")
        }
      })
    },
    edit(row)
    {
      this.form = row
      this.dialogFormVisible = true
    },
    addcheckin()
    {
      this.form={}
      this.dialogFormVisible=true
    },
    save(){
      request.post("/checkin",this.form).then(res=>{
        if(res){
          this.$message.success("保存成功")
          this.dialogFormVisible=false
          this.load()
        }
        else{
          this.$message.error("保存失败")
        }
      })
    },
    reset() {
      this.name = ""
      this.age = ""
      this.sex = ""
      this.load()
    },
    load()
    {
      request.get("/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          name:this.name,
          sex:this.sex,
        }
      }).then(res=>{
            console.log(res)
            this.tableData=res.data
            this.total=res.total
          }
      )
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum=pageNum
      this.load()
    }
  }
}
</script>
<style>
.function{
  margin-top:20px;
  padding: 20px;
  background-color: white;
  border-radius: 7px;
}
.Search{
  width: 200px;
}
</style>
<style>
.headerBg {
  background: #eee!important;
}
</style>

