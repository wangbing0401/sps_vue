/**
 * Created by WB on 2018/3/5.
 */
import Vue from 'vue'

Vue.filter('format_date', function (v1, data1) {
  const date = new Date(v1);
  console.log(data1)
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const hour = date.getHours();
  const minu = date.getMinutes();
  return year+'-'+month+'-'+day+' '+hour+':'+minu;
});
