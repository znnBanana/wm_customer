<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="title">
      <van-row>
        <van-col span="2">
          <i class="iconfont icon-waimai2" style="color:'#279cff" @click="backHandler"></i>
        </van-col>
        <van-col :offset="6">
          <div class="title_wm">飞毛腿外卖</div>
        </van-col>
      </van-row>
    </div>
    <!-- /顶部导航栏 -->
    <!-- {{categories}} -->
    <!-- 品类区域 -->
    <div class="categoty_wm">
      <van-grid :column-num="4">
        <van-grid-item
          v-for="(c,index) in categories"
          :key="c.id"
          :icon="c.icon"
          :text="c.name"
          v-show="index < a"
          @click="toProductsHandler(c.id,index)"
        />
        <van-grid-item icon="setting-o" text="更多" @click="ShowCategoriesHandler(obj)" />
      </van-grid>
    </div>
    <!-- /品类区域 -->

    <!-- 轮播图区域 -->
    <header class="header">
      <van-swipe class="my-swipe" :height="260" :autoplay="2000" indicator-color="white">
        <van-swipe-item >
          <img src="../../assets/1轮播.png" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/2轮播.png" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/3轮播.png" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/4轮播.png" alt="">
        </van-swipe-item>
      </van-swipe>
    </header>
    <!-- /轮播图区域 -->
    <!-- 商品区域 -->
    <div class="product_det">
        <div class="product_block">
            <van-row v-for="(p,index) in products" :key="p.id" @click="toProductsHandler1(p.id,index)">
                <van-col span="8">
                    <img :src="p.photo" alt="">
                </van-col>
                <van-col span="16">
                    <div class="block_title">{{p.name}}</div>
                    <div class="block_des">{{p.description}}</div>
                    <div class="block_price">￥{{p.price}}</div>
                </van-col>
            </van-row>
        </div>
    </div>
    <!-- /商品区域 -->
    <!-- {{products}} -->
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
        a:7,
        obj:''
    }
  },
  computed: {
    ...mapState('category',['categories']),
    ...mapState('product',['products'])
  },
  created() {
    // 查询树品类
    this.findCategoriesTree()
    // 查询所有产品
    this.QueryProducts({page:0,pageSize:100})
  },
  methods: {
    ...mapActions('category',['findCategoriesTree']),
    ...mapActions('product',['QueryProducts']),
    // 栏目区域 页面跳转至商品分类，各个产品
    toProductsHandler(id,activeKey){
      this.$router.push({path:'/manager/product_list',query:{id,activeKey}})
    },
    toProductsHandler1(id,activeKey){
      this.$router.push({path:'/manager/product_list',query:{id:4195,activeKey:0}})
    },
    // 点击更多，产品列表
    ShowCategoriesHandler(){
      var obj = {
        id:this.categories[0].id,
        activeKey:0
      }
      this.$router.push({path:'/manager/product_list',query:obj})
    },
    backHandler(){
      this.$router.push({path:'/login'})
    }
  }
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 130px;
  text-align: center;
  /* background-color: #39a9ed; */
  overflow: hidden;
}
  /* 商品区域 */
  .product_content {
      position: sticky;
      top: 100px;
  }
  .block_price {
      color: #f65046;
      font-size: 20px;
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
  }
  /* 商品区域 */

.product_wm .van-card{
  margin: 10px;
  border-radius: 15px;
}
/* 栏目区域 */
.categoty_wm .van-grid-item {
  padding: .3em;
}
.title {
  background: #fff;
}
.title_wm {
  text-align: center;
  padding: .5em;
  font-size: 22px;
}
.title .iconfont{
  float: left;
  margin: .5em .5em 0 .5em;
  font-size: 28px;
}
.home {
  background: #f1f1f1;
}
/* 轮播图 */
.header {
  height: 90px;
  width:94%;
  margin: .5em auto;
  overflow: hidden;
  border-radius: 8px;
}
.header img {
  width: 100%;
}
</style>