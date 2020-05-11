<template>
    <div class="comment">
        <briup-fullpagelayout title="我的评论" @back="backHandler">
            <!-- 评价图片区域 -->
            <div class="title">
                <van-row>
                    <van-col offset="12" span="6">
                        <div class="title_cus">{{info.name}}</div>
                    </van-col>
                    <van-col span="6">
                        <div class="title_head"><img :src="cusInfo.imgPhoto" alt=""></div>
                    </van-col>
                </van-row>
            </div>

            <!-- 评价总数 -->
            <div class="comment_num">评价总数 {{commentBycus.total}}</div>
            <!-- {{cusInfo}} -->
            <!-- {{commentBycus.list}} -->
            <!-- 评论 -->
            <div class="comment_details">
                <van-row  v-for="cc in xpf.list" :key="cc.id">
                    <!-- {{cc}} -->
                    <van-col offset="1" span="4">
                        <img class="cus_img" :src="cusInfo.imgPhoto" alt="">
                    </van-col>
                    <van-col class="comment_right_outer" span="18">
                        <div class="comment_right">
                            <van-row>
                                <van-col span="10"><div class="comment_cus">{{info.name}}</div></van-col>
                                <van-col span="14"><div class="comment_time">{{cc.commentTime | datefmt}}</div></van-col>
                            </van-row>
                        </div>
                        <div class="comment_fei">{{cc.category_name}}<span></span> 飞毛腿专送 火速送达</div>
                        <div class="comment_img">
                            <van-row>
                                <van-col span="6">
                                    <img class="foot_img" :src="cc.order_first_img" alt="">
                                </van-col>
                                <van-col span="15">
                                    <div>{{cc.order_first_name}}</div>
                                    <div style="color:#333;margin-top:.5em">{{cc.content}}</div>
                                </van-col>
                            </van-row>
                        </div>
                        <van-row style="margin-top:.5em">
                            <van-col span="21">
                                <div class="comment_buss">{{cc.category_name}} <img class="buss_img" src="../../assets/heart.png" alt=""></div>
                            </van-col>
                            <van-col span="2">
                                <van-icon name="delete" @click="deteleHandler(cc.id)"/>
                            </van-col>
                        </van-row>
                        <div class="comment_line"></div>
                        <!-- {{productInfo}} -->
                    </van-col>
                </van-row>
            </div>
        </briup-fullpagelayout>        
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import Vue from 'vue';
import { Overlay } from 'vant';
import { Toast } from 'vant';

export default {
    inject:['reload'],
    data() {
        return {
            params:{
                page:0,
                pageSize:100
            },
            xpf:[]
        }
    },
    created() {
        this.params = {
            page:0,
            pageSize:100,
            cusId:this.info.id
        }
        this.QueryComment(this.params)

        this.findAllCommentsBycus(this.info.id)

        this.FindCustomerById(this.info.id)
    },
    mounted(){
        setTimeout(()=>{
            this.xpf = this.commentBycus
        },800)
    },
    computed: {
        ...mapState('comment',['comments','commentBycus']),
        ...mapState('user',['info','cusInfo']),
        ...mapState('order',['order_ById']),
    },
    methods: {
        ...mapActions('comment',['QueryComment','findAllCommentsBycus','SaveComment','deleteComments']),
        ...mapActions('user',['FindCustomerById']),
        ...mapActions('order',['findOrderById']),
        
        // 删除评论
        deteleHandler(id){
            this.deleteComments({id:id})
            .then(()=>{
                this.findAllCommentsBycus(this.info.id)
                this.reload();
                Toast('删除成功')
            })
        },
        backHandler() {
            this.$router.push({path:'./user'})
        }
    }
}
</script>

<style scoped>
    .comment_right_outer {
        margin-right: .5em;
    }
    .buss_img {
        width: 70px;
        height: 14px;
    }
    .comment_time {
        color: #888;
    }
    .comment_line {
        height: 10px;
        border-bottom: 1px solid #f1f1f1;
    }
    .comment_img {
        padding: .5em;
        background: #f1f1f1;
    }
    .foot_img {
        width: 50px;
        height: 50px;
    }
    .comment_fei {
        color: #333;
        margin: .5em 0;
    }
    .comment_right .comment_cus {
        color: #537592;
        font-size: 18px !important;
    }
    .comment_details {
        padding-top: 1em;
    }
    .cus_img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .comment_num {
        padding: 1em 0 1em 2em;
        font-size: 16px;
        font-weight: bolder;
        border-bottom: 1px solid #f1f1f1;
    }
    .title {
        padding: 6em 0 2em 0;
        background-image: url('../../assets/comment.png');
    }
    .title_head img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    .title_cus {
        line-height: 60px;
        color: #555;
        font-size: 18px !important;
    }
</style>