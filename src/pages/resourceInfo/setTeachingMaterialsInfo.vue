<template>
  <div>
    <add-general-info-alert :alert-show="temp_data.alert_show" :field-array="temp_data.fieldArray" @update:alertShow="val => temp_data.alert_show = val" @clickCommit="alert_true"></add-general-info-alert>
    <div class="centerBody">
      <div class="centerBodyInputGroup">
        <span class="defaltBtn btnLength4 btnBgGreen floatRight" @click="addCourse()">新增资源</span>
        <search-input :input-width="search_input_width" :search="searchKey" @update:search="val => searchKey = val"  :placeholder="self_placeholder" @clickSearch="search_event"></search-input>
      </div>
      <div class="centerBodyTab">
        <div class="centerBodyTabHead">
          <div class="set_course_td_code" style="padding-left: 95px;">编码</div>
          <div class="set_course_td_name">教学资源名称</div>
          <div class="set_course_td_operate"></div>
        </div>
        <div class="centerBodyTabBodyWrapper">
          <div class="centerBodyTabBody">
            <div class="centerBodyTabBodyLine" v-for="(l, index) in teacher_material_list">
              <div class="set_course_td_code" style="padding-left: 95px;">
                <span v-show="!l.editIsShow">{{l.code}}</span>
                <input type="text" class="right_tab_line_input" v-show="l.editIsShow" v-model="edit_teacher_material_line_data.code">
              </div>
              <div class="set_course_td_name">
                <span v-show="!l.editIsShow">{{l.name}}</span>
                <input type="text" class="right_tab_line_input" v-show="l.editIsShow" v-model="edit_teacher_material_line_data.name">
              </div>
              <div class="set_course_td_operate" v-show="!l.editIsShow">
                <span class="grayDeleteIcon floatRight" @click="delete_course_line(l, index)"></span>
                <span class="editIcon floatRight" @click="edit_course_line(l, index)"></span>
              </div>
              <div class="set_course_td_operate" v-show="l.editIsShow">
                <i class="icon_common save_icon" style="margin-right: 6px;" @click="course_line_save(l, index)"></i>
                <i class="icon_common cancle_icon" @click="course_line_cancel(l)"></i>
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
      teacher_material_list:[],
      search_input_width:400,
      self_placeholder:'教学资源名称、编码',
      searchKey:null,
      edit_teacher_material_line_data:{},
      temp_data:{}
    }
  },
  methods:{
    search_event: function (searchKey) {
      http.find_teacher_material({orgId:localStorage.orgId, searchKey:searchKey}).then(res => {
        this.teacher_material_list=res;
      })
    },
    edit_course_line: function (l, index) {
      this.teacher_material_list.map((data, index) => {
        data.editIsShow = false
        this.$set(this.teacher_material_list, index, data)
      })
      l.editIsShow = true
      this.$set(this.teacher_material_list, index, l)
      Object.assign(this.edit_teacher_material_line_data, l)
    },
    course_line_save: function (l, index) {
      http.modify_teacher_material(this.edit_teacher_material_line_data).then(res => {
        if (res.id){
          store.dispatch('alert_handle_show', '修改成功')
          l.editIsShow = false
          l.code = this.edit_teacher_material_line_data.code
          l.name = this.edit_teacher_material_line_data.name
          this.$set(this.teacher_material_list, index, l)
          this.edit_teacher_material_line_data = {}
        }else {
          store.dispatch('alert_handle_show', '该资源被占用')
          l.editIsShow = false
          this.edit_teacher_material_line_data = {}
        }
      })
    },
    course_line_cancel: function (l) {
      l.editIsShow = false
      this.edit_teacher_material_line_data = {}
    },
    delete_course_line: function (l, index) {
      http.delete_teacher_material({ids:l.id}).then(res => {
        if(res.length){
          store.dispatch('alert_handle_show', '删除成功')
          this.teacher_material_list.splice(index, 1)
        }else{
          store.dispatch('alert_handle_show', '该课程已被引用')
        }
      })
    },
    addCourse: function () {
      http.get_teacherMaterial_code({orgId:localStorage.orgId}).then(res => {
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
        this.teacher_material_list.push(res);
        this.fieldArray=[
          {'fieldName':'编码','fieldVal':''},
          {'fieldName':'教学资源','fieldVal':''},
        ]
        this.$set(this.temp_data, 'alert_show', false)
      })
    }
  },
  created(){
    http.find_teacher_material({orgId:localStorage.orgId, searchKey:this.searchKey}).then(res => {
      this.teacher_material_list=res;
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
