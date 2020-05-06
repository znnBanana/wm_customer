<template>
  <div class="register">
    <briup-fullpagelayout title="注册" @back="backHandler">
        <img src="../assets/register.jpeg" alt="">
        <!-- 手机号、验证码 -->
        <div class="register_t">
            <van-field left-icon="phone-o" v-model="telephone" label="手机号" placeholder="请输入手机号"/>
            <van-field left-icon="comment-circle-o" v-model="vcode" label="验证码" placeholder="请输入验证码">
                <van-button slot="button" size="small" type="info" @click="GainVcode">发送验证码</van-button>
            </van-field>
            <van-field left-icon="chat-o" v-model="password" center clearabl label="密码" placeholder="请输入密码"></van-field>
        </div>
        <!-- /手机号、验证码 -->
        <div class="register_btn" >
            <van-button type="info" round @click="backHandler" style="width:100%">完成注册</van-button>
        </div>
    </briup-fullpagelayout>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import Vue from 'vue';
import { Toast } from 'vant';

export default {
    data() {
    return {
        vcode: '',
        telephone: '',
        password: ''
    };
  },
  computed: {
      ...mapState('register',['vercode','cusregister'])
  },
  methods:{
    ...mapActions('register',['GetVerCode','CustomerRegister']),
    //  获取验证码
    GainVcode(){
        Toast('验证码已发送');
        this.GetVerCode({telephone:this.telephone})
    },
    // 返回登录页面
    backHandler(){
        this.params = {
            telephone:this.telephone,
            password:this.password,
            vcode:this.vcode
        }
        this.CustomerRegister(this.params)
        .then(()=>{
          Toast('注册完成，请登录')
          this.$router.push({path:'/login'})
        })
        this.$router.push({path:'/login'})
    }
  } 
}
</script>
<style scoped>
.register_btn {
    position: absolute;
    left: 0;
    top: 40%;
    width: 90%;
    text-align:center;
    padding:1em
}
.register_t {
    position: absolute;
    top: 10%;
    left: 0;
}
.register {
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    overflow: hidden;
}
img{
  position: absolute;
  bottom: 0;
  display: inline-block;
  height: 100%;
  width: 100%;
}
</style>