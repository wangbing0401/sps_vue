<template>
  <div>
    <add-taxrate-info-alert :alert-show="temp_data.alert_show" :field-array="temp_data.fieldArray" @update:alertShow="val => temp_data.alert_show = val" @clickCommit="alert_true"></add-taxrate-info-alert>
    <div class="body_right">
      <div class="body_right_content">
        <div class="body_right_top">
          <span class="defaltBtn btnLength4 btnBgGreen" @click="addCourse()">新增</span>
        </div>
        <div class="body_right_main">
          <div class="right_tab_head" style="padding-left: 15px;">
            <div class="set_taxrate_td_starttime">开始时间</div>
            <div class="set_taxrate_td_endtime">结束时间</div>
            <div class="set_taxrate_td_rate1">综合税率</div>
            <div class="set_taxrate_td_rate2">增值税率</div>
            <div class="set_taxrate_td_fyb1">产品公摊费用比</div>
            <div class="set_taxrate_td_fyb2">集团公摊费用比</div>
            <div class="set_taxrate_td_operate">启用</div>
          </div>
          <div class="right_tab_body_wrapper">
            <div class="right_tab_body">
              <div class="right_tab_line" v-for="(l,$index) in rate_list" style="padding-left: 15px;">
                <div class="set_taxrate_td_starttime">{{l.startTime | format_date('yyyy-MM-dd')}}</div>
                <div class="set_taxrate_td_endtime">{{l.endTime | format_date('yyyy-MM-dd')}}</div>
                <div class="set_taxrate_td_rate1">{{l.synthesizeRate}}</div>
                <div class="set_taxrate_td_rate2">{{l.shsneakers}}</div>
                <div class="set_taxrate_td_fyb1">{{l.productEquallySharedCosts}}</div>
                <div class="set_taxrate_td_fyb2">{{l.groupEquallySharedCosts}}</div>
                <div class="set_taxrate_td_operate">
                  <span class="icon_common" style="margin-left: 0;" :class="l.status?'fengcun_gray_icon':'fengcun_blue_icon'" @click="sequestration_click(l)"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import http from '../../http/http'
  import AddTaxrateInfoAlert from '../../components/add_taxrate_info_alert/index'
  import store from '../../vuex_store/store'
  export default {
    components:{
      AddTaxrateInfoAlert
    },
    data(){
      return{
        rate_list:[],
        pageSize:20,
        temp_data:{}
      }
    },
    methods:{
      addCourse:function () {
        this.$set(this.temp_data, 'fieldArray', [
          {'fieldName':'开始时间','fieldVal':'', readonly:true,icon_class:'input_calendar_icon'},
          {'fieldName':'结束时间','fieldVal':'',readonly:true,icon_class:'input_calendar_icon'},
          {'fieldName':'综合税率','fieldVal':''},
          {'fieldName':'增值税率','fieldVal':''},
          {'fieldName':'产品公摊费用比','fieldVal':''},
          {'fieldName':'集团公摊费用比','fieldVal':''},
        ])
        this.$set(this.temp_data, 'alert_show', true)
      },
      alert_true: function (obj) {
        let params = {
          appCode:app_code,
          code:obj[0].fieldVal,
          customerId:localStorage.customerId,
          name:obj[1].fieldVal,
          orgId:localStorage.orgId
        }
        if (!params.name){
          store.dispatch('alert_handle_show', '请填写课程专业')
          return
        }
        http.add_course_type(params).then(res => {
          store.dispatch('alert_handle_show', '创建成功')
          this.course_type_list.push(res);
          this.fieldArray=[
            {'fieldName':'编码','fieldVal':''},
            {'fieldName':'课程专业','fieldVal':''},
          ]
          this.$set(this.temp_data, 'alert_show', false)
        })
      }
    },
    created(){
      http.find_rate({customerId:localStorage.customerId, pageSize:this.pageSize, pageNum:1, orgId:localStorage.orgId}).then(res => {
        this.rate_list = res.results
      })
    },
  }

</script>

<style lang="scss" scoped>
  .body_right{
    position: absolute;
    top:0; left: 0;
    height: 100%;
    width: 100%;
    min-width: 1000px;
    padding-top: 101px;
    padding-left: 221px;
    z-index: 10;
    .body_right_content{
      position: relative;
      height: 100%;
      width: 90%;
      margin: 0 auto;
      .body_right_top{
        position: absolute;
        top:30px;
        height: 30px;
        width: 100%;
        span{
          display: block;
          float: right;
          height: 30px;
        }
      }
      .set_taxrate_td_starttime,.set_taxrate_td_endtime{width: 12%}
      .set_taxrate_td_fyb1,.set_taxrate_td_fyb2{width: 18.2%}
      .set_taxrate_td_rate1,.set_taxrate_td_rate2,.set_taxrate_td_operate{width:14.2% }
      .set_taxrate_td_operate{width: 10%;}
      .right_tab_line .icon_common{margin: 5px auto}
    }
    .fengcun_gray_icon{
      width: 23px;
      height: 18px;
      background-position: -213px -94px;
    }
    .fengcun_blue_icon{
      width: 23px;
      height: 18px;
      background-position: -241px -95px;
    }
  }
</style>
