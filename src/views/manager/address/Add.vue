<template>
    <briup-fullpagelayout title="新增地址" @back="backHandler">
        <div>
            <!-- {{form}} -->
            <!-- <van-field label="顾客" v-model="form.customerId" placeholder="姓名"></van-field> -->
            <van-field label="电话" v-model="form.telephone" placeholder="手机号码"></van-field>
            <van-field label="地区" v-model="form.addrecc" @click="showPopup" placeholder="请选择" is-link></van-field>
            <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
                <van-area :area-list="areaList" value="110101" ref="myArea" @confirm="onConfirm" @cancel="onCancel"/>
            </van-popup>
            <!-- <van-field label="地址" v-model="form.province" placeholder="请输入省"></van-field> -->
            <!-- <van-field v-model="form.city" placeholder="请输入市"></van-field>
            <van-field v-model="form.area" placeholder="请输入区"></van-field> -->
            <van-field label="详细地址" v-model="form.address" placeholder="请输入详细地址"></van-field>
            <van-button type='primary' block @click="submitHandler">保存</van-button>
        </div>
    </briup-fullpagelayout>
</template>

<script>
import Vue from 'vue';
import { Area } from 'vant';
Vue.use(Area);
import areaList from '../../../assets/areaList'
import {mapState} from 'vuex'
import {get,post} from '../../../http/axios'
export default {
    data(){
        return{
            show: false,
            form:{},
            areaList,
        }
    },
    computed:{
        ...mapState('user',['info'])
    },
    methods:{
        // 新增地址
        addAddressHandler(){
            this.$router.push({path:'/manager/address_add'})
        },
        //确定选择城市
        onConfirm(val){
            this.form.province = val[0].name
            this.form.city = val[1].name
            this.form.area = val[2].name
            this.show = false//关闭弹框
            this.form.addrecc = val[0].name + " " + val[1].name + " "  + val[2].name
        },
        //取消选中城市
        onCancel(){
            this.show = false
            this.$refs.myArea.reset()// 重置城市列表
        },
        // 展示地址
        showPopup() {
            this.show = true;
        },
        backHandler(){
            this.$router.push({path:'./address'})
        },
        submitHandler(){
            this.form.customerId = this.info.id
            post('/address/saveOrUpdate',this.form).then((res)=>{
                this.$router.push({path:'./address'})
                this.$toast.success(res)
            })
        }
    },
    created(){

    }
}
</script>