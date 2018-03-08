<template>
  <div class="add_wrap">
    <div class="password_change_main">
      <div class="top">修改密码</div>
      <div class="content">
        <div>
          <span>旧密码</span><input style="left: 46px;" type="text" ng-model="password_old">
        </div>
        <div>
          <span>新密码</span><input style="left: 46px;" type="text" ng-model="password_new">
        </div>
        <div>
          <span>确认新密码</span><input type="text" ng-model="password_again">
        </div>
        <div class="post_button" ng-click="change_password()">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .password_change_main{
    position: absolute;
    width: 590px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-box-shadow: 0 0 16px rgba(0, 0, 0, .08);
    -moz-box-shadow: 0 0 16px rgba(0, 0, 0, .08);
    box-shadow: 0 0 16px rgba(0, 0, 0, .08);
    background-color: white;
    .top{
      width: 100%; height: 50px;
      text-align: center; line-height: 50px;
      font-size: 16px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
  .password_change_main>.content{
    padding: 50px 80px 60px 80px;
  }
  .password_change_main>.content>div{
    margin-bottom: 15px;
    font-size: 16px; color: #313131;
  }
  .password_change_main>.content>div>input{
    position: relative;
    height: 32px; width: 222px;
    left: 14px;
  }
  .password_change_main>.content>.post_button{
    width: 327px; height: 48px;
    font-size: 16px; color: white;
    text-align: center; line-height: 48px;
    margin: 62px auto 0 auto;
    background-color: #4778c7;
    cursor: pointer;
  }
</style>
