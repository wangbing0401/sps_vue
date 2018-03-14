<template>
  <div class="add_wrap">
    <div class="add_wrap_content pro_approval_detail_content">
      <!--基本信息-->
      <p class="add_content_title">
        <span class="icon_common teacher_base_ico"></span>
        <span>基本信息</span>
      </p>
      <div class="add_teacher_base_main position_relative">
        <div class="add_teacher_info_img">
          <img src="../../assets/imgs/head.png" width="100%" height="100%" id="teacher_head_image" />
        </div>
        <p class="add_wrap_main_line">
          <span class="position_relative">
            <!--通过搜索邮箱带出相关信息，没有信息就新增-->
              <span class="add_teacher_info_title floatLeft">邮&nbsp;&nbsp;&nbsp;箱：</span>
              <span class="add_teacher_info_answer floatLeft" style="position:relative;width: 210px;">
                  <input type="text" class="edit_input add_teacher_info_email" v-model="my_email" @blur="search_account()">
              </span>
              <span class="add_teacher_info_title floatLeft">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：</span>
              <span class="add_teacher_info_number floatLeft" style="margin-right: 0;" v-if="show_employment">

              </span>
              <span class="add_teacher_info_number floatLeft" style="margin-right: 0;" v-if="!show_employment"><input type="number" class="edit_input add_teacher_info_input" v-model="teacher_info.contactInfos[0].contactInfo"></span>
          </span>
        </p>
        <p class="add_wrap_main_line">
          <span>
              <span class="add_teacher_info_title floatLeft">姓&nbsp;&nbsp;&nbsp;名：</span>
              <span class="add_teacher_info_answer floatLeft" style="width: 210px;" v-if="show_employment">{{teacher_info.nameOriental}}</span>
              <span class="add_teacher_info_answer floatLeft" style="width: 210px;" v-if="!show_employment"><input type="text" class="edit_input add_teacher_info_input" v-model="teacher_info.nameOriental"></span>
              <span class="add_teacher_info_title floatLeft">曾&nbsp;&nbsp;用&nbsp;&nbsp;名：</span>
              <span class="add_teacher_info_answer floatLeft" style="width: 140px;" v-if="show_employment">{{teacher_info.middleName}}</span>
              <span class="add_teacher_info_answer floatLeft" style="width: 140px;" v-if="!show_employment"><input type="text" class="edit_input add_teacher_info_input" v-model="teacher_info.middleName"></span>
              <span class="add_teacher_info_title floatLeft">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
              <span class="add_teacher_info_answer floatLeft" style="width: 130px;" v-if="show_employment">{{teacher_info.gender | sex_filter}}</span>
              <span class="add_teacher_info_answer floatLeft" style="width: 130px;" v-if="!show_employment">
                <input-list :icon-class="icon_class" :select-source="gender_list" :select-data="teacher_info.gender" @update:selectData="val => teacher_info.gender=val"> </input-list>
              </span>
          </span>
        </p>
        <p class="add_wrap_main_line">
          <span>
              <span class="add_teacher_info_title floatLeft">国&nbsp;&nbsp;&nbsp;籍：</span>
              <span class="add_teacher_info_answer floatLeft" style="width: 210px;" v-if="show_employment"></span>
              <span class="add_teacher_info_answer floatLeft" style="width: 210px;" v-if="!show_employment"><input-list :icon-class="icon_class" :select-source="area_list" :select-data="teacher_info.nationality" @update:selectData="val => teacher_info.nationality=val"> </input-list></span>
              <span class="add_teacher_info_title floatLeft">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</span>
              <span class="add_teacher_info_answer floatLeft" style="width: 140px;" v-if="show_employment"></span>
              <span class="add_teacher_info_answer floatLeft" style="width: 140px;" v-if="!show_employment"><input-list :icon-class="icon_class" :select-source="ethnic_list" :select-data="teacher_info.ethnicGroup" @update:selectData="val => teacher_info.ethnicGroup=val"> </input-list></span>
              <span class="add_teacher_info_title floatLeft">出生&nbsp;日期：</span>
              <span class="add_teacher_info_answer floatLeft" style="width: 130px;" v-if="show_employment">{{teacher_info.dateOfBirth | format_date('yyyy-MM-dd')}}</span>
              <span class="add_teacher_info_answer position_relative floatLeft" style="width: 130px;" v-if="!show_employment">
                <input-calendar :style-object="input_calendar_style" :calendar-value="teacher_info.dateOfBirth" @update:calendarValue="val => teacher_info.dateOfBirth = val"></input-calendar>
              </span>
          </span>
        </p>
        <p class="add_wrap_main_line">
          <span>
              <span class="add_teacher_info_title floatLeft" style="padding-right: 0;">证件类型：</span>
              <span class="add_teacher_info_id_type floatLeft" v-if="show_employment">

              </span>
              <span class="add_teacher_info_id_type floatLeft" v-if="!show_employment">
                <input-list :icon-class="icon_class" :select-source="id_type_list" :select-data="teacher_id_type" @update:selectData="val => teacher_id_type=val"> </input-list>
              </span>
              <span class="add_teacher_info_title floatLeft">身份&nbsp;证号：</span>
              <span class="add_teacher_info_id floatLeft" v-if="show_employment"></span>
              <span class="add_teacher_info_id floatLeft" v-if="!show_employment"><input type="text" class="edit_input add_teacher_info_input"></span>
          </span>
        </p>
      </div>
      <!--用工形式-->
      <p class="add_content_title" v-show="show_employment">
        <span class="icon_common teacher_type_ico"></span>
        <span>用工形式</span>
      </p>
      <div class="add_wrap_main add_teacher_info_main position_relative" v-show="show_employment">
        <p class="add_wrap_main_line">
          <span>
            <span class="add_teacher_info_title">用工形式：</span>
            <span class="add_teacher_info_employer">{{teacher_info.employmentTypeId}}</span>
            <span class="add_teacher_info_title">所属公司：</span>
            <span class="add_teacher_info_employer">{{teacher_info.standardTitle}}</span>
            <span class="add_teacher_info_title">所属部门：</span>
            <span class="add_teacher_info_employer add_teacher_margin_r0">{{teacher_info.standardTitle}}</span>
          </span>
        </p>
        <p class="add_wrap_main_line">
          <span>
            <span class="add_teacher_info_title">岗位名称：</span>
            <span class="add_teacher_info_employer">{{teacher_info.standardTitle}}</span>
            <span class="add_teacher_info_title">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
            <span class="add_teacher_info_employer">{{teacher_info.status}}</span>
            <span class="add_teacher_info_title">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：</span>
            <span class="add_teacher_info_employer add_teacher_margin_r0">{{teacher_info.addressId}}</span>
          </span>
        </p>
      </div>
      <!--资质等级-->
      <p class="add_content_title">
        <span class="icon_common teacher_level_ico"></span>
        <span>资质等级</span>
        <span class="icon_common add_circle_ico" style="float: right;margin-top: 8px;" @click="add_line_show=!add_line_show"></span>
      </p>
      <div class="add_teacher_employer_main">
        <div class="title">
          <span style="width: 140px;">
              资质等级
          </span><span style="width: 140px;">
              语言能力
          </span><span style="width: 130px;">
              可售课程
          </span><span style="width: 140px;">
              参考价位
          </span>
        </div>
        <div class="line" v-for="l in skill_list">
          <span style="width: 140px;">
              <span>{{l.qualificationRequirementId | id_name_filter(aptitude_rank_list)}}</span>
          </span><span style="width: 140px;">
              <span>{{l.linguisticCompetence}}</span>
          </span><span style="width: 130px;">
              <span>{{l.skillRequirement | id_name_filter(course_type_list)}}</span>
          </span><span style="width: 140px;">
              <span>{{l.referSalary}}</span>
          </span>
        </div>
        <div class="add_line" v-show="!add_line_show">
          <span style="width: 140px;">
            <input-list :icon-class="icon_class" :select-source="aptitude_rank_list" :select-data="qualification" @update:selectData="val => qualification=val"> </input-list>
          </span><span style="width: 140px;">
            <input class="edit_input" type="text" v-model="skill">
          </span><span style="width: 130px;">
            <input-list :icon-class="icon_class" :select-source="course_type_list" :select-data="course" @update:selectData="val => course=val"> </input-list>
          </span><span style="width: 140px;">
            <input class="edit_input" type="number" v-model="price">
          </span><span class="line_handle_black">
            <i class="icon_common save_icon" @click="save_grade_line_click()"></i>
            <i class="icon_common cancle_icon" @click="add_line_show=true"></i>
          </span>
        </div>
      </div>
      <!--简介-->
      <p class="add_content_title">
        <span class="icon_common teacher_abstract_ico"></span>
        <span>简介</span>
      </p>
      <div style="position: relative;background-color: white;">
        <textarea class="add_teacher_info_textarea" v-model="remarks"></textarea>
        <span class="self_placeholder" v-if="!remarks">请简单描述自己的简历</span>
      </div>
      <!--保存-->
      <div class="course_scheduling_operate add_teacher_info_operate">
        <span class="defaltBtn btnLength2 btnBgGreen" style="margin-right: 55px;" @click="save_teacher_info()">保存</span>
        <span class="defaltBtn btnLength2 btnBgGray" @click="cancel_teacher_info()">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import SelectAlert from '../../components/search_input/index'
import http from '../../http/http'
import inputList from '../../components/input_list/index'
import inputCalendar from '../../components/input_calendar/index'
import handle_fun from '../../handle_fun/index'
import store from '../../vuex_store/store'
export default{
  components:{
    SelectAlert,
    inputList,
    inputCalendar
  },
  data(){
    return{
      icon_class:'arrow_icon',
      my_email:null,
      teacher_info:{
        contactInfos:[
          {
            contactInfo:null
          }
        ],
        idDocs:[],
        gender:{},
        nationality:{},
        ethnicGroup:{},
        dateOfBirth:null
      },
      show_employment:false,
      gender_list:[
        {"id":1,"name":"男"},
        {"id":0,"name":"女"}
      ],
      area_list:[],
      ethnic_list:[],
      id_type_list:[
        {id:0, name:'身份证'},
        {id:1, name:'护照'},
        {id:2, name:'港澳台通行证'}
      ],
      placeholder_text:null,
      teacher_id_type:{},
      skill_list:[],
      qualification:{},
      course:{},
      input_calendar_style:{width:'100%'},
      add_line_show:false,
      person_id:null,
      skill:null,
      price:null,
      remarks:null,
      aptitude_rank_list:[],
      course_type_list:[]
    }
  },
  methods:{
    search_account: function () {
      if (this.my_email){
        if (handle_fun.check_email(this.my_email)){
          http.get_teahcer_by_email({customerId:localStorage.customerId,email:this.my_email}).then(res => {
            if (res.employment){
              res.employment.me.person.contactInfos.map((data, index) => {
                if (data.contactInfoType == 0){
                  data.contactInfo = parseFloat(data.contactInfo)
                }
              })
              this.teacher_info = {
                nameOriental:res.employment.me.person.nameOriental,
                middleName:res.employment.me.person.givenNameOriental,
                gender:res.employment.me.person.gender,
                dateOfBirth:res.employment.me.person.dateOfBirth,
                employmentTypeId:res.employment.employmentTypeId,
                standardTitle:res.employment.standardTitle,
                status:res.employment.status,
                addressId:res.employment.me.addressId,
                contactInfos:res.employment.me.person.contactInfos,
                employmentId:res.employment.employeeId
              }
              this.show_employment = true;
              this.person_id = res.employment.me.person.id;
            }
          })
        }else {
          store.dispatch('alert_handle_show', '邮箱格式不正确')
        }
      }
    },
    save_grade_line_click: function () {
      if (!this.qualification.name){
        store.dispatch('alert_handle_show', '请选择资质等级')
        return
      }else if (!this.skill){
        store.dispatch('alert_handle_show', '请选填写语言能力')
        return
      }else if (!this.course.name){
        store.dispatch('alert_handle_show', '请选择可售课程')
        return
      }else if (!this.price){
        store.dispatch('alert_handle_show', '请填写参考价位')
        return
      }
      let a = {
        linguisticCompetence:this.skill,
        qualificationRequirementId:this.qualification.id,
        referSalary:this.price,
        skillRequirement:this.course.id
      }
      this.skill_list.push(a);
      this.skill = null;
      this.qualification = {};
      this.price = null;
      this.course = {};
    },
    save_teacher_info: function () {
      if (!this.show_employment){

      }else {
        if (!this.skill_list.length){
          store.dispatch('alert_handle_show', '请添加资质等级')
          return
        }else if (!this.remarks){
          store.dispatch('alert_handle_show', '请填写简介')
          return
        }
        let param_erp = {
          "account":{
            "appCode":app_code,
            "customerId":localStorage.customerId,
            "username": this.my_email,
            "password":"123456",//初始密码
            "usernameType": "0", //用户关联类型    0: 邮箱，1: 手机号
            "person":{
              "id":this.person_id,
              "contactInfos":this.teacher_info.contactInfos
            }
          },
          "orgid":localStorage.orgId,
          "orgName":localStorage.orgName,
          "schoolTeacher":{
            "employmentId":this.teacher_info.employmentId || null,
            "isPrivate":true,//默认
            "orgId":localStorage.orgId,
            "personId":this.person_id,//id
            "remark": this.remarks,
            "personName":this.teacher_info.nameOriental
          },
          "teacherLevel":this.skill_list
        }
        http.add_teahcer_info(param_erp).then(res => {
          if (res.orgid == "-1"){
            store.dispatch('alert_handle_show', '邮箱或手机号重复')
          }else{
            history.back();
          }
        })
      }
    },
    cancel_teacher_info: function () {
      history.back()
    }
  },
  created(){
    http.get_area_list({parentId:-1}).then(res =>{
      this.area_list = res
    })
    http.get_ethnic_list({}).then(res => {
      this.ethnic_list = res
    })
    http.find_aptitude_rank({orgId:localStorage.orgId, customerId:localStorage.customerId, pageSize:1000, pageNum:1}).then(res => {
      this.aptitude_rank_list = res.results;
    })
    http.find_course_type_list({orgId:localStorage.orgId, appCode:app_code, customerId:localStorage.customerId, pageSize:1000, pageNum:1}).then(res => {
      this.course_type_list = res.results;
    })
  },
  mounted(){
    const ps = new perfectScrollbar('.add_wrap', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    })
  }
}
</script>

<style scoped>
  /*新增教师信息*/
  .add_teacher_base_main{
    height: auto;
    width:100%;
    padding: 59px 32px 39px 210px;
    background: #fff;
  }
  .add_teacher_info_title{
    padding-right: 14px;
    font-size: 16px;
    color: #767c8a;
  }
  .add_teacher_info_answer{
    width: 168px;
    height: 30px;
    padding-right: 18px;
    font-size: 16px;
    color: #393d46;
  }
  .add_teacher_info_number{
    width: 268px !important;
    font-size: 16px;
    margin-right: 56px;
    height: 30px;
  }
  .add_teacher_info_id_type{
    width: 190px !important;
    font-size: 16px;
    height: 30px;
    margin-right: 18px;
  }
  .add_teacher_info_id{
    width: 271px !important;
    font-size: 16px;
    height: 30px;
  }
  .add_teacher_info_employer{
    position: relative;
    width: 163px;
    height: 30px;
    margin-right: 40px;
    font-size: 16px;
  }
  .add_teacher_info_textarea{
    position: relative;
    width: 100%;
    height: 100px;
    border: none;
    resize: none;
    padding: 30px;
    outline: none;
    background-color: transparent;
    z-index: 10;
  }
  .self_placeholder{
    position: absolute;
    font-size: 16px; color: #eeeeee;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  .add_teacher_info_input{
    width: 100%;
  }
  .add_teacher_info_img{
    position: absolute;
    left: 39px;
    top: 63px;
    width: 144px;
    height: 145px;
  }
  .add_teacher_info_email{
    padding-right: 30px;
    font-size: 14px;
  }
  .required_sign{
    display: block;
    color: #ed4b3e;
    position: absolute;
    bottom: 0;
    right: -13px;
  }
  .add_teacher_info_operate{
    margin-top: 36px;
    margin-bottom: 0;
  }
  .add_teacher_margin_r0{
    margin-right: 0 !important;
  }
  .add_teacher_info_main{
    padding: 37px 33px 30px 41px !important;
    border: 0 !important;
  }
  .add_teacher_employer_main{
    width: 100%;
    padding-bottom: 20px;
    background-color: white;
  }
  .add_teacher_employer_main>.title{
    width: 100%; height: 40px;
    font-size: 16px;
    line-height: 40px;
    padding-left: 40px;
    background-color: #f1f1f1;
  }
  .add_teacher_employer_main>.title>span{
    display: inline-block;
  }
  .add_teacher_employer_main>.line{
    width: 100%; height: 40px;
    line-height: 40px;
    padding-left: 40px;
    font-size: 14px; color: #767c8a;
  }
  .add_teacher_employer_main>.line:nth-child(odd){

  }
  .add_teacher_employer_main>.line>span{
    display: inline-block;
  }
  .add_teacher_employer_main>.add_line{
    width: 100%;
    padding:5px 0 5px 40px;
    font-size: 14px; color: #767c8a;
    background-color: #f8f8f8;
  }
  .add_teacher_employer_main>.add_line>span{
    position: relative;
    padding-right: 10px;
    display: inline-block;
    height: 100%;
  }
  .add_teacher_employer_main>.add_line>.line_handle_black{
    float: right;
    margin-right: 20px;
  }
  #add_teacher_info_cal{
    padding-top: 13px !important;
  }
  #add_teacher_info_cal .course_scheduling_btm_content{
    margin-bottom: 30px;
  }
  #courseCalendarAlert .course_scheduling_btm_content{
    margin-bottom: 30px;
  }
  #add_teacher_info_cal .course_scheduling_btm_block{
    margin: 0;
    border: 0;
    height: 32px;
  }
  #courseCalendarAlert .course_scheduling_btm_block{
    margin: 0;
    border: 0;
    height: 25px;
    z-index: 1000;
  }
  #add_teacher_info_cal .course_scheduling_btm_hours{
    border: 0;
    line-height: 32px;
  }
  #courseCalendarAlert .course_scheduling_btm_hours{
    border: 0;
    line-height: 25px;
  }
  #add_teacher_info_cal .add_teacher_info_col{
    border: 1px solid #9a9a9a;
    margin-left: -1px;
    position: relative;
    margin-top: 3px;
  }
  #courseCalendarAlert .add_teacher_info_col{
    border: 1px solid #9a9a9a;
    margin-left: -1px;
    position: relative;
    margin-top: 3px;
  }
  #add_teacher_info_cal .course_scheduling_marks{
    left: 0;
    width: 122px;
    background: #e9f2f9;
  }
  #courseCalendarAlert .course_scheduling_marks{
    left: 0;
    width: 90px;
    background: #e9f2f9;
  }
  #add_teacher_info_cal .course_scheduling_today .course_scheduling_marks,#courseCalendarAlert .course_scheduling_today .course_scheduling_marks{
    background: #d0e7f5;
  }
  #add_teacher_info_cal .course_scheduling_weekend .course_scheduling_marks,#courseCalendarAlert .course_scheduling_weekend .course_scheduling_marks{
    background: #ffedeb;
  }
  #add_teacher_info_cal .course_scheduling_today .course_scheduling_btm_week,#courseCalendarAlert .course_scheduling_today .course_scheduling_btm_week{
    border-bottom:3px solid #5a7391 !important;
  }
  #add_teacher_info_cal .course_scheduling_btm_sep,#courseCalendarAlert .course_scheduling_btm_sep{
    border-top:1px solid #eaebed;
    margin: 0;
    bottom: 0;
    z-index: 0;
  }
  .add_teacher_info_time{
    line-height: 16px;
  }
  .add_teacher_info_calender{
    width: 36px;
    position: relative;
  }
  .add_teacher_info_calender .course_scheduling_calender_blue{
    margin-right: 6px !important;
  }
  .add_teacher_info_no_border{
    border: 0 !important;
  }
  .add_teacher_info_answer .selectboxCommonItem,.add_teacher_info_answer .selectboxCommonUl{
    float: none !important;
  }
  .add_teacher_hidden_input{
    position: absolute;
    /*top: 3px;*/
    left: -305px;
    width: 30px;
    height: 40px;
    visibility: hidden;
  }
</style>
