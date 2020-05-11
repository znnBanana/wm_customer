
<template>
  <div id="app">
    <!-- 主要用于接受登录页面、后台管理页面容器 -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import './assets/css/icon.css'
export default {
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量                                        
      return {
          reload: this.reload                                              
      }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }

}
</script>