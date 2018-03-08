<template>
  <div class="centerBody">
    <div class="centerBodyInputGroup">
      <span class="defaltBtn btnLength4 btnBgGreen floatRight" @click="addCourse()">新增课程</span>
      <span class="defaltBtn btnLength4 btnBorderGreen floatRight" style="margin-right: 10px" @click="toInitiateProject()">组合产品</span>
      <search-input :input-width="search_input_width" :search="searchKey" @update:search="val => searchKey = val"  :placeholder="self_placeholder" @clickSearch="search_event"></search-input>
    </div>
    <div class="centerBodyTab">
      <div class="centerBodyTabHead" style="padding-left: 0;">
        <div class="pd_td_checkbox"> </div>
        <div class="pd_td_code">课程名称</div>
        <div class="pd_td_name">专业</div>
        <div class="pd_td_date1">课时</div>
        <div class="pd_td_date2">分钟/节</div>
        <div class="pd_td_date">开始日期</div>
        <div class="pd_td_type">结束日期</div>
        <div class="pd_td_status">教师资质</div>
        <div class="pd_td_status1">场地描述</div>
        <!--<div class="pd_td_edit"> </div>-->
      </div>
      <div class="centerBodyTabBodyWrapper">
        <div class="centerBodyTabBody">
          <div class="centerBodyTabBodyLine" style="padding-left: 0;" v-for="(l, index) in courseTemplateList">
            <div class="pd_td_checkbox" @click="selectProduct(l,index);$event.stopPropagation();">
              <span class="icon_common" :class="selectedProductIds.indexOf(l.productBase.id)==-1?'pd_td_checkbox_icon':'pd_td_checkbox_checkicon'"></span>
            </div>
            <div class="pd_td_code" :title="l.productBase.name">
              <span v-show="!l.editIsShow">{{l.productBase.name}}</span>
              <!--<input type="text" class="right_tab_line_input" ng-show="l.editIsShow" ng-model="l.productBase.productCode">-->
            </div>
            <div class="pd_td_name" :title="l.skillRequirement.name">
              <span v-show="!l.editIsShow">{{l.skillRequirement.name}}</span>
              <!--<input type="text" class="right_tab_line_input" ng-show="l.editIsShow" ng-model="l.productBase.name">-->
            </div>
            <div class="pd_td_date1">
              <span v-show="!l.editIsShow">{{l.productBase.period}}</span>
              <!--<input type="text" class="right_tab_line_input" ng-show="l.editIsShow" ng-model="l.skillRequirement.name">-->
            </div>
            <div class="pd_td_date2" style="padding-left: 10px;">
              <span v-show="!l.editIsShow"> {{l.productBase.unitDuration}}</span>
              <!--<input type="text" class="right_tab_line_input" ng-show="l.editIsShow" ng-model="l.productBase.unitDuration">-->
            </div>
            <div class="pd_td_date">
              <span v-show="!l.editIsShow">{{l.productBase.startTime|format_date('yyyy-MM-dd')}}</span>
              <!--<input type="text" class="right_tab_line_input" ng-show="l.editIsShow" ng-model="l.qualificationRequirement.name">-->
            </div>
            <div class="pd_td_type">
              <span v-show="!l.editIsShow">{{l.productBase.endTime|format_date('yyyy-MM-dd')}}</span>
              <!--<input type="text" class="right_tab_line_input" ng-show="l.editIsShow" ng-model="l.qualificationRequirement.name">-->
            </div>
            <div class="pd_td_status">
              <span v-show="!l.editIsShow">{{l.qualificationRequirement.name}}</span>
              <!--<input type="text" class="right_tab_line_input" ng-show="l.editIsShow" ng-model="l.qualificationRequirement.name">-->
            </div>
            <div class="pd_td_status1">
              <span v-show="!l.editIsShow" :title="l.resourceRequirement.remarks">{{l.resourceRequirement.remarks}}</span>
              <!--<input type="text" class="right_tab_line_input" ng-show="l.editIsShow" ng-model="l.qualificationRequirement.name">-->
            </div>
            <div class="ct_td_operate">
              <span class="editIcon" @click="edit_line(l)"></span>
              <span class="grayDeleteIcon" @click="delete_line(l)"></span>
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
      courseTemplateList:[],
      pageSize:15,
      selectedProductIds:[],
      search_input_width:400,
      self_placeholder:'请输入课程名称',
      searchKey:null
    }
  },
  methods:{
    addCourse: function () {
      console.log(this.searchKey)
    },
    toInitiateProject: function () {

    },
    selectProduct: function (l, index) {
      if(this.selectedProductIds.indexOf(l.productBase.id)==-1){
        this.selectedProductIds.push(l.productBase.id);
      }else{
        this.selectedProductIds.splice(this.selectedProductIds.indexOf(l.productBase.id),1)
      }
    },
    edit_line: function () {

    },
    delete_line: function () {

    },
    search_event: function (searchKey) {
      http.get_courseTemplate_list({type:1,searchKey:searchKey,orgId:localStorage.orgId,customerId:localStorage.customerId,pageSize:this.pageSize,pageNum:1,isTemplate:false}).then(res => {
        this.courseTemplateList = res.results
      })
    }
  },
  created(){
    http.get_courseTemplate_list({type:1,searchKey:this.searchKey,orgId:localStorage.orgId,customerId:localStorage.customerId,pageSize:this.pageSize,pageNum:1,isTemplate:false}).then(res => {
      this.courseTemplateList = res.results
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
