<template>
  <div v-if="alertShow" class="alert_all">
    <div class="ceng"></div>
    <div class="alert_content">
      <div style="padding: 0px 20px;">
        <div class="alert_head">新增<span class="alert_head_icon" @click="cancle()"></span></div>
      </div>
      <div class="alert_divide_line" style="margin-bottom: 25px;"></div>
      <div class="add_alert_input_line" v-for="l in fieldArray">
        <span class="add_alert_label">{{l.fieldName}}</span>
        <span class="add_alert_inputbox">
            <input :type="l.number?'number':'text'" class="add_alert_txtbox" v-model="l.fieldVal" :readonly="l.readonly">
        </span>
      </div>
      <div class="add_alert_btngroup" style="text-align: center">
        <span class="defaltBtn btnLength2 btnBgGray" style="margin-right: 30px;" @click="cancle()">取消</span>
        <span class="defaltBtn btnLength2 btnBgGreen" @click="commit()">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    alertShow: Boolean,
    fieldArray: Array
  },
  methods:{
    commit: function () {
      this.$emit('clickCommit', this.fieldArray)
    },
    cancle: function () {
      this.$emit('update:alertShow', false)
    }
  }
}
</script>

<style lang="scss">
  .alert_all{
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 1000;
    .ceng{
      width: 100%; height: 100%;
      background-color: #333333;
      opacity: 0.6;
    }
    .alert_content{
      position: absolute;
      top: 50%; left: 50%;
      height: 250px; width: 425px;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      border-radius: 3px;
      background-color: white;
      z-index: 100;
      div{
        .alert_head{
          height: 16px;
          line-height: 16px;
          margin-top: 10px;
          padding:0px 5px;
          border-left: #1fdd83 solid 3px;
          color:#4679c7 ;
          font-size: 16px;
          /*background: #4679c7;*/
          /*color: #fff;*/
          .alert_head_icon{
            display: block;
            float: right;
            height: 13px;
            width: 14px;
            /*margin-right: 10px;*/
            margin-top: 2px;
            background-image: url('../../../assets/imgs/icon2.png');
            background-position: -250px -43px;
            cursor: pointer;
          }
        }
      }
      .alert_divide_line{
        width: 100%;height: 1px;border-bottom: #eee solid 1px;margin-top: 10px;
      }
      .add_alert_input_line{
        height: 30px;
        width: 320px;
        margin: 0 auto 10px;
        .add_alert_label{
          width: 60px;margin-right:10px;line-height:30px;text-align: right;color: #313131;
        }
        span{
          display: block;float: left;
        }
        .add_alert_inputbox{
          position: relative;
          width: 240px;
          height: 100%;
          .add_alert_txtbox{
            height: 100%;
            width: 100%;
            color: #767c8a;
            border: none;
            background: #eaf1fe;
          }
        }
      }
      .add_alert_btngroup{
        height: 30px;
        width: 100%;
        margin-top: 30px;
        text-align: center;
        span{
          display: inline-block;
        }
      }
    }
  }
</style>
