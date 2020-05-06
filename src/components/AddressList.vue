<template>
  <div class="address_item">
    <van-row >
      <!-- {{addresses}} -->
      <van-col :span="2"></van-col>
      <van-col :span="18" >
        <div class="address_pc">{{data.province}} {{data.city}} {{data.area}}</div>
        <div class="address_de">{{data.address}}</div>
        <div class="cust_info">
            <span>{{info.name}}</span>
            <span>{{data.telephone}}</span>
        </div>
      </van-col>
      <van-col :span="4" class="option">
          <i class="iconfont icon-bianji" style="color:#07c160" @click="editAddressHandler(data)"></i>
          <i class="iconfont icon-shanchu" style="color:#ec2126" @click="deleteAddressHandler(data)"></i>
        <!-- <van-icon  name="edit" size="larger" /> -->
        <!-- <van-icon @click="deleteAddressHandler()" name="delete" size="larger" /> -->
      </van-col>
      <!-- {{data}} -->
    </van-row>
    <!-- {{info}} -->
  </div>
</template>
<script>
import { Dialog } from 'vant';
import {mapState,mapActions} from 'vuex'

export default {
  props:['data'],
  computed: {
    ...mapState('address',['addresses']),
    ...mapState('user',['info'])
  },
  created() {

  },
  methods: {
    ...mapActions('address',['deleteAddressById']),
    // 修改地址
    editAddressHandler(data) {
        var xpf = JSON.stringify(data)
        this.$router.push({path:'/manager/address_edit',query:{xpf}})
    },
    // 删除地址
    deleteAddressHandler(){
      // alert("是否删除该地址")
      Dialog.confirm({
        message: '是否删除该地址？'
      }).then(() => {
        // 调用方法，删除地址
        this.deleteAddressById(this.data.id)
      }).catch(() => {
        // on cancel
      });
    },
  }
}
</script>
<style scoped>
    .van-row {
        padding: .8em 0;
        border-bottom: 1px solid #f1f1f1;
        background: #fff;
    }
    .address_pc {
        font-size: 16px;
        font-weight: bold;
    }
    .address_de {
        color: #333;
    }
    .cust_info {
        color: #888;
        padding-top: .5em;
    }
    .cust_info span:first-child {
        margin-right: 1em;
    }
    .option .iconfont {
        font-size: 16px;
        line-height: 2.5em;
        color: #888;
        margin-right: .5em
    }
</style>