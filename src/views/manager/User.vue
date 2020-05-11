<template>
  <div class="user">
    <!-- 标题 -->
    <van-nav-bar title="我的"/>
    <!-- /标题 -->
    <!-- 用户信息 -->
    <!-- {{cusInfo}} -->
    <div class="header">
      <van-row>
        <van-col :span="16">
          <div class="name">{{info.name}}</div>
          <div style="color:#bbb">{{cusInfo.realname}}，再忙也要记得吃饭呦~</div>
        </van-col>
        <van-col :span="6">
          <div class="photo">
            <img :src="cusInfo.imgPhoto" alt=""/>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- /用户信息 -->

    <!-- 余额 -->
    <div class="card_money" style="float:left">
      <div style="font-size:24px;">余额</div>
      <div style="color:red;font-size:16px">￥{{cusInfo.money}}</div>
    </div>
    <div class="card_money recharge" @click="toRechargeHandler">
      <div style="font-size:24px" @click="toRechargeHandler">充值</div>
      <div style="color:#bbb;font-size:16px">银行卡</div>
    </div>
    <!-- /余额 -->

    <!-- 账户余额 -->
    <!-- <van-cell icon="balance-o" title="账户余额" value="189" is-link to="money" /> -->
    <!-- /账户余额 -->

    <!-- 常用地址 -->
    <van-cell icon="location-o" title="常用地址" is-link to="address" />
    <!-- /常用地址 -->

    <!-- 我的评价 -->
    <van-cell icon="star-o" title="我的评论" is-link @click="toCommentHandler" />
    <!-- /我的评价 -->
    
    <!-- 联系我们 -->
    <van-cell icon="phone-o" title="联系客服" @click="show = true" />
    <van-overlay :show="show" @click="show = false"  >
      <div class="wrapper" @click.stop>
        <div class="block">
          <van-cell title="联系客服" size="large" >
          <van-icon
            @click="closeModal()"
            slot="right-icon"
            name="cross"
            style="line-height: inherit;" />
          </van-cell>
          <van-cell title="0471-1234-888" />
        </div>
      </div>
    </van-overlay>
    <!-- /联系我们 -->

    <div class="btn" @click="logoutHandler">
      退出
    </div>
    <!-- {{cusInfo}} -->
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {
      show: false
    }
  },
  methods:{
    ...mapActions('user',['logout','FindCustomerById']),
    // 关闭模态框
    closeModal(){
      this.show = false
    },
    // 评论
    toCommentHandler(){
      this.$router.push({path:'./comment'})
    },
    // 充值
    toRechargeHandler(){
      // alert('充值')
      this.$router.push({path:'./recharge'})
    },
    toAddressHandler(){
      // this.$router.push({path:'/manager/address'})
    },
    logoutHandler(){
      this.logout()
      .then(()=>{
        this.$router.push({path:'/login'})
      })
    }
  },
  created(){
    this.FindCustomerById(this.info.id)
  },
  computed:{
    ...mapState("user",["info",'cusInfo'])
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 240px;
  height: 120px;
  background-color: #fff;
}
.recharge {
  float: right;
}
.card_money div {
  text-align: center;
}
.card_money {
  padding: .5em;
  width: 36%;
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #bbb;
  margin: 1em;
  margin-bottom: 2em;
}
.header {
  padding-top: 40px;
  text-align: center;
  /* background: #1659a0; */
  margin-bottom: 2em;
}

.header .photo {
  margin: 0 auto;
  width: 8em;
  height: 8em;
  border-radius: 50%;
  box-sizing: border-box;
  border:1px solid #bbb;
  overflow:hidden;
  /* padding: 1em; */
}
.header .name {
  line-height: 3em;
  font-size: 28px;
  /* color: #ffffff; */

}
.header .photo img {
 width: 100%;
 border-radius: 50%;
}

.btn {
  background-color: #108ee9;
  width: 90%;
  margin: 2em auto;
  /* line-height: 3em; */
  text-align: center;
  /* border: 1px solid #ededsed; */
  padding: .5em;
  border-radius: 1.5em;
  font-size: 16px;
  font-weight: bold;
  color: #f1f1f1;
}

</style>