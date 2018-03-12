<template>
  <div>
    <div class="body_right">
      <div class="body_right_content">
        <div class="body_right_top">
          <!--<span class="defaltBtn btnLength4 btnBgGreen" ng-click="addCourse()">新建产品类型</span>-->
        </div>
        <div class="body_right_main">
          <div class="right_tab_head">
            <div class="set_course_td_code">编码</div>
            <div class="set_course_td_name">产品类型</div>
            <div class="set_course_td_operate"></div>
          </div>
          <div class="right_tab_body_wrapper">
            <div class="right_tab_body">
              <div class="right_tab_line" v-for="(l,$index) in product_type_list">
                <div class="set_course_td_code">
                  <span v-if="!l.editIsShow">{{l.code}}</span>
                  <input type="text" class="right_tab_line_input" v-if="l.editIsShow" v-model="edit_product_line_data.code">
                </div>
                <div class="set_course_td_name">
                  <span v-if="!l.editIsShow">{{l.name}}</span>
                  <input type="text" class="right_tab_line_input" v-if="l.editIsShow" v-model="edit_product_line_data.name">
                </div>
                <!--<div class="set_course_td_operate" ng-show="!l.editIsShow">-->
                <!--<span class="grayDeleteIcon floatRight" ng-click="delete_course_line(l, $index)"></span>-->
                <!--<span class="editIcon floatRight" ng-click="edit_course_line(l)"></span>-->
                <!--</div>-->
                <!--<div class="set_course_td_operate" ng-show="l.editIsShow">-->
                <!--<span class="defaltBtn btnLength2 btnBgGray" ng-click="course_line_cancel(l)">取消</span>-->
                <!--<span class="defaltBtn btnLength2 btnBgGreen" ng-click="course_line_save(l)">保存</span>-->
                <!--</div>-->
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
  export default {
    data(){
      return{
        product_type_list:[]
      }
    },
    created(){
      http.find_product_type_list({orgId:localStorage.orgId,customerId:localStorage.customerId}).then(res => {
        this.product_type_list = res;
        console.log(this.product_type_list);
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>

