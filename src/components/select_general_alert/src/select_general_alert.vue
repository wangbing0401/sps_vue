<template>
  <div v-show="alertShow" class="selectCourseAlert alert_true alert_enter" style="width: 450px;height: 370px;">
    <div class="alert_head">预算科目<span class="alert_head_icon" @click="closeAlert()"></span></div>
    <div class="alert_divide_line"></div>
    <div class="select_alert_input_group">
      <span class="alert_search_ico"></span>
      <input type="text" class="select_alert_input" placeholder="预算项" v-model="searchKey">
    </div>
    <div class="select_alert_tab" style="width: 100%;">
      <div class="select_alert_tabhead">
        <div class="select_course_alert_checkbox"></div>
        <div class="select_course_alert_code" style="font-size: 14px;">预算项</div>
        <div class="select_course_alert_name" style="font-size: 14px;">科目编码</div>
      </div>
      <div class="select_alert_tabbody">
        <div class="select_product_alert_tabline" v-for="(l,$index) in resourceList" :style="line_style_fun(l)" @click="line_click(l)">
          <div class="select_course_alert_checkbox"></div>
          <div class="select_course_alert_code textLeft">{{l.accounting.ysx}}</div>
          <div class="select_course_alert_name textLeft">{{l.accounting.id}}</div>
        </div>
      </div>
    </div>
    <div class="select_alert_btngroup select_course_alert_btngroup">
      <span class="defaltBtn btnLength6 btnBgGreen margin_right_twenty" @click="commit()">确定</span>
      <span class="defaltBtn btnLength6 btnBorderGreen" @click="closeAlert()">取消</span>
    </div>
  </div>
</template>

<script>
  export  default {
    props:{
      alertShow:Boolean,
      resourceList:Array
    },
    data(){
      return{
        searchKey:null,
        selected_line:{}
      }
    },
    methods:{
      line_style_fun:function (l) {
        if (l.type == this.selected_line.type && l.accounting.id == this.selected_line.accounting.id){
          return {color:'#4679c7'}
        }else {
          return {}
        }
      },
      line_click:function (l) {
        this.selected_line = l;
      },
      commit:function () {
        this.$emit('clickCommit',this.selected_line);
      }
    },
    mounted(){
      const ps = new perfectScrollbar('.select_alert_tabbody', {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20
      })
    }
  }

</script>

<style lang="scss" scoped>
  .alert_head_icon{
    background-image: url('../../../assets/imgs/icon2.png');
  }
  .select_alert_input_group .alert_search_ico{
    background: url("../../../assets/imgs/icon2.png");
    background-position: -336px -36px;
  }

</style>
