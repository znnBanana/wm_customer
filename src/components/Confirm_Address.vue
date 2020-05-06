<template>
  <div class="confirm_address">
    <van-row >
      <!-- {{info}} -->
      <van-col :span="3">
        <van-icon name="location-o" style="padding-top:.3em" size="1.5em" />
      </van-col>
      <van-col :span="19" @click="onAddressHandler" >
        <div>
          {{info.name}}&nbsp; {{data.telephone}}
        </div>
        <div>
          {{data.province}} {{data.city}} {{data.area}} {{data.address}}
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
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
    // 选择地址
    onAddressHandler(){
      // console.log(this.data)
      this.$router.push({path:'/manager/order_conform',query:this.data})
    },
  }
}
</script>

<style scoped>
.confirm_address {
  margin: .5em 1em;
  padding: .5em;
  border-radius: 5px;
  background: #f1f1f1;
}
.confirm_address .option {
  text-align:center;
  line-height: 3em;
}
</style>