<template>
  <span v-if="alertShow" :class="className" :style="styleStr">
    <input type="text" class="edit_input add_product_input_code padding_right_30" style="height: 100%;" v-model="budgetarySubjectsName" readonly>
    <span class="input_search_ico pro_approval_detail_search" @click="searchAlertShow"></span>
  </span>
</template>

<script>
  export default {
    props:{
      alertShow:Boolean,
      className:String,
      styleStr:String,
      budgetarySubjectsName:String
    },
    methods:{
      searchAlertShow:function () {
        this.$emit('clickCommit')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .add_main_line_inputbox{
    position: relative;
    color: #767c8a;
    .edit_input{
      height: 30px;
      width: 100%;
      border: none;
      color: #767c8a;
      padding: 0px 5px;
      background: #eaf1fe;
    }
  }
  .input_search_ico{
    display: block;
    width: 18px;
    height: 20px;
    background-image: url("../../../assets/imgs/icon2.png");
    background-position: -176px -9px;
    cursor: pointer;
  }
  .pro_approval_detail_search{
    position: absolute;
    top: 5px;
    right: 9px;
  }
</style>
