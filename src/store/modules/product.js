import {get,post_json,post} from '../../http/axios'
export default {
    namespaced: true,
    state: {
        products: [],
        // 根据栏目id查产品
        products_ById: [],
        productInfo: []
    },
    getters: {
        productCustomerFilter(state){
            return(categoryId)=>{
                return state.products.filter(item=>item.categoryId == categoryId)
            }
        }
    },
    mutations: {
        refreshProducts(state,products){
            state.products = products
        },
        // 根据栏目id查产品
        refreshProductsById(state,products_ById){
            state.products_ById = products_ById
        },
        // 根据产品id查产品
        refreshProductInfoById(state,productInfo){
            state.productInfo = productInfo
        }
    },
    actions: {
        // 根据产品id查询产品信息
        // async findProductInfoById({commit},id){
        //     let response = await get('/product/findById',id)
        //     commit('refreshProductInfoById',response.data)
        // },
        // 根据品类id查询所有产品
        async findProductsById({commit},id){
            let response = await get('/product/findByCategoryId',id)
            response.data.forEach((item)=>{
                item.number = 0
            })
            commit('refreshProductsById',response.data)
        },
        // 产品区域查询所有
        async findAllProducts({commit}){
            let response = await get('/product/findAll')
            // 为产品添加number属性
            commit('refreshProducts',response.data)
        },
        // 查找所有商品分类信息
        async QueryProducts({commit},params) {
            let response = await post('/product/query',params)
            // 为产品添加number属性
            // response.data.list.forEach(item=>{
            //     item.number = 0;
            // })
            // console.log('response',response)
            commit('refreshProducts',response.data.list)
        },
    }
}