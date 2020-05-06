<template>
    <div class="address_list">
        <briup-fullpagelayout title="地址列表" @back="backHandler">
            <briup-addresslist :data='address' v-for="address in conformAddresses" :key="address.id">

            </briup-addresslist>
            <!-- 新增地址 -->
            <div class="add_btn">
                <van-button type="info" block @click="addAddressHandler()">新增地址</van-button>
            </div>
        </briup-fullpagelayout>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import { Toast } from 'vant';
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState('address',['conformAddresses'])
    },
    created() {
        // 查找地址
        this.findAllAddresses();
    },
    methods: {
        ...mapActions('address',['findAllAddresses']),
        // 回退
        backHandler(){
            this.$router.push({path:'/manager/user'});
        },
        // 新增地址
        addAddressHandler(){
            this.$router.push({path:'/manager/address_add'})
        }
    }
}
</script>

<style scoped>
    .address_list {
        background: #f1f1f1;
        height: 100%;
    }
</style>