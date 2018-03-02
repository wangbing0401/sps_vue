<template>
  <div>
    <alert :show="AlertShow"></alert>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Alert from './components/myself_alert/index'
export default {
  components:{
    Alert
  },
  computed:{
    ...mapState({
      AlertShow:state => state.app_all.alert_show
    })
  }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
  font-size: inherit;
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
    }
  }
  ul.schoolList{
    position: absolute;
    top:47px;
    max-height: 250px;
    width: 182px;
    background: #fff;
    box-shadow: 0px 0px 6px #ddd;
    z-index: 98;
  }
  span.headBackIcon{
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
</style>
