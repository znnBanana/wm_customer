import {get,post_json,post} from '../../http/axios'
export default {
    namespaced: true,
    state: {
        // 父品类
        categories: [],
        // 商家
        c_categories: []
    },
    mutations: {
        refreshCategories(state,categories){
            state.categories = categories
        },
        refreshCategoriesChildren(state,c_categories){
            state.c_categories = c_categories
        }
    },
    actions: {
        // 查询树查询栏目品类
        async findCategoriesTree({commit},params){
            let response = await get('/category/findCategoryTree')
            commit('refreshCategories',response.data)
            var categories_son = [];
            response.data.forEach((item)=>{
                categories_son.push(item.children)
            })
            // console.log(categories_son[params])
            commit('refreshCategoriesChildren',categories_son[params])
        }
    }
}