<template>
  <div class="order">
    <van-nav-bar title="我的订单" />
    <van-tabs v-model="active" color="#1659a0">
      <van-tab title="全部">
        <briup-order-item
          v-for='order in orders' 
          :key="order.id"  
          :data='order'>
        </briup-order-item>
      </van-tab>
      <van-tab title="待支付" id="warnInfo1">
        <briup-order-item 
          v-for="order in ordersStatusFilter('待支付')"
          :key="order.id"  
          :data='order'>
        </briup-order-item>
      </van-tab>
      <van-tab title="待派单" id="warnInfo2">
        <briup-order-item 
          v-for="order in ordersStatusFilter('待派单')"
          :key="order.id"  
          :data='order'>
        </briup-order-item>
      </van-tab>
      <van-tab title="待接单" id="warnInfo3">
        <briup-order-item 
          v-for="order in ordersStatusFilter('待接单')"
          :key="order.id"  
          :data='order'>
        </briup-order-item>
      </van-tab> 
      <van-tab title="待服务" id="warnInfo4">
        <briup-order-item 
          v-for="order in ordersStatusFilter('待服务')"
          :key="order.id"  
          :data='order'>
        </briup-order-item>
      </van-tab> 
      <van-tab title="待确认" id="warnInfo5">
        <briup-order-item 
          v-for="order in ordersStatusFilter('待确认')"
          :key="order.id"  
          :data='order'>
        </briup-order-item>
      </van-tab> 
      <van-tab title="已完成">
        <briup-order-item 
          v-for="order in ordersStatusFilter('已完成')"
          :key="order.id"  
          :data='order'>
        </briup-order-item>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'

export default {
  data(){
    return {
      active:0,
    }
  },
  computed: {
    ...mapState('order',['orders']),
    ...mapGetters('order',['ordersStatusFilter'])
  },
  created() {
    this.findAllOrders()
  },
  mounted() {
    this.findAllOrders()
    // if(this.ordersStatusFilter('待支付').length == 0){
    //   let warnInfo = document.getElementById('warnInfo1')
    //   warnInfo.innerHTML = '暂无 待支付订单~'
    //   warnInfo.style.marginTop = '5em'
    //   warnInfo.style.marginLeft = '10em'
    //   warnInfo.style.marginBottom = '5em'
    // }
    // if(this.ordersStatusFilter('待派单').length == 0){
    //   let warnInfo = document.getElementById('warnInfo2')
    //   warnInfo.innerHTML = '暂无 待派订单~'
    //   warnInfo.style.marginTop = '5em'
    //   warnInfo.style.marginLeft = '10em'
    //   warnInfo.style.marginBottom = '5em'
    // }
    // if(this.ordersStatusFilter('待接单').length == 0){
    //   let warnInfo = document.getElementById('warnInfo3')
    //   warnInfo.innerHTML = '暂无 待接订单~'
    //   warnInfo.style.marginTop = '5em'
    //   warnInfo.style.marginLeft = '10em'
    //   warnInfo.style.marginBottom = '5em'
    // }
    // if(this.ordersStatusFilter('待服务').length == 0){
    //   let warnInfo = document.getElementById('warnInfo4')
    //   warnInfo.innerHTML = '暂无 待配送订单~'
    //   warnInfo.style.marginTop = '5em'
    //   warnInfo.style.marginLeft = '10em'
    //   warnInfo.style.marginBottom = '5em'
    // } else {
    //   let warnInfo = document.getElementById('warnInfo4')
    //   warnInfo.innerHTML = ''
    //   warnInfo.style = 'none'
    //   // warnInfo.style.marginTop = '0'
    //   // warnInfo.style.marginLeft = '0'
    //   // warnInfo.style.marginBottom = '0'
    // }
    // if(this.ordersStatusFilter('待确认').length == 0){
    //   let warnInfo = document.getElementById('warnInfo5')
    //   warnInfo.innerHTML = '暂无 待确认订单~'
    //   warnInfo.style.marginTop = '5em'
    //   warnInfo.style.marginLeft = '10em'
    //   warnInfo.style.marginBottom = '5em'
    // }
  },
  methods: {
    ...mapActions('order',['findAllOrders']),
    change(evt,hidden){
      if(hidden === false){
        this.findAllOrders()
        // console.log(hidden,'====')
      }
    }
  }
}
</script>
<style scoped>
.order {
  background: #f1f1f1;
  padding-bottom: .2em;
}
</style>