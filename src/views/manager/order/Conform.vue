<template>
    <briup-fullpagelayout title="确认订单" @back="backHandler">
        <!-- 地址 -->
        <!-- {{addresses}} -->
        <!-- {{cusInfo}} -->
        <!-- {{categories}} -->
        <div class="confirm_bg">
            <div class="confirm_address">
                <div class="confirm_address_outer">
                    <div class="confirm_address_title">
                        <van-row>
                            <van-col span="20">{{addresses.province}} {{addresses.city}} {{addresses.area}} {{addresses.address}}</van-col>
                            <van-col span="4" @click="selectAddressHandler"><van-icon name="arrow" /></van-col>
                        </van-row>
                    </div>
                    <div class="confirm_address_user">{{info.name}} {{cusInfo.telephone}}</div>
                    <div class="confirm_address_send">
                        <div>立即送出 > <span>飞毛腿外卖正在火速赶来</span></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 产品 -->
        <!-- {{orderLines.values()}} -->
        <!-- {{orderLines}} -->
        <!-- {{total}} -->
        <div class="confirm_pro_bg">
            <div class="confirm_pro">
                <div class="confirm_pro_title">飞毛腿 外卖</div>
                <div class="confirm_pro_list" v-for="line in orderLines.values()" :key="line.productId">
                    <van-row>
                        <van-col offset="1" span="4">
                            <div class="pro_list_img"><img src="../../../assets/wm_logo.jpeg" alt=""></div>
                        </van-col>
                        <div style="line-height: 40px">
                            <van-col span="13">
                                <div class="pro_list_name">{{line.productName}}</div>
                            </van-col>
                            <van-col span="2"><div class="pro_list_num">x 1</div></van-col>
                            <van-col offset="1" span="3"><div class="pro_list_price">￥ {{line.price}}</div></van-col>
                            </div>
                    </van-row>
                </div>
                <div class="all_price">
                    <van-row>
                        <van-col offset="1" span="20"><div>总价</div></van-col>
                        <van-col span="3"><div>￥ {{total}}</div></van-col>
                    </van-row>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <!-- 底部下单区域 -->
        <van-row class="car">
            <van-col :span="6">总额<strong>￥{{total}}</strong></van-col>
            <van-col 
            :offset="12" 
            :span="6" 
            @click="OrderConfirmHandler">确认订单</van-col>
        </van-row>
    </briup-fullpagelayout>
</template>

<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
import {get,post_obj_array} from '../../../http/axios'
export default {
    data(){
        return{
           myOrderLines:{}
        }
    },
    computed:{
        ...mapState('address',['addresses']),
        ...mapState('shopcar',['orderLines']),
        ...mapState('order',['orders']),
        ...mapGetters('shopcar',['total']),
        ...mapState('user',['info','cusInfo']),
        ...mapState('category',['categories'])
        
    },
    created(){
        this.findCategoriesTree()
        this.FindCustomerById(this.info.id)
        this.findAllAddresses()  
        this.findAllOrders()
        var vm = this
        if(this.$route.query.province != null){
            setTimeout(function(){
                vm.addresses.province = vm.$route.query.province
                vm.addresses.city = vm.$route.query.city
                vm.addresses.area = vm.$route.query.area
                vm.addresses.address = vm.$route.query.address
            },400)
        }
    },
    mounted(){
        // this.myOrderLines = Array.from(this.orderLines.values())[0] 
    },
    methods:{
        ...mapActions('category',['findCategoriesTree']),
        ...mapActions('address',['findAllAddresses']),
        ...mapActions('order',['SaveOrder','findAllOrders']),
        ...mapActions('user',['FindCustomerById']),
        ...mapMutations('shopcar',['addShopcar']),
        toConfirmOrderHandler() {
            this.$router.push({path:'./order'})
        },
        // 返回
        backHandler() {
            this.$router.push({path:'./product_list'})
        },
        // 选择服务地址
        selectAddressHandler(){
            this.$router.push({path:'/manager/confirm_address'})
        },
        // 确认订单
        OrderConfirmHandler(){
            // 保存订单信息
            // 如果没有获到id参数，即未更改地址id，则为默认第一个
            if(this.$route.query.id == null){
                var obj = {
                    addressId:this.addresses.id,
                    customerId:this.info.id,
                    orderLines:Array.from(this.orderLines.values())
                }
            }else{
                var obj = {
                    addressId:this.$route.query.id,
                    customerId:this.info.id,
                    orderLines:Array.from(this.orderLines.values())
                }
            }
            this.SaveOrder(obj)
            .then((response)=>{
                this.$notify({
                    type:'success',
                    message:response.statusText
                });
            })
            // 路由跳转至订单页面
            this.$router.push({path:'/manager/order'})
            .then((res)=>{
                this.findAllOrders()
            }) 
        }
    }
}
</script>

<style scoped>
    /* 底部 */
    .car {
        position: fixed;
        bottom: 0;
        line-height: 4em;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        color: #ffffff;
        text-align: center;
    }
    .car .van-col:last-child {
        background: #59d178;
    }
    /* 产品 */
    .confirm_pro_bg {
        background: #f1f1f1;
        padding: .5em 0;
    }
    .all_price {
        padding-top: .5em;
    }
    .confirm_pro_list {
        padding: .5em 0 1em 0;
        border-bottom: 1px solid #f1f1f1;
    }
    .confirm_pro_list .pro_list_img img {
        width: 40px;
        height: 40px;
    }
    .confirm_pro_title {
        padding: .8em;
        font-size: 16px;
        font-weight: bolder;
        border-bottom: 1px solid #f1f1f1;
    }
    .confirm_pro {
        width: 94%;
        margin: 0 auto;
        background: #fff;
    }
    /* 地址 */
    .confirm_address {
        width: 94%;
        margin: 1em auto;
    }
    .confirm_bg {
        height: 180px;
        padding-top:1em;
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#279cff), to(#fff)) !important;
    }
    .confirm_address_send {
        color: #fea040;
        padding-top: .5em;
    }
    .confirm_address_user {
        color: #444;
        font-size: 16px;
        padding: .5em 0 1em 0;
        border-bottom: 1px solid #f1f1f1;
    }
    .confirm_address_title {
        font-weight: bolder;
        font-size: 17px;
    }
    .confirm_address_outer {
        background: #fff;
        padding: 1em .5em;
        border-radius: 15px;
    }
    .full_page_layout {
        /* height: 240px; */
    }
    .van-tabbar-item {
        /* z-index: -1; */
        display: none;
    }
    .van-tabbar--fixed {
        /* z-index: -1; */
        /* display: none !important; */
        /* position: none !important; */
        top: 0 !important;
        bottom: 50em !important;
    }
</style>