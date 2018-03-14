<template>
  <div class="selectboxWrapper" @mouseleave="optionIsShow=false">
    <input type="text" class="selectbox_txtbox" v-model="selectData.name" @click="optionIsShowFn()" :placeholder="placeholderText" readonly>
    <span :class="iconClass" class="selectbox_txtbox_icon" @click="optionIsShow=true"></span>
    <span class="selectboxCommon" v-show="optionIsShow">
        <span class="selectboxCommonUl">
            <span class="selectboxCommonItem" v-for="l in selectSource" @click="select(l)">{{l.name}}</span>
        </span>
    </span>
  </div>
</template>

<script>
export default{
  props:{
    placeholderText:String,
    selectSource:Array,
    selectData:Object,
    iconClass:String
  },
  data(){
    return{
      optionIsShow:false
    }
  },
  methods:{
    optionIsShowFn: function () {
      this.optionIsShow = true
    },
    select: function (l) {
      this.optionIsShow = false
      this.$emit('update:selectData', l)
    }
  },
  mounted(){
//    if (this.selectSource && this.selectSource.length>7){
//      const ps = new perfectScrollbar('.selectboxCommon', {
//        wheelSpeed: 2,
//        wheelPropagation: true,
//        minScrollbarLength: 20
//      })
//    }
  }
}
</script>

<style lang="scss" scoped>
  /*****下拉框组件*****/
  .selectboxWrapper{
    position: relative;
    display: inline-block;
    height: 30px; width: 100%;
    .selectbox_txtbox{
      height: 100%;
      width: 100%;
      padding: 0px 15px 0px 5px;
      color: #767c8a;
      border: none;
      background: #eaf1fe;
    }
    .selectbox_txtbox_icon{
      display: block;
      position: absolute;
      right: 5px;
      top:11px;
      cursor: pointer;
    }
    .arrow_icon{
      height: 8px;
      width: 13px;
      background-image: url('../../../assets/imgs/icon.png');
      background-position: -142px -161px;
    }
    .selectboxCommon{
      position: absolute;
      top:30px;
      right: 0;
      max-height: 200px;
      width: 100%;
      border: #eaf1fe solid 1px;
      box-shadow: 0px 0px 15px #eee;
      background: #fff;
      overflow: scroll;
      z-index: 100;
      .selectboxCommonUl{
        display: block; width: 100%;
        .selectboxCommonItem{
          display: block;
          width: 100%;
          padding:5px;
          line-height: 17px;
          color: #999;
          cursor: pointer;
          &:hover{
            background: #f1f1f1;
          }
        }
      }
    }
  }
</style>
