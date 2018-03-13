<template>
  <div>
    <add-general-info-alert :alert-show="temp_data.alert_show" :field-array="temp_data.fieldArray" @update:alertShow="val => temp_data.alert_show = val" @clickCommit="alert_true"></add-general-info-alert>
    <div class="centerBody">
      <div class="centerBodyInputGroup">
        <span class="left_div" style="margin-right: 20px;">
            <i class="icon_common" style="position: relative;top: 4px;margin-right: 10px;"></i>所属行业
        </span>
        <div style="position: relative;float: left;">
          <search-input :input-width="search_input_width" :search="searchKey" @update:search="val => searchKey = val"  :placeholder="self_placeholder" @clickSearch="search_event"></search-input>
        </div>
        <span class="defaltBtn btnLength4 btnBgGreen floatRight" @click="add_industry()">新增</span>
      </div>
      <div class="centerBodyTab">
        <div class="centerBodyTabHead">
          <div class="set_course_td_name" style="padding-left: 95px">编码</div>
          <div class="set_course_td_code" style="width: 20%;">所属行业</div>
        </div>
        <div class="centerBodyTabBodyWrapper">
          <div class="centerBodyTabBody">
            <div class="centerBodyTabBodyLine" v-for="(l, index) in industry_list">
              <div class="set_course_td_code" style="padding-left: 95px;">
                <span v-show="!l.editIsShow">{{l.code}}</span>
                <input type="text" class="right_tab_line_input" v-show="l.editIsShow" v-model="edit_industry_line_data.code">
              </div>
              <div class="set_course_td_name" style="width: 20%;">
                <span v-show="!l.editIsShow">{{l.name}}</span>
                <input type="text" class="right_tab_line_input" v-show="l.editIsShow" v-model="edit_industry_line_data.name">
              </div>
              <div class="set_course_td_operate" style="width: 20%;padding-left: 0;" v-show="!l.editIsShow">
                <span class="grayDeleteIcon floatRight" @click="delete_course_line(l, index)"></span>
                <span class="editIcon floatRight" @click="edit_course_line(l, index)"></span>
              </div>
              <div class="set_course_td_operate" style="width: 20%;padding-left: 0;" v-show="l.editIsShow">
                <i class="icon_common save_icon" style="margin-right: 6px;" @click="course_line_save(l, index)"></i>
                <i class="icon_common cancle_icon" @click="course_line_cancel(l, index)"></i>
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
import SearchInput from '../../components/search_input/index'
import AddGeneralInfoAlert from '../../components/add_general_info_alert/index'
import handle_fun from '../../handle_fun/index'
import store from '../../vuex_store/store'
export default{
  components:{
    SearchInput,
    AddGeneralInfoAlert
  },
  data(){
    return{
      industry_list:[],
      search_input_width:400,
      self_placeholder:'编码、所属行业',
      searchKey:null,
      edit_industry_line_data:{},
      temp_data:{}
    }
  },
  methods:{
    search_event: function (searchKey) {
      http.get_industry_list({searchKey:searchKey}).then(res => {
        this.industry_list=res;
      })
    },
    edit_course_line: function (l, index) {
      this.industry_list.map((data, index) => {
        data.editIsShow = false
        this.$set(this.industry_list, index, data)
      })
      l.editIsShow = true
      this.$set(this.industry_list, index, l)
      Object.assign(this.edit_industry_line_data, l)
    },
    course_line_save: function (l, index) {
      http.add_industry_list([this.edit_industry_line_data]).then(res => {
        store.dispatch('alert_handle_show', '修改成功')
        l.editIsShow = false
        l.code = this.edit_industry_line_data.code
        l.name = this.edit_industry_line_data.name
        this.$set(this.industry_list, index, l)
        this.edit_industry_line_data = {}
      })
    },
    course_line_cancel: function (l) {
      l.editIsShow = false
      this.edit_industry_line_data = {}
    },
    delete_course_line: function (l, index) {
      http.delete_industry_type({id:l.id}).then(res => {
        if(res.id != "-1"){
          store.dispatch('alert_handle_show', '删除成功')
          this.industry_list.splice(index, 1)
        }else{
          store.dispatch('alert_handle_show', '该行业已占用')
        }
      })
    },
    add_industry: function () {
      this.industry_list.map((data, index) => {
        data.editIsShow = false
      })
      http.get_industry_code({}).then(res => {
        this.$set(this.temp_data, 'course_code', handle_fun.number_fun(res.data, 5))
        this.$set(this.temp_data, 'fieldArray', [
          {'fieldName':'编码','fieldVal':this.temp_data.course_code, readonly:true},
          {'fieldName':'所属行业','fieldVal':''}
        ])
        this.$set(this.temp_data, 'alert_show', true)
      })
    },
    alert_true: function (obj) {
      let params = [
        {
          code:obj[0].fieldVal,
          name:obj[1].fieldVal
        }
      ]
      if (!params[0].name){
        store.dispatch('alert_handle_show', '请填写所属行业')
        return
      }
      http.add_industry_list(params).then(res => {
        store.dispatch('alert_handle_show', '创建成功')
        this.industry_list.push(res[0]);
        this.fieldArray=[
          {'fieldName':'编码','fieldVal':''},
          {'fieldName':'所属行业','fieldVal':''},
        ]
        this.$set(this.temp_data, 'alert_show', false)
      })
    }
  },
  created(){
    http.get_industry_list({}).then(res => {
      this.industry_list = res;
    })
  },
  mounted(){
    const ps = new perfectScrollbar('.centerBodyTabBodyWrapper', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
