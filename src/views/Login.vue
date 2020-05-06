<template>
  <div class="login">
    <img src="../assets/login2.jpeg" alt="">
    <div class="header">
      <div class="logo"><i class="iconfont icon-waimai2"></i></div>
      <div class="title">
        <span class="one">飞毛腿</span>&nbsp;
        <span>外卖订餐</span>
        <div style="font-size:16px;margin-top:2em;color:#566F7A">一大波美食正在向您袭来……</div>
      </div>
    </div>
    <!-- 登录模态框 -->
    <div class="form">
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
          <div class="block">
            <van-cell-group>
              <van-field v-model="form.username" required clearable label="用户名" icon="question-o" placeholder="请输入用户名"/>
              <van-field v-model="form.password" type="password" label="密码" placeholder="请输入密码" required/>
            </van-cell-group>
            <van-row style="margin:1em">
              <van-button style="margin-left:16em;margin-right:.8em" size="small" type="default" @click="cancelHandler">取消</van-button>
              <van-button size="small" type="info" @click="loginHandler">确认</van-button>
            </van-row>
          </div>  
        </div>
      </van-overlay>
      <div style="text-align:center;padding:1em" >
       <van-button plain type="default" size="small" @click="show = true">登录</van-button>
       <!-- 注册 -->
       <div class="register">
         <span>尚未注册，</span>
         <span style="color:green" @click="registerHandler"> 请先注册</span>
       </div>
       <!-- /注册 -->
      </div>
    </div>
    <!-- /登录模态框 -->
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import Vue from 'vue';
import { Overlay } from 'vant';
import { Toast } from 'vant';

Vue.use(Overlay);
export default {
  data(){
    return {
      show: false,
      form:{
        type:'customer'
      }
    }
  },
  methods:{
    ...mapActions("user",["login"]),
    // 注册
    registerHandler(){
      this.$router.push({path:'./register'})
    },
    // 关闭模态框
    cancelHandler(){
      this.show = false
    },
    // 登录
    loginHandler(){
      this.show = false
      this.login(this.form)
      .then(()=>{
        //跳转到首页
        this.$router.push({path:'/manager/home'})
      })
    }
  }
}
</script>
<style scoped>
.register {
  margin: 1em;
  font-size: 12px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  /* height: 200px; */
  background-color: #fff;
}
/* 最外层div，占满容器 */
.login {
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  overflow: hidden;
}
/* 行内块元素，所以可以设置宽高，100%是相对于父元素，也就是.login，所以也是占满容器 */
img{
  display: inline-block;
  height: 100%;
  width: 100%;
}
.form{
  position:absolute;
  top:60%;
  width: 100%;
}
.header {
  padding-top: 60px;
  position: absolute;
  top: 10%;
  left: 10%;
  margin: 0 auto;
  text-align: center
}
.header .logo i{
  font-size: 48px;
  font-size: 48px;
}
.header .logo {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  margin: 0 auto;
  font-weight: bold;
  margin-bottom: 1em;
  font-size: 1.5em
}
.header .title .one{
  text-align: center;
  font-size: 48px;
  color: #DA6B2F;
  font-family:  FZShuTi,STXinwei,',Times New Roman', Times, serif;
}
.header .title {
  font-size: 32px;
  text-align: center;
}
</style>