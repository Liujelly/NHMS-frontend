<template>
    <div>
<el-input v-model="value" placeholder="请输入内容" @change="valueChange"></el-input>
<span>{{value}}</span>
    </div>
</template>

<script>
export default {
  data() {
			let validatorTelAndMobile = function (rule, value, callback) {
              if (!value) {
                return callback(new Error('请输入联系电话'));
              }
              let isTel = /^(0\d{2,3}-){0,1}\d{6,8}$/.test(value);
              let isMobile = /^1[34578]\d{9}$/.test(value);
              if (isTel || isMobile) {
                callback();
              } else {
                callback(new Error('请输入正确的联系电话'));
              }
            }
            return {
            	rules:{
            		telephone:[
                      {
                        validator: validatorTelAndMobile, required: true, trigger: ['blur', 'change']
                      }
                    ],
            	}
            }
		},
  methods:{
    valueChange(value){
        let reg = /^[1-9]\d*$/;
        const _this=this;
        if(value){
            if (new RegExp(reg).test(value) == false) {
            setTimeout(() => {
                _this.actionDataForm.studNum = '';
               _this.errorTip = true;
　　　　　　　　}, 500); }

       else { 
　　　　　　this.errorTip = false; 
　　　　} 
        }
    },
  }
}
</script>

<style>

</style>