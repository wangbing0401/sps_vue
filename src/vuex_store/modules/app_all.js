/**
 * Created by WB on 2018/3/2.
 */
import * as types from '../types'

const state = {
  alert_show: false,
  alert_text:null,
  current_router:null,
  nav_url:[],
  school_list:[]
}

const actions = {
  alert_handle_show ({commit}, value){
    commit(types.ALERT_SHOW, value)
  },
  set_current_router ({commit}, value){
    commit(types.CURRENT_ROUTER, value)
  },
  set_nav_url ({commit}, value){
    commit(types.NAV_URL, value)
  },
  set_school_list ({commit}, value){
    commit(types.SCHOOL_LIST, value)
  }
}

const mutations = {
  [types.ALERT_SHOW](state, value){
    state.alert_text = value
    state.alert_show = true
    let time = setTimeout(function () {
      state.alert_show = false
      clearTimeout(time)
    }, 1000)
  },
  [types.CURRENT_ROUTER](state, value){
    state.current_router = value
  },
  [types.NAV_URL](state, value){
    state.nav_url = value
  },
  [types.SCHOOL_LIST](state, value){
    state.school_list = value
  }
}

export default {
  state,
  actions,
  mutations
}
