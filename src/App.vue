<template>
  <div id="app_main">
    <div v-show="router_name!='/login'&&router_name!='/system_main'">
      <div class="ambow_head">
        <div class="ambow_head_main">
          <div class="ambow_head_left" v-show="nav_url.length!=0">
            <div class="logo_name">设置公司名称</div>
          </div>
          <div class="ambow_head_left" style="margin-left: 50px;" v-show="nav_url.length==0&&router_name!='/crm_view_course_list'">
            <span class="headBackIcon" @click="goBack()"></span>
          </div>
          <div v-if="router_name!='/crm_view_course_list'&&router_name!='/crm_view_course_info'" class="ambow_head_right" @mouseenter="menu_show=true" @mouseleave="menu_show=false">
            <span class="userHeadImg icon_common defalt_head_img"></span>
            <span class="userName text_ellipsis" :title="userName">{{userName}}</span>
            <span class="headRightIcon"></span>
            <div class="headUserLayer" v-if="menu_show">
              <p>消息</p>
              <router-link :to="{path:'/password_change'}"><p>密码设置</p></router-link>
              <p>退出</p>
            </div>
          </div>
          <router-link v-if="router_name!='/crm_view_course_list'&&router_name!='/crm_view_course_info'" class="icon_common home_icon" :to="{path:'/system_main'}"></router-link>
        </div>
      </div>
      <div class="nav_url" v-if="nav_url.length!=0">
        <div class="ambow_head_left" v-show="nav_url.length!==0">
          <div class="schoolListBox" @mouseleave="schoolListIsShow=false">
            <div class="searchIcon" @click="schoolListIsShow=true"></div>
            <div class="schoolName">
              <span class="left_bg"></span>
              {{orgName}}
            </div>
            <ul class="schoolList" v-show="schoolListIsShow">
              <li class="schoolListItem" v-for="l in schoolList" @click="selectSchool(l)">{{l.orgName}}</li>
            </ul>
          </div>
        </div>
        <div class="nav_list">
          <div class="nav_item" v-for="(l, index) in nav_url" @mouseover="l.child.length!=0?navChildShow=true:''" @mouseleave="navChildShow=false" :style="index==(nav_url.length-1)?{marginRight:0}:{}">
            <router-link class="nav_content" :to="{path:l.url?l.url:'/productDefinitionList'}" :style="nav_bottom_fun(l)">{{l.name}}</router-link>
            <span class="nav_item_triangle" v-if="l.child.length!=0&&navChildShow"></span>
            <div class="nav_item_child" v-if="l.child.length!=0&&navChildShow">
              <router-link class="nav_item_child_line" v-for="r in l.child" :to="{path:r.url?r.url:'/productDefinitionList'}">{{r.name}}</router-link>
            </div>
          </div>
          <div class="crm_view_course" v-if="router_name=='/personCustormList'" @click="crm_view_course_list()">
            <i class="icon_common"></i>
            查看课程
          </div>
        </div>
      </div>
    </div>
    <alert :show="AlertShow"></alert>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Alert from './components/myself_alert/index'
import handle_fun from './handle_fun/index'
export default {
  components:{
    Alert
  },
  data(){
    return{
      menu_show:false,
      userName:null,
      schoolListIsShow:false,
      orgName:null,
      navChildShow:false
    }
  },
  methods:{
    goBack: function () {
      history.back()
    },
    selectSchool: function (l) {
      localStorage.orgName=l.orgName;
      localStorage.orgId=l.orgId;
      this.orgName=l.orgName;
      this.schoolListIsShow=false;
    },
    nav_bottom_fun: function (l) {
      let split_url = l.url.split('.');
      if (this.router_name.indexOf(split_url[0]) != -1){
        return {borderBottom:'#4679c7 solid 4px',color:'#4679c7'};
      }else if (handle_fun.panduan_url(l, this.router_name)){
        return {borderBottom:'#4679c7 solid 4px',color:'#4679c7'};
      }else{
        return {};
      }
    }
  },
  computed:{
    ...mapState({
      AlertShow:state => state.app_all.alert_show,
      router_name:state => state.app_all.current_router,
      nav_url:state => state.app_all.nav_url,
      schoolList:state => state.app_all.school_list
    })
  },
  mounted(){
    this.userName = localStorage.user_name
    this.orgName = localStorage.orgName
  }
}
</script>

<style lang="scss">
#app_main{
  position: absolute;
  top: 0px;
  left: 0;
  height: 100%;
  width: 100%;
  min-width: 1200px;
  background: #f6f7fb;
}
*{
  box-sizing: border-box;
  font-size: inherit;
  list-style: none;
  margin: 0; padding: 0;
  font-size: 14px;
}
.text_ellipsis{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.icon_common{
  display: inline-block;
  background-image: url("./assets/imgs/icon2.png");
  cursor: pointer;
}
.pd_td_checkbox_icon{
  display: block;
  width: 16px;
  height: 15px;
  margin:12px auto;
  background-image: url("./assets/imgs/icon.png");
  background-position: -47px -113px;
  cursor: pointer;
}
.pd_td_checkbox_checkicon{
  display: block;
  width: 18px;
  height: 18px;
  margin:12px auto;
  background-image: url("./assets/imgs/icon.png");
  background-position: -64px -112px;
  cursor: pointer;
}
.checkboxNormal{
  display: block;
  width: 15px;
  height: 17px;
  margin:0 auto;
  background-image: url("./assets/imgs/icon2.png");
  background-position: -272px -40px;
  cursor: pointer;
}
.checkboxSelected{
  display: block;
  width: 18px;
  height: 18px;
  margin:0 auto;
  background-image: url("./assets/imgs/icon2.png");
  background-position: -291px -40px;
  cursor: pointer;
}
.grayDeleteIcon{
  display: block;
  width: 19px;
  height: 21px;
  margin:0 auto;
  background-image: url("./assets/imgs/icon2.png");
  background-position: -125px -65px;
  cursor: pointer;
}
.ct_td_operate{
  width:8%;float: right!important;
  span{
    float: left;margin-top: 9px;
  }
}
.editIcon{
  display: block;
  width: 22px;
  height: 22px;
  margin-right: 12px;
  background-image: url("./assets/imgs/icon2.png");
  background-position: -43px -9px;
  cursor: pointer;
}
.arrangeIcon1{
  float: left!important;
  width: 22px; height: 22px;
  background-image: url("./assets/imgs/icon2.png");
  background-position: -16px -63px;
}
#app {
  font-family: "微软雅黑", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  text-indent: 5px;
}
input:focus {
  outline: none;
}
a{
  text-decoration: none;
  color: $default_font_color;
}
.ambow_head{
  position: relative;
  height: 40px;
  width: 100%;
  min-width: 1200px;
  background: #4679c7;
  z-index: 21;
}
.ambow_head_main{
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.ambow_head_left{
  position: absolute;
  height: 100%;
  .logo_name{
    line-height: 40px;
    margin-left: 30px;
    cursor: pointer;
  }
  div{
    float: left;
    color: #fff;
  }
  .schoolListBox{
    position: relative;
    height: 100%;
    width: 184px;
    margin: 0px 18px;
    .schoolName{
      position: relative;
      display: block;
      width: 184px;
      height: 27px;
      line-height: 27px;
      font-size: 14px;color: #393d46;
      margin-top: 15px; padding-left: 45px;
      background: #fff;
      border-radius: 50px;
      text-indent: 5px;
      background-color: #f5f5f5;
      .left_bg{
        position: absolute;
        display: inline-block;
        width: 32px; height: 26px;
        left: 0;
        border-radius: 13px 0 0 13px;
        background-color: #ebebeb;
      }
    }
    .searchIcon{
      position: absolute;
      width: 18px;
      height:21px ;
      top: 18px; left: 6px;
      background-image: url("./assets/imgs/icon2.png");
      background-position: -176px -8px;
      cursor: pointer;
      z-index:10;
    }
    .schoolList{
      position: absolute;
      top:47px;
      margin: 0; padding: 0;
      max-height: 250px;
      width: 182px;
      background: #fff;
      box-shadow: 0px 0px 6px #ddd;
      z-index: 98;
    }
  }
  .headBackIcon{
    display: block;
    width: 32px;
    height: 33px;
    margin-top: 3px;
    background-image: url("./assets/imgs/icon.png");
    background-position: -95px -16px;
    cursor: pointer;
  }
}
.ambow_head_left_label{
  line-height: 40px;
}
.schoolListItem{
  padding: 5px;
  padding-left: 12px;
  line-height: 17px;
  font-size: 14px;
  color: #999;
  &:hover{
    background: #f1f1f1;
    cursor: pointer;
  }
}
.home_icon{
  float: right;
  margin-top: 8px; margin-right: 10px;
  width: 23px; height: 21px;
  background-position: -315px -257px;
}
.ambow_head_right{
  position: relative;
  float: right;
  height: 100%;
  margin-right: 50px;
  line-height: 40px;
  span{
    display: block;
    float: left;
  }
}
.userHeadImg{
  height: 27px;
  width: 27px;
  margin-top: 6px;
  border-radius: 50%;
  background: #fff;
}
.userName{
  width: 50px;
  margin: 0px 10px;
  color: #fff;
}
.headRightIcon{
  height: 9px;
  width:15px;
  margin-top: 15px;
  background-image: url("./assets/imgs/icon.png");
  background-position: -135px -34px;
  cursor: pointer;
}
.headUserLayer{
  position: absolute;
  top:40px;
  right: 0;
  width: 100px;
  height: auto;
  background: #4679c7;
  z-index: 99;
  p{
    height: 30px;
    width: 100%;
    /*padding-left: 25px;*/
    margin-top: 0;
    margin-bottom: 0;
    line-height: 30px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    &:hover{
      background: #1eadf2;
    }
  }
}
/****主导航*****/
.nav_url{
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 60px;
  background: #fff;
  border-bottom: #e1e1e1 solid 1px;
  z-index: 19;
}
.nav_list{
  position: relative;
  width: 72%;
  /*min-width: 1000px;*/
  height: 100%;
  margin: 0 auto;
  padding-left: 90px;
}
.nav_list>.crm_view_course{
  position: absolute;
  height: 100%; line-height: 60px;
  right: 0;
  font-size: 16px; color: #4679c7;
  cursor: pointer;
}
.nav_list>.crm_view_course>i{
  position: relative;
  top: 3px;
  width: 16px; height: 20px;
  background-position: -346px -260px;
}
.nav_item{
  position: relative;
  float: left;
  height: 61px;
  /*margin-right: 60px;*/
  margin-right: 35px;
  min-width: 90px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}
.nav_item>.nav_content{
  display: inline-block;
  height: 100%; width: 100%;
  font-size: 16px;
  &:hover{
    border-bottom: #4679c7 solid 4px;
    color: #4679c7;
  }
}
.nav_item_triangle{
  display: block;
  position: absolute;
  top:60px;
  left: 50%;
  margin-left: -3px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 5px solid #4679c7;
  z-index: 100;
}
.nav_item_child{
  position: absolute;
  top:61px;
  left: 0;
  width: 100%;
  padding:10px 0 5px;
  background: #fff;
  box-shadow: 0px 0px 4px #ccc;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  z-index: 99;
}
.nav_item_child_line{
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 0px 10px;
  margin-bottom: 0;
  color: #a3a3a3;
  font-size: 14px;
  text-align: center;
}
.nav_item_child_line:hover{
  background: #4679c7;
  color: #fff;
}
.bodyHasSplitted{
  position: absolute;
  top:0px;
  left: 0;
  height: 100%;
  width: 100%;
  min-width: 1200px;
  background: #f6f7fb;
}
</style>
