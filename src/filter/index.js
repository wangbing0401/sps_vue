/**
 * Created by WB on 2018/3/5.
 */
import Vue from 'vue'
import handle_fun from '../handle_fun/index'

Vue.filter('format_date', function (v1, data1) {
  const date = new Date(v1);
  return handle_fun.formatDate(date, data1);
})
Vue.filter('productStatus', function (text) {
  let state = "";
  switch (text){
    case 0:
      state = "保存";
      break;
    case 1:
      state = "已提交";
      break;
    case 2:
      state = "审核通过";
      break;
    case 3:
      state = "退回";
      break;
    case 4:
      state = "销售中";
      break;
    case 5:
      state = "上课中";
      break;
    case 6:
      state = "取消";
      break;
    case 7:
      state = "关闭";
      break;
    case 8:
      state = "合并和取消";
      break;
    case 9:
      state = "已立项";
      break;
  }
  return state;
})
