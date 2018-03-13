<template>
  <div class="centerBody">
    <div class="centerBodyInputGroup">
      <span class="defaltBtn btnLength4 btnBgGreen floatRight">新增教室</span>
      <search-input :input-width="search_input_width" :search="searchKey" @update:search="val => searchKey = val"  :placeholder="self_placeholder" @clickSearch="search_event"></search-input>
    </div>
    <div class="centerBodyTab">
      <div class="centerBodyTabHead">
        <div class="classroom_info_list_code" style="padding-left: 30px;">场地编码</div>
        <div class="classroom_info_list_name">场地名称</div>
        <div style="text-align: center;width: 12%;">可容纳人数</div>
        <div class="classroom_info_list_prise" style="padding-left: 30px;">场地地点</div>
        <div class="classroom_info_list_operate"></div>
      </div>
      <div class="centerBodyTabBodyWrapper">
        <div class="centerBodyTabBody">
          <div class="centerBodyTabBodyLine" v-for="(l, index) in classroom_info_list" @click="go_detail(l)">
            <div class="classroom_info_list_code" style="padding-left: 30px;">{{l.code}}</div>
            <div class="classroom_info_list_name">{{l.name}}</div>
            <div style="text-align: center;width: 12%;">{{l.capacity}}</div>
            <div class="classroom_info_list_prise" style="padding-left: 30px;" :title="l.addressDetail">{{l.addressDetail}}</div>
            <div class="set_course_td_operate">
              <span class="icon_common grayDeleteIcon" @click.stop="del_classroom(l,index)"></span>
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
      classroom_info_list:[],
      search_input_width:400,
      self_placeholder:'场地名称、地点、人数',
      searchKey:null,
    }
  },
  methods:{
    search_event: function (searchKey) {
      http.get_classroom_info_list({orgId:localStorage.orgId,search:searchKey}).then(res => {
        this.classroom_info_list=res;
      })
    },
  },
  created(){
    http.get_classroom_info_list({orgId:localStorage.orgId,search:this.searchKey}).then(res => {
      this.classroom_info_list=res;
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
