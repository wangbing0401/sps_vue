<template>
  <div class="login_main">
    <div class="login_content">
      <div class="left">
        <img src="../assets/imgs/login_title.png" >
        <img src="../assets/imgs/ambow_text.png">
      </div>
      <div class="right">
        <div class="content">
          <div class="title">登录&nbsp;/&nbsp;Login</div>
          <input type="text" v-model="username" placeholder="用户名">
          <input type="password" v-model="password" @keyup.enter="myKeyupEnter()" placeholder="密码">
          <div class="login_button" @click="login()">
            登录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../http/http'
export default{
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    login: function () {
      http.login({username:this.username, password:this.password}).then(res => {
        localStorage.user_token = res.tokenType+' '+res.token;
        this.$router.push('system_main')
      })
    },
    myKeyupEnter: function () {
      this.login()
    }
  },
  created(){

  }
}
</script>

<style lang="scss" scoped>
  .login_main{
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: #333547;
    background-image: url("../assets/imgs/login_bg.png");
    background-size: 100% 40%;
    background-position: bottom;
    background-repeat: no-repeat;
    .login_content{
      position: relative;
      width: 650px; height: 350px;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      .left{
        float: left;
        width: 40%; height: 100%;
        text-align: center;
        border-right: 1px solid #9092A4;
        img:nth-of-type(1){
          margin-top: 60px;
        }
        img:nth-of-type(2){
          margin-top: 50px;
        }
      }
      .right{
        float: left;
        width: 60%; height: 100%;
        .content{
          width: 300px; height: 270px;
          margin: 40px 0 0 90px;
          .title{
            font-size: 18px; color: white;
          }
          input{
            width: 100%; height: 40px;
            margin-top: 25px;
            color: white;
            border: none;
            border-bottom: 1px solid #9092A4;
            background-color: transparent;
            &::-webkit-input-placeholder{
              color: #9092A4;
            }
            &:-moz-placeholder{
              color: #9092A4;
            }
            &::-moz-placeholder{
              color: #9092A4;
            }
            &:-ms-input-placeholder{
              color: #9092A4;
            }
          }
          .handle_line{
            font-size: 14px; color: #9092A4;
            margin-top: 10px;
            .login_select_remember_icon{
              width: 20px; height: 20px;
              background-position: -294px -145px;
            }
            .login_selected_remember_icon{
              width: 20px; height: 20px;
              background-position: -268px -145px;
            }
          }
          .login_button{
            width: 100%; height: 40px;
            font-size: 18px; color: white;
            text-align: center; line-height: 40px;
            margin-top: 70px;
            border-radius: 20px;
            background-color: #078ffe;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
