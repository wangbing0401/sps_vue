/**
 * Created by WB on 2018/3/2.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import app_all from './modules/app_all'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    app_all
  }
})
