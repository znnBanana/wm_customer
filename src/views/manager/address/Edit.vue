<template>
    <briup-fullpagelayout title="编辑地址" @back="backHandler">
        <div class="address_edit" >
            <div class="edit">
                <!-- <van-field label="顾客" v-model="customerId"></van-field> -->
                <van-field label="电话" v-model="telephone"></van-field>
                <van-field label="地区" v-model="addresses" @click="showPopup" placeholder="请选择" is-link></van-field>
                <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
                    <van-area :area-list="areaList" @confirm="confirmHandler" @cancel="cancelHandler"/>
                </van-popup>
                <van-field label="详细地址" v-model="address" placeholder="请输入详细地址"></van-field>
                <van-button type='primary' block @click="submitHandler">确认</van-button>
            </div>
        </div>
    </briup-fullpagelayout>
</template>

<script>
import Vue from 'vue';
import { Area } from 'vant';
Vue.use(Area);
import areaList from '../../../assets/areaList'
import {mapState,mapActions} from 'vuex'
import {get,post} from '../../../http/axios'
export default {
    data(){
        return{
            show: false,
            form:{},
            areaList,
            customerId: '',
            telephone: '',
            addresses: '',
            address: ''
        }
    },
    computed:{
        ...mapState('user',['info'])
    },
    created() {
        // 利用this.$router.query获取参数
        this.customerId = JSON.parse(this.$route.query.xpf).customerId
        this.telephone = JSON.parse(this.$route.query.xpf).telephone
        this.addresses = JSON.parse(this.$route.query.xpf).province + " "  + JSON.parse(this.$route.query.xpf).city + " " + JSON.parse(this.$route.query.xpf).area
        this.address = JSON.parse(this.$route.query.xpf).address
    },
    methods:{
        ...mapActions('address',['findAllAddresses','SaveOrUpdateAddress']),
        // 取消获取地址
        cancelHandler() {
            this.show = false
        },
        // 获取地址
        confirmHandler(val) {
            this.province = val[0].name
            this.city = val[1].name
            this.area = val[2].name
            this.show = false//关闭弹框
            this.addresses = val[0].name + " " + val[1].name + " "  + val[2].name
            // console.log('address',areaList)
        },
        // 展示地址
        showPopup() {
            this.show = true;
        },
        backHandler(){
            this.$router.push({path:'./address'})
        },
        submitHandler(){
            this.customerId = this.info.id
            let form = {
                id:JSON.parse(this.$route.query.xpf).id,
                customerId:this.customerId,
                telephone:this.telephone,
                province:this.province,
                city:this.city,
                area:this.area,
                address:this.address
            }
            console.log('form',form)
            this.SaveOrUpdateAddress(form)
            .then((res)=>{
                this.$router.push({path:'/manager/address'})
                this.$toast.success(res)
            })
        }
    },
}
</script>