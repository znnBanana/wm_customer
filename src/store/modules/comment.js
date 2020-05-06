import {get, post} from '../../http/axios'
export default {
    namespaced:true,
    state: {
       comments:[],
       commentBycus:[]
    },
    mutations: {
        refreshComment(state,comments){
            state.comments = comments
        },
        refreshCommentBycus(state,commentBycus){
            state.commentBycus = commentBycus
        }
    },
    actions: {
        // 删除评论
        async deleteComments({dispatch,rootState},id){
            let response = await get('/comment/deleteById',id)
            dispatch('findAllCommentsBycus',rootState.user.info.id)
        },
        // 保存评论
        async SaveComment({dispatch},params){
            let response = await post('/comment/saveOrUpdate',params)
            dispatch('refreshComment')
            return response
        },
        // 分页查询评论
        async QueryComment({commit},params){
            let response = await post('/comment/query',params)
            commit('refreshComment',response.data)
            return response
        },
        // 根据顾客id查询评论
        async findAllCommentsBycus({commit},cusId){
            let response = await get('/comment/findCommentByCus?cusId=' + cusId)
            response.data.list.forEach((item)=>{
                var obj = {
                    id:item.orderId
                }
                get('/order/findById',obj).then((res)=>{
                    // console.log(res.data.orderLines,'.....')
                    item.order_first_img = res.data.orderLines[0].product.photo
                    item.order_first_name = res.data.orderLines[0].product.name
                    item.order_first_id = res.data.orderLines[0].product.id
                    get('/product/findById?id='+item.order_first_id).then((resp)=>{
                        item.category_name = resp.data.category.name
                    })
                })
            })
            commit('refreshCommentBycus',response.data)
        }
    }
}