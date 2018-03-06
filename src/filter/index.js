/**
 * Created by WB on 2018/3/5.
 */
import Vue from 'vue'
import handle_fun from '../handle_fun/index'

Vue.filter('format_date', function (v1, data1) {
  const date = new Date(v1);
  return handle_fun.formatDate(date, data1);
});
