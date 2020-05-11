<template>
  <div class="order_item">
    <!-- {{orderLines}} -->
    <!-- {{categories}} -->
    <!-- {{data}} -->
    <van-row style="margin-bottom:1em;border-bottom:1px solid #f1f1f1;padding-bottom:1em">
      <van-col span="5">
        <div class="order_img"><img src="../assets/wm_logo.jpeg" alt=""></div>
      </van-col>
      <van-col span="14">
        <div class="order_name">飞毛腿 外卖 </div>
        <div class="order_time">{{data.orderTime | datefmt}}</div>
      </van-col>
      <van-col class="status" span="4">{{data.status}}</van-col>
      <van-row>
        <van-col offset="5" span="15" v-for="ol in data.orderLines" :key="ol.id">
          <div class="order_text">{{ol.product.name}} 等1件</div>
          <div class="order_address">{{data.address.province}} {{data.address.city}} {{data.address.area}} {{data.address.address}}</div>
        </van-col>
      <van-col span="4"><div class="order_price">￥{{data.total}}</div></van-col>
    </van-row>
    <div class="order_btns">
      <van-row>
        <van-button plain hairline size="small" type="primary" v-if="data.status == '已完成'" @click="CommentHandler">评价</van-button>
        <van-button plain hairline size="small" type="info" @click="ConfirmHandler" v-if="data.status == '待确认'">确认收货</van-button>
        <van-button plain hairline size="small" type="warning" v-if="data.status == '待支付'" @click="PaymoneyHandler">确认支付</van-button>
      </van-row>
    </div>
    </van-row>
    <!-- 模态框 -->
    <van-popup v-model="show" style="width:20em">
      <!-- {{info}} -->
        <!-- 获取当前订单号以及顾客编号 -->
        <van-field v-model="cusId" label="顾客编号："/>
        <van-field v-model="orderId" label="订单编号：" />
        <!-- {{content}} -->
        <van-field v-model="content"
            rows="4"
            autosize
            type="textarea"
            label="评论内容" 
            maxlength="200"
            show-word-limit
            placeholder="请输入评论内容" />
        <van-cell-group>
            <van-button 
                style="margin:1em 2em"
                type="info" 
                size="small" 
                @click="saveCommentHandler()">确认
            </van-button>
        </van-cell-group>
    </van-popup>
    <!-- /模态框 -->
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data() {
    return {
      show: false,
      content:'',
      cusId:'',
      orderId:''
    }
  },
  props:{
    data:{type:Object}
  },
  computed:{
    ...mapState('address',['addresses']),
    ...mapState('user',['info','cusInfo']),
    ...mapState('shopcar',['orderLines']),
    ...mapState('category',['categories']),
    ...mapState('order',['orders']),
    ...mapState('comment',['comments']),
  },
  created() {
    // 根据顾客id查订单
    this.findAllOrders(this.info.id)
    this.FindCustomerById(this.info.id)
    this.findCategoriesTree()

    this.cusId = this.info.id
    this.orderId = this.data.id
  },
  methods: {
    ...mapActions('category',['findCategoriesTree']),
    ...mapActions('user',['FindCustomerById']),
    ...mapActions('order',['ConfirmOrder','findAllOrders','payHandler']),
    ...mapActions('comment',['QueryComment','SaveComment']),
    // 添加评论
    saveCommentHandler(){
        this.show = false;
        Toast('完成评价')
        let form = {
            cusId:this.cusId,
            orderId:this.orderId,
            content:this.content
        }
        console.log(form)
        this.SaveComment(form)
        .then(()=>{
          this.findAllOrders(this.info.id)
        })
    },
    // 确认支付
    PaymoneyHandler(){    
      // console.log('total',this.data.total)
      if(this.data.total <= this.cusInfo.money){
        var orderid = this.data.id
        var customer_id = this.info.id
        var order_money = this.data.total
        this.payHandler({orderid,customer_id,order_money})
        // .then((response)=>{
        //   console.log(response)
          
        // })
        setTimeout(()=>{
          Toast('已支付完成，请等待派单')
          this.findAllOrders()
        },1500)
      }else{
        Toast('余额不足,请充值')
      }
      // let url = 'http://134.175.100.63:5588/order/paymoney?orderid='+orderid+'&customer_id='+customer_id+'&order_name=%E8%A3%A4%E5%AD%90&order_money='+order_money+'&description=%E5%B9%B2%E5%87%80'
      // console.log(document.hidden,'===')
      // window.open(url,'_blank')
      // this.findAllOrders()
    },
    // 确认订单
    ConfirmHandler(){
      var orderid = this.data.id
      // 确认订单（为员工分配佣金）
      this.ConfirmOrder(orderid)
    },
    // 展示评论
    CommentHandler(){
      this.show = true;
    }
  }
}
</script>
<style scoped>
.order_btns .van-button{
  margin: .5em .5em 0 0;
  float: right;
}
.order_address {
  color: #777;
}
.order_price {
  border-top: 1px solid #f1f1f1;
  padding: .8em 0;
}
.order_text {
  border-top: 1px solid #f1f1f1;
  padding: .8em 0 .5em 0;
  color: #333;
}
.order_time {
  padding-bottom: .8em;
  color: #555;
}
.order_img img {
  width: 40px;
  height: 40px;
}
.order_name {
  font-size: 15px;
  font-weight: bolder;
}
.order_item {
  margin: .5em 1em;
  padding: .5em;
  border-radius: 5px;
  background: #ffffff;
  display: block;
  content: "";
  clear: both;
}
.order_item .header {
  line-height: 2.5em;
  font-size: 14px;
}
.order_item .status {
  text-align: right;
  font-size: 12px;
  color: #fd621f;
}

</style>