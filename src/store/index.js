import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import register from './modules/register'
import category from './modules/category'
import product from './modules/product'
import address from './modules/address'
import shopcar from './modules/shopcar'
import comment from './modules/comment'
import recharge from './modules/recharge'
import order from './modules/order'

export default new Vuex.Store({
  modules:{
    user,
    register,
    category,
    product,
    address,
    shopcar,
    comment,
    recharge,
    order
  }
})
