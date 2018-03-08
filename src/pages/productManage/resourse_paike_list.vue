<template>
  <div class="centerBody">
    <div class="centerBodyInputGroup">
      <search-input :input-width="search_input_width" :search="searchKey" @update:search="val => searchKey = val"  :placeholder="self_placeholder" @clickSearch="search_event"></search-input>
    </div>
    <div class="centerBodyTab">
      <div class="centerBodyTabHead">
        <div class="course_sceduling_list_name">课程名称</div>
        <div class="course_sceduling_list_major">专业</div>
        <div class="course_sceduling_list_period">课时</div>
        <div class="course_sceduling_list_unit">分钟/节</div>
        <div class="course_sceduling_list_starttime">开始时间</div>
        <div class="course_sceduling_list_endtime">结束时间</div>
        <div class="course_sceduling_list_aptitude">教师资质</div>
        <div class="course_sceduling_list_remark">培训场地描述</div>
        <div class="course_sceduling_list_operate"></div>
      </div>
      <div class="centerBodyTabBodyWrapper">
        <div class="centerBodyTabBody">
          <div class="centerBodyTabBodyLine" v-for="l in courseSchedulingList">
            <div class="course_sceduling_list_name" :title="l.productBase.name">{{l.productBase.name}}</div>
            <div class="course_sceduling_list_major">{{l.skillRequirement.name}}</div>
            <div class="course_sceduling_list_period">{{l.productBase.period}}</div>
            <div class="course_sceduling_list_unit">{{l.productBase.unitDuration}}</div>
            <div class="course_sceduling_list_starttime">{{l.productBase.startTime|format_date('yyyy-MM-dd')}}</div>
            <div class="course_sceduling_list_endtime">{{l.productBase.endTime|format_date('yyyy-MM-dd')}}</div>
            <div class="course_sceduling_list_aptitude">{{l.qualificationRequirement.name}}</div>
            <div class="course_sceduling_list_remark" :title="l.resourceRequirement.remarks">{{l.resourceRequirement.remarks}}</div>
            <div class="course_sceduling_list_operate">
              <span class="icon_common arrangeIcon1" style="margin-top: 10px;margin-left: 10px;" @click="toAddCourseSechduling(l)"></span>
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
export default{
  components:{
    SearchInput
  },
  data(){
    return{
      courseSchedulingList:[],
      pageSize:20,
      search_input_width:400,
      self_placeholder:'请输入课程名称',
      searchKey:null
    }
  },
  methods:{
    search_event: function (searchKey) {
      http.get_course_scheduling_list({orgId:localStorage.orgId,searchKey:searchKey,pageNum:1,pageSize:this.pageSize}).then(res => {
        this.courseSchedulingList=res.results
      })
    }
  },
  created(){
    http.get_course_scheduling_list({orgId:localStorage.orgId,searchKey:this.searchKey,pageNum:1,pageSize:this.pageSize}).then(res => {
      this.courseSchedulingList=res.results
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
