<template>
  <div>
    <div class="body_right">
      <div class="body_right_content">
        <div class="body_right_top">
          <span class="defaltBtn btnLength4 btnBgGreen" @click="add_line_show=true">新增科目</span>
          <search-input :input-width="search_input_width" :search="searchKey" @update:search="val => searchKey = val"  :placeholder="self_placeholder" @clickSearch="search_event"></search-input>
          <!--<span class="queryBtn" @click="search_course_click">查询</span>-->
          <!--<input type="text" class="queryTxtbox" v-model="search_course" placeholder="费用科目、预算科目">-->
        </div>
        <div class="body_right_main">
          <div class="right_tab_head">
            <div class="subjects_relation_name1">费用科目</div>
            <div class="subjects_relation_name2">预算科目</div>
            <div class="subjects_relation_type1">预算类型</div>
            <div class="subjects_relation_type2">会计科目</div>
            <div class="set_course_td_operate"></div>
          </div>
          <div class="right_tab_body_wrapper">
            <div class="right_tab_body">
              <div class="right_tab_line" v-for="(l,$index) in kemu_guanxi_list">
                <div class="subjects_relation_name1">
                  <input v-if="l.editIsShow" type="text" class="right_tab_line_input" v-model="add_kemu_params.name">
                  <span v-if="!l.editIsShow">{{l.name}}</span>
                </div>
                <div class="subjects_relation_name2">
                            <span v-if="l.editIsShow" class="add_main_line_inputbox" style="display: inline-block;height: 80%;">
                                <input type="text" class="edit_input add_product_input_code padding_right_30" style="height: 100%;" v-model="add_kemu_params.budgetarySubjectsName" readonly>
                                <span class="input_search_ico pro_approval_detail_search" @click="select_yusuan_kemu"></span>
                            </span>
                  <span v-if="!l.editIsShow">{{l.budgetarySubjectsName}}</span>
                </div>
                <div class="subjects_relation_type1">
                  <input v-if="l.editIsShow" type="text" class="right_tab_line_input" v-model="add_kemu_params.budgetaryTypeName" readonly>
                  <span v-if="!l.editIsShow">{{l.budgetaryTypeName}}</span>
                </div>
                <div class="subjects_relation_type2">
                            <span v-if="l.editIsShow" class="add_main_line_inputbox" style="display: inline-block;height: 80%;">
                                <input type="text" class="edit_input add_product_input_code padding_right_30" style="height: 100%;" v-model="add_kemu_params.recordsSubjectsNema" readonly>
                                <span class="input_search_ico pro_approval_detail_search" @click="select_kuaiji_kemu"></span>
                            </span>
                  <span v-if="!l.editIsShow">{{l.recordsSubjectsNema}}</span>
                </div>
                <div class="set_course_td_operate" v-show="!l.editIsShow">
                  <span class="grayDeleteIcon floatRight" @click="delete_kemu_guanxi_line(l, $index)"></span>
                  <span class="editIcon floatRight" @click="edit_kemu_guanxi_line(l)"></span>
                </div>
                <div class="set_course_td_operate" v-show="l.editIsShow">
                  <span class="icon_common cancle_icon" style="margin-top: 2px;" @click="kemu_guanxi_line_cancel(l)"></span>
                  <span class="icon_common save_icon" style="margin-right: 12px;" @click="kemu_guanxi_line_save(l, $index)"></span>
                </div>
              </div>
              <div class="right_tab_line" v-if="add_line_show">
                <div class="subjects_relation_name1">
                  <input type="text" class="right_tab_line_input" v-model="add_kemu_params.name">
                </div>
                <div class="subjects_relation_name2">
                            <span class="add_main_line_inputbox" style="display: inline-block;height: 80%;">
                                <input type="text" class="edit_input add_product_input_code padding_right_30" style="height: 100%;" v-model="add_kemu_params.budgetarySubjectsName" readonly>
                                <span class="input_search_ico pro_approval_detail_search" @click="select_yusuan_kemu"></span>
                            </span>
                </div>
                <span class="subjects_relation_type1" style="float: left;padding-left: 20px;padding-top: 4px;height: 100%;line-height: 30px;">
                    <expense-subject-selectbox v-if="select_erp=='new'||(select_erp=='false')" style="display: inline-block;height: 80%;" select-width="thisWidth1" select-icon="thisIcon1" select-source="yusuan_type_list" select-data="add_kemu_params.typeObject"></expense-subject-selectbox>
                    <input v-if="select_erp!='new'&&(select_erp=='true')" type="text" class="right_tab_line_input" v-model="add_kemu_params.budgetaryTypeName" readonly>
                </span>
                <div class="subjects_relation_type2">
                            <span class="add_main_line_inputbox" style="display: inline-block;height: 80%;">
                                <input type="text" class="edit_input add_product_input_code padding_right_30" style="height: 100%;" v-model="add_kemu_params.recordsSubjectsNema" readonly>
                                <span class="input_search_ico pro_approval_detail_search" @click="select_kuaiji_kemu()"></span>
                            </span>
                </div>
                <div class="set_course_td_operate">
                  <span class="icon_common cancle_icon" style="margin-top: 2px;" @click="add_cancle_line()"></span>
                  <span class="icon_common save_icon" style="margin-right: 12px;" @click="add_save_line()"></span>
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
  export default {
    components:{
      SearchInput
    },
    data(){
      return{
        select_erp:false,
        kemu_guanxi_list:[],
        search_input_width:400,
        self_placeholder:'费用科目、预算科目',
        searchKey:null,
        add_line_show:false,
        add_kemu_params:{}
      }
    },
    methods:{
      search_event:function () {

      },
      select_yusuan_kemu:function () {

      }
    },
    created(){
      http.get_kemu_guanxi_list({orgId:localStorage.orgId}).then(res => {
        this.kemu_guanxi_list = res;
      })
    }
  }
</script>


<style lang="scss" scoped>
  .body_right{
    position: absolute;
    top:0; left: 0;
    height: 100%;
    width: 100%;
    min-width: 1000px;
    padding-top: 101px;
    padding-left: 221px;
    z-index: 10;
    .body_right_content{
      position: relative;
      height: 100%;
      width: 90%;
      margin: 0 auto;
      .body_right_top{
        position: absolute;
        top:30px;
        height: 30px;
        width: 100%;
        span{
          display: block;
          float: right;
          height: 30px;
        }
      }
      .right_tab_line{
        .right_tab_line_input{
          height: 80%;
          width: 100%;
          border: none;
          color: #767c8a;
          background: #eaf1fe;
        }
        .add_main_line_inputbox{
          position: relative;
          .edit_input{
            height: 30px;
            width: 100%;
            border: none;
            color: #767c8a;
            padding: 0px 5px;
            background: #eaf1fe;
          }
        }
        .add_main_line_inputbox{color: #767c8a;}
        .input_search_ico{
          display: block;
          width: 18px;
          height: 20px;
          background-image: url("../../assets/imgs/icon2.png");
          background-position: -176px -9px;
          cursor: pointer;
        }
        .pro_approval_detail_search{
          position: absolute;
          top: 5px;
          right: 9px;
        }
      }

      .subjects_relation_name1{
        width: 130px;
      }
      .subjects_relation_name2{
        width: 130px;
      }
      .subjects_relation_type1{
        width: 130px;
      }
      .subjects_relation_type2{
        width: 130px;
      }
    }
  }
</style>
