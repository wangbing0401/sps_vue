/**
 * Created by WB on 2018/3/5.
 */
const handle_fun = {
  verification_user_equipment: function () {
    let u = navigator.userAgent;
    return {//移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') > -1 //是否web应该程序，没有头部与底部
    };
  }(),
  panduan_url: function (l) {
    let has_child = false;
    let child_lenght = l.child.length;
    for (let i = 0; i < child_lenght; i++){
      if (l.child[i].url == $rootScope.router_name){
        has_child = true;
        break;
      }
    }
    return has_child;
  }
}

export default handle_fun;
