import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './user'
import address from './address'
import product from './product'
import category from './category'
import order from './order'

export default new Vuex.Store({
  modules:{
    user,
    address,
    product,
    category,
    order,
  }
})
