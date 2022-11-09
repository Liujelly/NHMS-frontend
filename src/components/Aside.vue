<template>
        <el-menu  router>
            <!-- <el-submenu index="1" >
              <template slot="title"><i class="el-icon-aligrandpa"></i>老人管理</template>
              <el-submenu index="1-1">
                <template slot="title">档案管理</template>
                <el-menu-item index="Elderly">老人档案</el-menu-item>
                <el-menu-item index="InArchives">入住档案</el-menu-item>
                <el-menu-item index="OutArchives">退住档案</el-menu-item>
                <el-menu-item index="LeaveArchives">请假档案</el-menu-item>
              </el-submenu>
              <el-submenu index="1-2">
                <template slot="title">入住管理</template>
                <el-menu-item index="CheckIn">老人入住信息管理</el-menu-item>
                <el-menu-item index="Approval">入住批准</el-menu-item>

              </el-submenu>
              <el-submenu index="1-3">
                <template slot="title">退住管理</template>
                <el-menu-item index="Retreat">退住信息管理</el-menu-item>
                <el-menu-item index="RApproval">退住批准</el-menu-item>
              </el-submenu>
              <el-submenu index="1-4">
                <template slot="title">请假管理</template>
                <el-menu-item index="LeaveApproval">请假批准</el-menu-item>
                <el-menu-item index="BackApproval">回院批准</el-menu-item>
              </el-submenu>
              <el-submenu index="1-5">
                <template slot="title">宿舍管理</template>
                <el-menu-item index="Dormitory">入住分配</el-menu-item>
              </el-submenu>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title"><i class="el-icon-alijiankang"></i>健康管理</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-aligongwujiedai"></i>接待管理</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
              <el-menu-item index="3-3">选项3</el-menu-item>
              <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-user-solid"></i>人事管理</template>
              <el-menu-item index="4-1">选项1</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
              <el-menu-item index="4-3">选项3</el-menu-item>
              <el-submenu index="4-4">
                <template slot="title">选项4</template>
                <el-menu-item index="4-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-alicaiwu"></i>财务管理</template>
              <el-menu-item index="5-1">选项1</el-menu-item>
              <el-menu-item index="5-2">选项2</el-menu-item>
              <el-menu-item index="5-3">选项3</el-menu-item>
              <el-submenu index="5-4">
                <template slot="title">选项4</template>
                <el-menu-item index="5-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-alicangku"></i>仓库管理</template>
              <el-menu-item index="6-1">选项1</el-menu-item>
              <el-menu-item index="6-2">选项2</el-menu-item>
              <el-menu-item index="6-3">选项3</el-menu-item>
              <el-submenu index="6-4">
                <template slot="title">选项4</template>
                <el-menu-item index="6-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title"><i class="el-icon-document"></i>资料管理</template>
              <el-menu-item index="/priceSet">收费标准设置</el-menu-item>
              <el-menu-item index="/recipeIndex">食谱管理</el-menu-item>
              <el-submenu index="7-3">
                <template slot="title">设施资料管理</template>
                <el-menu-item index="/buildingIndex">楼房管理</el-menu-item>
                <el-menu-item index="/dorm">宿舍管理</el-menu-item>
                <el-menu-item index="/infrastructure">基础设施管理</el-menu-item>
              </el-submenu>
              <el-menu-item index="8-1">权限管理</el-menu-item>
              <el-menu-item index="/log">操作日志</el-menu-item>
            </el-submenu> -->

            <el-submenu
              v-for="(item,index) in menuList"
              :key="index"
              :index="index+''"
            >
              <template slot="title"><i :class="item.iconCls"></i><span style="margin-left:8px">{{item.nameZh}}</span></template>

              <template v-for="child in item.children">
                <!-- 如果二级菜单还有子菜单，继续循环该二级菜单-->
                <el-submenu
                  :key="child.path"
                  :index="child.path"
                  v-if="child.children&&child.children.length>0"
                >
                  <template slot="title"><span>{{child.nameZh}}</span>
                  </template>
                  <!-- 三级菜单 -->
                  <template v-for="grChild in child.children">
                    <el-menu-item :index="grChild.path" :key="grChild.path">
                      <span>{{grChild.nameZh}}</span>
                    </el-menu-item>
                  </template>
                </el-submenu>
                <!-- 二级菜单没有子菜单的直接显示 -->
                <el-menu-item v-else :index="child.path" :key="child.path">
                  <span>{{child.nameZh}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
            
          </el-menu>
</template>

<script>
    export default {
        name:"Aside",
        data(){
            return{
              menuList:[],
            }
        },
         created(){
            const _this=this
            this.request.get("http://localhost:8081/getMenu").then(res=>{
                console.log(res)
                _this.menuList=res
            })
        }
    }
</script>

<style>

</style>