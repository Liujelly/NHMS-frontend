<template>
    <div v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0)">
        <div style="margin-top:-20px">
            <p style="font-size:20px;font-weight: bold;">操作日志</p>
        </div>
        <div>
            <el-input  
                style="margin-left:15px" 
                class="Search"
                size="medium"
                placeholder="请输入英文"
                v-model="input1">
            </el-input>
            <el-input
                style="margin-left:10px"            
                class="Search"
                size="medium"
                placeholder="请输入中文名"
                v-model="input2">
            </el-input>
            <el-button  style="margin-left:10px" @click="reset">重置</el-button>
            <el-button type="primary" @click="addRole">添加角色</el-button>
        </div>
        <div class="function">
            <el-collapse v-model="activeColItem" accordion style="width: 500px;" @change="collapseChange">
                <el-collapse-item v-for="(item,index) in roles" :title="item.nameZh" :name="item.id" :key="index">
                    <el-card class="box-card">
                    <div slot="header">
                        <span>可访问的资源</span>
                        <el-button type="text"
                                    style="color: #f6061b;margin: 0px;float: right; padding: 3px 0;width: 15px;height:15px"
                                    icon="el-icon-delete" @click="deleteRole(item.id,item.name,item.nameZh)"></el-button>
                    </div>
                    <div>
                        <el-tree 
                                :props="defaultProps"
                                :key="item.id"
                                :data="treeData"
                                :default-checked-keys="checkedKeys"
                                node-key="id"
                                ref="tree"
                                show-checkbox
                                highlight-current
                                >
                        </el-tree>
                    </div>
                    <div style="display: flex;justify-content: flex-end;margin-right: 10px">
                        <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
                        <el-button type="primary" size="mini" @click="updateRoleMenu(item.id,index)">确认修改</el-button>
                    </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    
    export default {
        name:'Log',
        inject: ['reload'],
        data() {
            return {
                checkedKeys:[],
                defaultProps:{children: 'children',label: 'name'},
                loading: false,                    
                activeColItem:-1,
                treeData: [{
                id: 1,
                label: '老人管理',
                children: [{
                    id: 17,
                    label: '档案管理',
                    children: [{
                        id: 18,
                        label: '老人档案'
                        }, {
                        id: 19,
                        label: '入院档案'
                        },{
                        id: 20,
                        label: '退院档案'
                        }, {
                        id: 21,
                        label: '请假档案'
                        },{
                        id: 64,
                        label: '健康档案'
                        }]
                    },{
                    id: 22,
                    label: '入院管理',
                    children: [{
                        id: 23,
                        label: '入院信息管理'
                        }, {
                        id: 24,
                        label: '入院批准'
                        }]
                    }, {
                    id: 25,
                    label: '退院管理',
                    children: [{
                        id: 26,
                        label: '退院信息管理'
                        }, {
                        id: 27,
                        label: '退院批准'
                        }]
                    }, {
                    id: 28,
                    label: '请假管理',
                    children: [{
                        id: 29,
                        label: '请假批准'
                        }, {
                        id: 30,
                        label: '回院批准'
                        }]
                    }, {
                    id: 31,
                    label: '宿舍分配'
                    }]
                }, {
                id: 2,
                label: '健康管理',
                children: [{
                    id: 32,
                    label: '体检数据管理'
                }, {
                    id: 33,
                    label: '健康指数分析'
                }, {
                    id: 34,
                    label: '老人健康标准'
                }, {
                    id: 35,
                    label: '健康等级评估'
                }, {
                    id: 36,
                    label: '疾病预警'
                }]
                }, {
                id: 3,
                label: '接待管理',
                children: [{
                    id: 44,
                    label: '申请信息管理'
                }, {
                    id: 45,
                    label: '申请表'
                }, {
                    id: 46,
                    label: '捐赠物资信息管理'
                }, {
                    id: 47,
                    label: '探望信息管理'
                }, {
                    id: 48,
                    label: '巡查管理'
                }]
                },{
                id: 4,
                label: '人事管理',
                children: [{
                    id: 37,
                    label: '员工信息管理'
                }, {
                    id: 38,
                    label: '员工工资管理'
                }, {
                    id: 39,
                    label: '员工考勤管理'
                }, {
                    id: 40,
                    label: '职位管理'
                }, {
                    id: 41,
                    label: '奖惩管理'
                }, {
                    id: 42,
                    label: '考核管理'
                }, {
                    id: 43,
                    label: '培训管理'
                }]
                },{
                id: 5,
                label: '财务管理',
                children: [{
                    id: 61,
                    label: '预交费用登记'
                }, {
                    id: 62,
                    label: '老人费用项目'
                }, {
                    id: 63,
                    label: '预备金管理'
                }]
                },{
                id: 6,
                label: '仓库管理',
                children: [{
                   id: 49,
                    label: '入库管理'
                }, {
                    id: 50,
                    label: '出库管理'
                }, {
                    id: 51,
                    label: '供应商管理'
                }, {
                    id: 52,
                    label: '出入库记录',
                    children: [{
                        id: 53,
                        label: '入库记录'
                        }, {
                        id: 54,
                        label: '出库记录'
                        }]
                },{
                    id: 55,
                    label: '领用归还管理',
                    children: [{
                        id: 56,
                        label: '领用管理'
                        }, {
                        id: 57,
                        label: '归还管理'
                        }]
                },{
                    id: 58,
                    label: '库存管理',
                    children: [{
                        id: 59,
                        label: '库存信息管理'
                        }, {
                        id: 60,
                        label: '库存预警'
                        }]
                }]
                },{
                id: 7,
                label: '资料管理',
                children: [{
                    id: 8,
                    label: '收费标准设置'
                }, {
                    id: 9,
                    label: '食谱管理'
                }, {
                    id: 10,
                    label: '设施资料管理',
                    children: [{
                        id: 11,
                        label: '楼房管理'
                        }, {
                        id: 12,
                        label: '宿舍管理'
                        }, {
                        id: 13,
                        label: '基础设施管理'
                        }]
                }, {
                    id: 14,
                    label: '用户管理'
                },{
                    id: 15,
                    label: '权限管理'
                }, {
                    id: 16,
                    label: '操作日志'
                }]
                }],
                defaultProps: {
                children: 'children',
                label: 'label'
                },
            roles:[],
            input1: '',
            input2: '',
            }
        },
        methods:{
            load(){
                const _this=this
                this.request.get("http://localhost:8081/getRole").then(res=>{
                console.log(res)
                 _this.roles=res
            })
            },
           
            addRole(){
                const _this=this
                let name=this.input1
                let nameZh=this.input2
                let role={name,nameZh}
                this.request.post("http://localhost:8081/addRole",role).then(res=>{
                    if(res){
                        this.$message.success("添加成功")
                    }else{
                        this.$message.error("填写内容不能为空")
                    }
                
            })
            clearTimeout(this.timer);  //清除延迟执行 
            
            this.timer = setTimeout(()=>{   //设置延迟执行
                this.load();
            },100);
            },
             reset(){
                this.input1='',
                this.input2='',
                this.load()
            },
            collapseChange(roleId){
                const _this=this
                if(roleId){
                    this.request.get("http://localhost:8081/getCheckedKey",{
                    params:{
                        roleId:roleId
                    }
                    }).then(res=>{
                        console.log(res)
                       _this.checkedKeys=res
                    })
                }
            },
            updateRoleMenu(roleId,index){
                this.loading=true
                let tree = this.$refs.tree[index];
                let selectedMenuIds = tree.getCheckedKeys(true);
                let treeMenuKeys={
                    roleId,
                    selectedMenuIds,
                }
                
                this.request.post("http://localhost:8081/updateRoleMenu",treeMenuKeys).then(res=>{
                        if(res){
                            
                            this.$message.success("修改成功")
                            this.loading=false
                        }
                    })
                    
            },
            deleteRole(id,name,nameZh){
                let role={id,name,nameZh}
                this.request.post("http://localhost:8081/deleteRole",role).then(res=>{
                        if(res){
                            this.$message.success("删除成功")
                        }
                    })
                this.timer = setTimeout(()=>{   //设置延迟执行
                this.load();
                },100);
            },
            cancelUpdate(){
                this.activeColItem=-1
                this.reload();
            }
        },
         created(){
            this.load()
        }
        
    }
</script>

<style lang="scss" scoped>
.Search{
    width: 200px;
}
.function{
    margin-top:20px;
    padding: 20px;
    background-color: white;
    border-radius: 7px;

}
</style>