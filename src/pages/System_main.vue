<template>
  <div class="system_main">
    <div class="head">
      <div class="main">
        <span class="logo_name">LOGO公司名称</span>
        <div class="ambow_head_right" style="padding-top: 8px;margin-right: 0;" @mouseenter="menu_show=true" @mouseleave="menu_show=false">
          <span class="icon_common tishi_icon" style="position: relative;top: 6px;margin-right: 20px;"></span>
          <span class="icon_common row_icon" style="margin-right: 20px;"></span>
          <span class="userHeadImg"></span>
          <span class="userName text_ellipsis" :title="userName">{{userName}}</span>
          <span class="headRightIcon"></span>
          <div class="headUserLayer" style="background-color: #333547;top: 60px;" v-if="menu_show">
            <!--<p ui-sref="message_list">消息</p>-->
            <p>密码设置</p>
            <p>退出</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="line">
        <div class="block">
          <div class="icon_common caiwu_icon"></div>
          <div class="title">财务管理</div>
          <div class="content_text">
            财务管理系统,报表编制,往来核销更简单,快速做账轻松核对
          </div>
          <div class="button">进入</div>
        </div>
        <div class="block">
          <div class="icon_common renli_icon"></div>
          <div class="title">人力资源</div>
          <div class="content_text">
            实现组织人事管理,档案管理,考勤休假,薪酬管理等人才管理信息化
          </div>
          <div class="button">进入</div>
        </div>
        <div class="block">
          <div class="icon_common jiaoxue_icon"></div>
          <div class="title">教学管理</div>
          <div class="content_text">
            教学计划结合任务机制，有效规划和把控学员学习路径
          </div>
          <div class="button" :style="user_permiss==2?{color:'#4679c7', borderColor:'#4679c7'}:{}" @click="jiaoxue_manage_click()">进入</div>
        </div>
        <div class="block">
          <div class="icon_common xiaoshou_icon"></div>
          <div class="title">销售管理</div>
          <div class="content_text">
            与库存管理、应收管理等系统结合应用，提供企业销售业务管理
          </div>
          <div class="button">进入</div>
        </div>
        <div style="clear: both;"></div>
      </div>
      <div class="line">
        <div class="block">
          <div class="icon_common canpin_icon"></div>
          <div class="title">产品管理</div>
          <div class="content_text">
            财务管理系统,报表编制,往来核销更简单,快速做账轻松核对
          </div>
          <div class="button" :style="user_permiss==1?{color:'#4679c7', borderColor:'#4679c7'}:{}" @click="canpin_click()">进入</div>
        </div>
        <div class="block">
          <div class="icon_common kehu_icon"></div>
          <div class="title">客户服务</div>
          <div class="content_text">
            实现组织人事管理,档案管理,考勤休假,薪酬管理等人才管理信息化
          </div>
          <div class="button" :style="user_permiss==4?{color:'#4679c7', borderColor:'#4679c7'}:{}" @click="kefu_click()">进入</div>
        </div>
        <div class="block">
          <div class="icon_common jiaoxue_resource_icon"></div>
          <div class="title">教学资源</div>
          <div class="content_text">
            教学计划结合任务机制，有效规划和把控学员学习路径
          </div>
          <div class="button" :style="user_permiss==1?{color:'#4679c7', borderColor:'#4679c7'}:{}" @click="jiaoxue_resource_click()">进入</div>
        </div>
        <div class="block">
          <i class="dian_icon" style="margin-top: 154px;"></i>
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../http/http'
export default{
  data(){
    return{
      menu_show:false,
      user_permiss:null,
      userName:null
    }
  },
  methods: {
    jiaoxue_manage_click: function () {

    },
    canpin_click: function () {
      if (this.user_permiss == 1){
        http.get_shool_list({accountId:localStorage.account_id, userId:localStorage.user_id}).then(res => {
          localStorage.orgName = res[0].orgName;
          localStorage.orgId = res[0].orgId;
          localStorage.user_type = 'sps_acdemic';

          this.$router.push('productDefinitionList')
        });
      }
    },
    kefu_click: function () {

    },
    jiaoxue_resource_click: function () {
      if (this.user_permiss == 1){
        http.get_shool_list({accountId:localStorage.account_id, userId:localStorage.user_id}).then(res => {
          localStorage.orgName = res[0].orgName;
          localStorage.orgId = res[0].orgId;
          localStorage.user_type = 'sps_acdemic';

          this.$router.push('teacherInfoList')
        });
      }
    }
  },
  created(){
    http.get_user_permiss({}).then(res => {
      localStorage.customerId = res.accounts[0].customerId;
      localStorage.user_name = res.userDisplayName;
      this.userName = localStorage.user_name;
      localStorage.user_id = res.userId;
      localStorage.account_id = res.accounts[0].accountId;
      if (res.accounts[0].permissionMap.sps_acdemic){                             //教务
        localStorage.user_permiss = 1;
      }
      if (res.accounts[0].permissionMap.sps_teacher){                             //教师
        localStorage.user_permiss = 2;
      }
      if (res.accounts[0].permissionMap.sps_saler){                             //销售
        localStorage.user_permiss = 3;
      }
      if (res.accounts[0].permissionMap.sps_service){                             //客服
        localStorage.user_permiss = 4;
      }
      this.user_permiss = localStorage.user_permiss;
    })
  }
}
</script>

<style lang="scss" scoped>
  .system_main {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: scroll;
    background-color: #f0f0f2;
    .head {
      position: fixed;
      width: 100%;
      height: 60px;
      line-height: 60px;
      background-color: #333547;
      z-index: 10;
      .main{
        width: 1000px; height: 100%;
        margin: 0 auto;
        .logo_name{
          font-size: 18px; color: #c7c7c9;
        }
        .right{
          float: right;
        }
        .ambow_head_right{
          .tishi_icon{
            width: 24px; height: 27px;
            background-position: -321px -141px;
          }
          .row_icon{
            width: 2px; height: 40px;
            background-position: -68px -165px;
          }
        }
      }
    }
    .content{
      position: relative;
      width: 1000px;
      margin: 100px auto 30px auto;
      .line{
        width: 100%;
        &:first-of-type{
          margin-bottom: 20px;
        }
        .block{
          position: relative;
          float: left;
          width: 235px; height: 300px;
          text-align: center;
          padding: 0 15px;
          margin-right: 20px;
          border-radius: 5px;
          background-color: white;
          &:nth-of-type(4){
            margin-right: 0;
          }
          .caiwu_icon{
            position: absolute;
            top: 30px; left: 94px;
            width: 45px; height: 48px;
            background-position: -212px -177px;
          }
          .title{
            margin-top: 110px;
            font-size: 16px; color: #2d2d2d;
          }
          .content_text{
            margin-top: 15px;
            font-size: 14px; color: #7d7d7d;
            line-height: 26px;
          }
          .button{
            width: 80px; height: 44px;
            font-size: 16px; color: #7d7d7d;
            text-align: center; line-height: 44px;
            border-radius: 22px;
            margin: 20px auto 0 auto;
            border: 1px solid #7d7d7d;
            cursor: pointer;
          }
          .renli_icon{
            position: absolute;
            top: 28px; left: 94px;
            width: 47px; height: 50px;
            background-position: -87px -177px;
          }
          .jiaoxue_icon{
            position: absolute;
            top: 28px; left: 88px;
            width: 58px; height: 45px;
            background-position: -85px -247px;
          }
          .xiaoshou_icon{
            position: absolute;
            top: 24px; left: 93px;
            width: 50px; height: 46px;
            background-position: -275px -178px;
          }
          .canpin_icon{
            position: absolute;
            top: 24px; left: 93px;
            width: 42px; height: 43px;
            background-position: -160px -245px;
          }
          .kehu_icon{
            position: absolute;
            top: 24px; left: 93px;
            width: 53px; height: 48px;
            background-position: -339px -177px;
          }
          .jiaoxue_resource_icon{
            position: absolute;
            top: 24px; left: 93px;
            width: 49px; height: 48px;
            background-position: -148px -177px;
          }
          .dian_icon{
            display: inline-block;
            width: 46px; height: 11px;
            background-image: url("../assets/imgs/icon2.png");
            background-position: -355px -150px;
          }
        }
      }
    }
  }
</style>
