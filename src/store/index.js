import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './user'
import address from './address'

export default new Vuex.Store({
  modules:{
    user,
    address

  }
})
