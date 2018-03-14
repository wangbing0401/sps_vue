<template>
  <div class="centerBody">
    <div class="centerBodyInputGroup">
      <router-link tag="span" :to="{path:'/addTeacherInfo'}" class="defaltBtn btnLength4 btnBgGreen floatRight">新增教师</router-link>
      <span class="defaltBtn btnLength4 btnBorderGreen floatRight" style="position: relative;margin-right: 10px;">
			  导入
			<input class="upload_file_input" type="file" name="teacherFile" id="uploadTeacherBtn">
		</span>
      <search-input :input-width="search_input_width" :search="searchKey" @update:search="val => searchKey = val"  :placeholder="self_placeholder" @clickSearch="search_event"></search-input>
    </div>
    <div class="centerBodyTab">
      <div class="centerBodyTabHead">
        <div style="padding-left: 30px;width: 25%;">登录邮箱</div>
        <div class="course_sceduling_list_major">教师名称</div>
        <div class="course_sceduling_list_period">性别</div>
        <div class="course_sceduling_list_tel">联系电话</div>
        <div class="course_sceduling_list_starttime">国籍</div>
        <div class="course_sceduling_list_endtime">证件类型</div>
        <div style="width: 20%;">证件号码</div>
      </div>
      <div class="centerBodyTabBodyWrapper">
        <div class="centerBodyTabBody">
          <div class="centerBodyTabBodyLine" v-for="l in teahcer_info_list"  @click="go_detail(l)">
            <div style="padding-left: 30px;width: 25%;">
              <span v-for="n in l.person.contactInfos" v-if="n.contactInfoType==4">{{n.contactInfo}}</span>
            </div>
            <div class="course_sceduling_list_major">{{l.schoolTeacher.employmentId?l.person.nameOriental:l.person.givenNameOriental}}</div>
            <div class="course_sceduling_list_period">{{l.person.gender | sex_filter}}</div>
            <div class="course_sceduling_list_tel">
              <span v-for="n in l.person.contactInfos" v-if="n.contactInfoType==0">{{n.contactInfo}}</span>
            </div>
            <div class="course_sceduling_list_starttime">{{l.person.nationality | id_name_filter(country_list)}}</div>
            <div class="course_sceduling_list_endtime" v-if="l.person.idDocs.length">{{l.person.idDocs[0].identificationTypeId | id_name_filter(id_type_list)}}</div>
            <div style="width: 20%;">{{l.person.idDocs.length?l.person.idDocs[0].idNumber:''}}</div>
          </div>
        </div>
      </div>
    </div>
    <paging :total-page="temp_data.numPages" @getPages="get_list"></paging>
  </div>
</template>

<script>
import http from '../../http/http'
import SearchInput from '../../components/search_input/index'
import paging from '../../components/paging/index'
export default{
  components:{
    SearchInput,
    paging
  },
  data(){
    return{
      teahcer_info_list:[],
      country_list:[],
      pageSize:20,
      search_input_width:400,
      self_placeholder:'教师名称、资质等级',
      searchKey:null,
      id_type_list:[
        {id:0, name:'身份证'},
        {id:1, name:'护照'},
        {id:2, name:'港澳台通行证'}
      ],
      temp_data:{}
    }
  },
  methods:{
    search_event: function (searchKey) {
      //      0教师  1助教
      http.get_teahcer_info_list({"orgId":localStorage.orgId,"type":0, pageSize:this.pageSize, pageNum:1, arguments:searchKey}).then(res => {
        this.teahcer_info_list=res.results;
      })
    },
    get_list: function (page) {
      http.get_teahcer_info_list({"orgId":localStorage.orgId,"type":0, pageSize:this.pageSize, pageNum:page, arguments:this.searchKey}).then(res => {
        this.courseTemplateList = res.results
      })
    }
  },
  created(){
    http.get_area_list({parentId:-1}).then(res1 => {
      this.country_list = res1
      http.get_teahcer_info_list({"orgId":localStorage.orgId,"type":0, pageSize:this.pageSize, pageNum:1, arguments:this.searchKey}).then(res2 => {
        this.teahcer_info_list=res2.results
        this.$set(this.temp_data, 'numPages', res2.pageNum)
      })
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

<style lang="scss">

</style>
