<template>
  <div>
    <add-general-info-alert :alert-show="temp_data.alert_show" :field-array="temp_data.fieldArray" @update:alertShow="val => temp_data.alert_show = val" @clickCommit="alert_true"></add-general-info-alert>
    <div class="body_right">
      <div class="body_right_content">
        <div class="body_right_top">
          <span class="defaltBtn btnLength4 btnBgGreen" @click="addCourse()">新建课程专业</span>
          <search-input :input-width="search_input_width" :search="searchKey" @update:search="val => searchKey = val"  :placeholder="self_placeholder" @clickSearch="search_event"></search-input>
        </div>
        <div class="body_right_main">
          <div class="right_tab_head">
            <div class="set_course_td_code">编码</div>
            <div class="set_course_td_name">课程专业名称</div>
            <div class="set_course_td_operate"></div>
          </div>
          <div class="right_tab_body_wrapper">
            <div class="right_tab_body">
              <div class="right_tab_line" v-for="(l, $index) in course_type_list">
                <div class="set_course_td_code">
                  <input v-if="l.editIsShow" type="text" class="right_tab_line_input" v-model="edit_course_line_data.code">
                  <span v-if="!l.editIsShow">{{l.code}}</span>
                </div>
                <div class="set_course_td_name">
                  <input v-if="l.editIsShow" type="text" class="right_tab_line_input" v-model="edit_course_line_data.name">
                  <span v-if="!l.editIsShow">{{l.name}}</span>
                </div>
                <div class="set_course_td_operate" v-show="!l.editIsShow">
                  <span class="grayDeleteIcon floatRight" @click="delete_course_line(l, $index)"></span>
                  <span class="editIcon floatRight" @click="edit_course_line(l, $index)"></span>
                </div>
                <div class="set_course_td_operate" v-show="l.editIsShow">
                  <i class="icon_common save_icon" style="margin-right: 6px;" @click="course_line_save(l, $index)"></i>
                  <i class="icon_common cancle_icon" @click="course_line_cancel(l)"></i>
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
import SearchInput from '../../components/search_input/index'
import AddGeneralInfoAlert from '../../components/add_general_info_alert/index'
import store from '../../vuex_store/store'
import handle_fun from '../../handle_fun/index'
export default{
  components:{
    SearchInput,
    AddGeneralInfoAlert
  },
  data(){
    return{
      course_type_list:[],
      pageSize:20,
      search_input_width:400,
      self_placeholder:'请输入课程名称',
      searchKey:null,
      edit_course_line_data:{},
      temp_data:{}
    }
  },
  methods:{
    search_event: function (searchKey) {
      http.find_course_type_list({orgId:localStorage.orgId, appCode:app_code, customerId:localStorage.customerId, pageSize:this.pageSize, pageNum:1, searchKey:searchKey}).then(res => {
        this.course_type_list = res.results;
        this.course_type_list.map((data, index) => {
          data.editIsShow = false
        })
      })
    },
    edit_course_line: function (l, $index) {
      this.course_type_list.map((data, index) => {
        data.editIsShow = false
        this.$set(this.course_type_list, index, data)
      })
      l.editIsShow = true
      this.$set(this.course_type_list, $index, l)
      Object.assign(this.edit_course_line_data, l)
    },
    course_line_save: function (l, $index) {
      http.modify_course_type(this.edit_course_line_data).then(res => {
        if (res.id == '-1'){
          store.dispatch('alert_handle_show', '该课程已被占用')
          l.editIsShow = false
          this.$set(this.course_type_list, $index, l)
        }else {
          store.dispatch('alert_handle_show', '修改成功')
          l.editIsShow = false
          l.code = this.edit_course_line_data.code
          l.name = this.edit_course_line_data.name
          this.$set(this.course_type_list, $index, l)
          this.edit_course_line_data = {}
        }
      })
    },
    course_line_cancel: function (l) {
      l.editIsShow = false
      this.edit_course_line_data = {}
    },
    delete_course_line: function (l, $index) {
      http.delete_course_type({id:l.id}).then(res => {
        if(res.id){
          store.dispatch('alert_handle_show', '删除成功')
          this.course_type_list.splice($index, 1)
        }else{
          store.dispatch('alert_handle_show', '该课程已被引用')
        }
      })
    },
    addCourse: function () {
      http.get_coursetype_code({orgId:localStorage.orgId, customerId:localStorage.customerId, appCode:app_code}).then(res => {
        this.$set(this.temp_data, 'course_code', handle_fun.number_fun(res.data.result, 5))
        this.$set(this.temp_data, 'fieldArray', [
          {'fieldName':'编码','fieldVal':this.temp_data.course_code, readonly:true},
          {'fieldName':'课程专业','fieldVal':''}
        ])
        this.$set(this.temp_data, 'alert_show', true)
      })
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
    http.find_course_type_list({orgId:localStorage.orgId, appCode:app_code, customerId:localStorage.customerId, pageSize:this.pageSize, pageNum:1, searchKey:this.searchKey}).then(res => {
      this.course_type_list = res.results
    })
  },
  mounted(){
    const ps = new perfectScrollbar('.right_tab_body_wrapper', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
