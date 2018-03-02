/**
 * Created by WB on 2018/3/2.
 */
import * as types from '../types'

const state = {
  alert_show: false,
  alert_text:null
}

const actions = {
  alert_handle_show ({commit}, value){
    commit(types.ALERT_SHOW, value)
  }
}

const mutations = {
  [types.ALERT_SHOW](state, value){
    state.alert_text = value;
    state.alert_show = true;
    let time = setTimeout(function () {
      state.alert_show = false;
      clearTimeout(time);
    }, 1000);
  }
}

export default {
  state,
  actions,
  mutations
}
