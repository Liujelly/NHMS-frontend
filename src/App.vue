<template>
  <div id="app" style=" height: 100%">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
 
<script>
export default {
 name: 'App',
 provide () {
   return{
     reload: this.reload
   }
 },
 data() {
   return {
       isRouterAlive: true
   }
 },
 methods:{
   reload(){
     this.isRouterAlive = false
     this.$nextTick(function(){
       this.isRouterAlive = true
     })
   }
 }
}
</script>
<style>
  html,body,#app{
    height: 100%;
    margin: 0;
    padding: 0;

  }
</style>

