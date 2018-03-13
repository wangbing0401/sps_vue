<template>
  <div>
    <add-general-info-alert :alert-show="temp_data.alert_show" :field-array="temp_data.fieldArray" @update:alertShow="val => temp_data.alert_show = val" @clickCommit="alert_true"></add-general-info-alert>
    <div class="centerBody">
      <div class="centerBodyInputGroup">
        <span class="defaltBtn btnLength4 btnBgGreen floatRight" @click="addCourse()">新建资质等级</span>
        <search-input :input-width="search_input_width" :search="searchKey" @update:search="val => searchKey = val"  :placeholder="self_placeholder" @clickSearch="search_event"></search-input>
      </div>
      <div class="centerBodyTab">
        <div class="centerBodyTabHead">
          <div class="set_course_td_name" style="padding-left: 95px">编码</div>
          <div class="set_course_td_name">名称</div>
          <!--<div class="set_course_td_code" style="width: 20%;">资质等级</div>-->
          <div class="set_course_td_operate"></div>
        </div>
        <div class="centerBodyTabBodyWrapper">
          <div class="centerBodyTabBody">
            <div class="centerBodyTabBodyLine" v-for="(l, index) in aptitude_rank_list">
              <div class="set_course_td_code" style="padding-left: 95px;">
                <span v-show="!l.editIsShow">{{l.code}}</span>
                <input type="text" class="right_tab_line_input" v-show="l.editIsShow" v-model="edit_aptitude_rank_line_data.code">
              </div>
              <div class="set_course_td_code">
                <span v-show="!l.editIsShow">{{l.name}}</span>
                <input type="text" class="right_tab_line_input" v-show="l.editIsShow" v-model="edit_aptitude_rank_line_data.name">
              </div>
              <!--<div class="set_course_td_name" style="width: 20%;">-->
              <!--<span ng-show="!l.editIsShow">{{l.qualificationLevel}}</span>-->
              <!--<input type="text" class="right_tab_line_input" ng-show="l.editIsShow" ng-model="edit_aptitude_rank_line_data.qualificationLevel">-->
              <!--</div>-->
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
      <paging :total-page="temp_data.numPages" @getPages="get_list"></paging>
    </div>
  </div>
</template>

<script>
import http from '../../http/http'
import SearchInput from '../../components/search_input/index'
import AddGeneralInfoAlert from '../../components/add_general_info_alert/index'
import handle_fun from '../../handle_fun/index'
import store from '../../vuex_store/store'
import paging from '../../components/paging/index'
export default{
  components:{
    SearchInput,
    AddGeneralInfoAlert,
    paging
  },
  data(){
    return{
      aptitude_rank_list:[],
      search_input_width:400,
      self_placeholder:'编码、资质等级',
      searchKey:null,
      edit_aptitude_rank_line_data:{},
      temp_data:{},
      pageSize:20
    }
  },
  methods:{
    search_event: function (searchKey) {
      http.find_aptitude_rank({orgId:localStorage.orgId, customerId:localStorage.customerId, pageSize:this.pageSize, pageNum:1, searchKey:searchKey}).then(res => {
        this.aptitude_rank_list=res.results;
      })
    },
    edit_course_line: function (l, index) {
      this.aptitude_rank_list.map((data, index) => {
        data.editIsShow = false
        this.$set(this.aptitude_rank_list, index, data)
      })
      l.editIsShow = true
      this.$set(this.aptitude_rank_list, index, l)
      Object.assign(this.edit_aptitude_rank_line_data, l)
    },
    course_line_save: function (l, index) {
      http.modify_aptitude_rank(this.edit_aptitude_rank_line_data).then(res => {
        if (res.id){
          store.dispatch('alert_handle_show', '修改成功')
          l.editIsShow = false
          l.code = this.edit_aptitude_rank_line_data.code
          l.name = this.edit_aptitude_rank_line_data.name
          this.$set(this.aptitude_rank_list, index, l)
          this.edit_aptitude_rank_line_data = {}
        }else {
          store.dispatch('alert_handle_show', '该资质等级已被引用')
          l.editIsShow = false
          this.edit_aptitude_rank_line_data = {}
        }
      })
    },
    course_line_cancel: function (l) {
      l.editIsShow = false
      this.edit_aptitude_rank_line_data = {}
    },
    delete_course_line: function (l, index) {
      http.delete_aptitude_rank({id:l.id}).then(res => {
        if(res.id){
          store.dispatch('alert_handle_show', '删除成功')
          this.aptitude_rank_list.splice(index, 1)
        }else{
          store.dispatch('alert_handle_show', '该资质等级已被引用')
        }
      })
    },
    addCourse: function () {
      http.get_aptitude_code({orgId:localStorage.orgId, customerId:localStorage.customerId}).then(res => {
        this.$set(this.temp_data, 'course_code', handle_fun.number_fun(res.result, 5))
        this.$set(this.temp_data, 'fieldArray', [
          {'fieldName':'编码','fieldVal':this.temp_data.course_code, readonly:true},
          {'fieldName':'教学资源','fieldVal':''}
        ])
        this.$set(this.temp_data, 'alert_show', true)
      })
    },
    alert_true: function (obj) {
      let params = {
        code:obj[0].fieldVal,
        org_name:localStorage.orgName,
        name:obj[1].fieldVal,
        org_id:localStorage.orgId
      }
      if (!params.name){
        store.dispatch('alert_handle_show', '请填写教学资源')
        return
      }
      http.add_teacher_material(params).then(res => {
        store.dispatch('alert_handle_show', '创建成功')
        this.aptitude_rank_list.push(res);
        this.fieldArray=[
          {'fieldName':'编码','fieldVal':''},
          {'fieldName':'教学资源','fieldVal':''},
        ]
        this.$set(this.temp_data, 'alert_show', false)
      })
    },
    get_list: function (page) {
      http.find_aptitude_rank({orgId:localStorage.orgId, customerId:localStorage.customerId, pageSize:this.pageSize, pageNum:page, searchKey:this.searchKey}).then(res => {
        this.aptitude_rank_list = res.results
      })
    }
  },
  created(){
    http.find_aptitude_rank({orgId:localStorage.orgId, customerId:localStorage.customerId, pageSize:this.pageSize, pageNum:1, searchKey:this.searchKey}).then(res => {
      this.aptitude_rank_list = res.results;
      this.$set(this.temp_data, 'numPages', res.pageNum)
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
