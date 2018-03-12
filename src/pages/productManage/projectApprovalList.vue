<template>
  <div class="centerBody">
    <div class="centerBodyInputGroup">
      <span class="defaltBtn btnLength4 floatRight" style="margin-left: 10px;" @click="go_state(1)" :class="select_flag?'btnBgGreen':'btnBgGray'">发布产品</span>
      <search-input :input-width="search_input_width" :search="searchKey" @update:search="val => searchKey = val"  :placeholder="self_placeholder" @clickSearch="search_event"></search-input>
    </div>
    <div class="centerBodyTab">
      <div class="centerBodyTabHead" style="padding-left: 0;">
        <div class="proApprovalTdCheckbox"></div>
        <div class="proApprovalTdCode">产品编码</div>
        <div class="proApprovalTdName">产品名称</div>
        <div class="proApprovalTdDate">制单日期</div>
        <div class="proApprovalTdStarttime">产品开始时间</div>
        <div class="proApprovalTdEndtime">产品结束时间</div>
        <div class="proApprovalTdType">产品类型</div>
        <div class="proApprovalTdStatus">状态</div>
        <div class="proApprovalTdOperate" style="text-align: center;">查看报价单</div>
      </div>
      <div class="centerBodyTabBodyWrapper">
        <div class="centerBodyTabBody">
          <div class="centerBodyTabBodyLine" style="padding-left: 0;" v-for="l in project_list" @click="go_project_detail(l)">
            <div class="proApprovalTdCheckbox" @click.stop="project_select(l)">
              <span :class="select_flag==l.id?'checkboxSelected':'checkboxNormal'"></span>
            </div>
            <div class="proApprovalTdCode" :title="l.code">{{l.code}}</div>
            <div class="proApprovalTdName" :title="l.productName">{{l.productName}}</div>
            <div class="proApprovalTdDate">{{l.createdTime | format_date('yyyy-MM-dd')}}</div>
            <div class="proApprovalTdStarttime">{{l.startTime | format_date('yyyy-MM-dd')}}</div>
            <div class="proApprovalTdEndtime">{{l.endTime | format_date('yyyy-MM-dd')}}</div>
            <div class="proApprovalTdType">{{l.productTypeName}}</div>
            <div class="proApprovalTdStatus">{{l.status | productStatus}}</div>
            <div class="proApprovalTdOperate" style="text-align: center;">
              <span style="display: inline-block;" class="icon_common look_advanceorder_icon" @click.stop="quotation_go(l);"></span>
            </div>
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
import store from '../../vuex_store/store'
export default{
  components:{
    SearchInput,
    paging
  },
  data(){
    return{
      project_list:[],
      pageSize:20,
      select_flag: null,
      search_input_width:400,
      self_placeholder:'请输入项目名称',
      searchKey:null,
      can_edit_product:false,
      temp_data:{}
    }
  },
  methods:{
    search_event: function (searchKey) {
      http.project_approval_list({"orgId":localStorage.orgId,'pageNo':1,'pageSize':this.pageSize, searchKey:searchKey}).then(res => {
        this.project_list = res.results
      })
    },
    go_state: function (flag) {
      if(this.select_flag){
        if(flag == 1){
          this.$router.push('quotation')
        }else if(flag == 2 && this.can_edit_product){
          localStorage.productDetailisEdit = 1
          this.$router.push('productDetail')
        }
      }else{
        store.dispatch('alert_handle_show', '请选择产品')
      }
    },
    project_select: function (l) {
      if(l.status != 2){
        this.can_edit_product = true
      }
      if (l.id == this.select_flag){
        this.select_flag = null
      }else {
        this.select_flag = l.id
      }
      if(this.select_flag){
        localStorage.productBaseId = l.id
      }else{
        localStorage.productBaseId = null
      }
    },
    get_list: function (page) {
      http.project_approval_list({"orgId":localStorage.orgId,'pageNo':page,'pageSize':this.pageSize, searchKey:this.searchKey}).then(res => {
        this.project_list = res.results
      })
    }
  },
  created(){
    http.project_approval_list({"orgId":localStorage.orgId,'pageNo':1,'pageSize':this.pageSize, searchKey:this.searchKey}).then(res => {
      this.project_list = res.results
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
