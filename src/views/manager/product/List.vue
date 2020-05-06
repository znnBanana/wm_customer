<template>
    <div class="product_list">
        <briup-fullpagelayout title="产品列表" @back="backHandler">
            <!-- 顶部宣传 -->
            <div class="propaganda">
                <div class="slogan">
                    <div class="slogan_title">飞毛腿 外卖 飞一般的速度</div>
                    <div class="slogan_det">
                        <ul>
                            <li><i class="iconfont icon-zhunshipeisong"></i> 配送约30分钟</li>
                            <li><i class="iconfont icon-canpinhuizhunshisongda"></i> 准时宝</li>
                            <li><i class="iconfont icon-zhangguiguanjia"></i> 热情掌柜</li>
                        </ul>
                    </div>
                    <van-notice-bar text="飞毛腿 祝大家心想事成，万事如意" left-icon="volume-o" />
                </div>
            </div>
            <van-row class="product_content">
                <!-- {{c_categories}} -->
                <!-- 左侧标签 -->
                <van-col span="6">
                    <van-sidebar v-model="activeKey">
                        <van-sidebar-item :title="cc.name" v-for="cc in c_categories" @click="findProductsById({id:cc.id})" :key="cc.id" />
                    </van-sidebar>
                </van-col>
                <!-- 右侧内容 -->
                <van-col span="18">
                    <div class="product_title">
                        <div class="meishi"><i class="iconfont icon-changyongtubiao-mianxing-"></i> 美食</div>
                        <div>掌柜推荐</div>
                    </div>
                    <div class="product_det">
                        <!-- {{productCustomerFilter(categorgId)}} -->
                        <!-- {{products}} -->
                        <div class="product_block">
                            <van-row v-for="p in products_ById" :key="p.id" :data="p">
                                <van-col span="8">
                                    <img :src="p.photo" alt="">
                                </van-col>
                                <van-col span="16">
                                    <div class="block_title">{{p.name}}</div>
                                    <div class="block_des">{{p.description}}</div>
                                    <div class="block_price">￥{{p.price}}</div>
                                    <div style="float:right;margin-right:1em"> 
                                        <van-stepper 
                                            v-model="p.number"
                                            :min="0"  
                                            @change='numberChangeHandler(p)'/> 
                                    </div>
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                </van-col>
            </van-row>
            <!-- 底部下单区域 -->
            <van-row class="car">
                <van-col :span="6">总额<strong>￥{{total}}</strong></van-col>
                <van-col 
                :offset="12" 
                :span="6" 
                @click="toConfirmOrderHandler">立即下单</van-col>
            </van-row>
        </briup-fullpagelayout>
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
export default {
    data() {
        return {
            activeKey: 0,
            categoryId: '',
            obj: ''
        }
    },
    computed: {
        ...mapState('category',['categories','c_categories']),
        ...mapState('product',['products','products_ById']),
        ...mapGetters('product',['productCustomerFilter']),
        ...mapGetters('shopcar',['total'])
    },
    created() {
        // 查询树品类
        this.findCategoriesTree(this.$route.query.activeKey)
        // 查询所有产品
        this.QueryProducts({page:0,pageSize:100})
        // this.categoryId = this.$route.query.id;
        // this.activeKey = this.$route.query.activeKey
    },
    mounted(){
        setTimeout(()=>{
            // 根据栏目id查产品
            this.findProductsById({id:this.c_categories[0].id})
        },1000)
    },
    methods: {
        ...mapActions('category',['findCategoriesTree']),
        ...mapActions('product',['QueryProducts','findProductsById']),
        ...mapMutations('shopcar',['addShopcar']),
        // 确认订单
        toConfirmOrderHandler() {
            this.$router.push({path:'./order_conform'})
        },
        // 加购数量改变
        numberChangeHandler(val) {
            let orderLine = {
                productId:val.id,
                productName:val.name,
                price:val.price,
                number:val.number
            }
            // console.log('val',val)
            // console.log('orderLine',orderLine)
            this.addShopcar(orderLine)
        },
        // 返回
        backHandler() {
            this.$router.push({path:'./home'})
        }
    }
}
</script>

<style scoped>
    /* 底部金额 */
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
    .product_content {
        position: sticky;
        top: 100px;
    }
    .block_price {
        color: #f65046;
        font-size: 20px;
        /* font-weight: bolder; */
    }
    .block_des {
        color: #333;
        padding: .5em 0;
    }
    .block_title {
        font-size: 17px;
        font-weight: bolder;
    }
    .product_block img {
        width: 80px;
        height: 80px;
        border-radius: 10px;
    }
    .product_det {
        padding: .5em;
        /* background: #f1f1f1; */
    }
    .product_title {
        display: flex;
        padding: .5em 0 .5em .5em;
        background: #fec846;
        border-radius: 8px;
        border-bottom-right-radius: 15px;
        margin: .5em 4em 0 0;
    }
    .product_title .icon-changyongtubiao-mianxing- {
        color: #ff4538;
    }
    .product_title div:first-child {
        background: #333;
        color: #fec846;
        font-size: 16px;
        padding: .2em .5em;
        border-radius: 3px;
    }
    .product_title div:last-child {
        margin-left: 1em;
        font-size: 18px;
        color: #946e11;
    }
    .slogan_det i {
        color: #fc9e0a;
    }
    .slogan_det ul li {
        float: left;
        padding-right: .5em;
        border-right: 1px solid #f1f1f1;
        margin: .4em;
    }
    .slogan_det ul {
        display: block;
        content: "";
        clear: both;
    }
    .propaganda {
        background-image: url('../../../assets/timg.jpeg');
    }
    .slogan {
        width: 90%;
        height: 93px;
        margin: 0 auto;
        padding-top: 4em;
    }
    .slogan_title {
        font-size: 18px;
        font-weight: bolder;
        background: #fff;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        padding: .5em 0 .2em .5em;
    }
    .slogan_det {
        background: #fff;
        height: 32px;
        color: #444;
    }
    .van-notice-bar {
        height: 26px;
    }
</style>