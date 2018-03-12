<template>
  <div class="bodyHasSplitted">
    <div class="body_left">
      <div class="body_left_title">
        <span class="body_left_title_icon"></span>
        <span>系统设置</span>
      </div>
      <div class="body_left_nav">
        <div>
          <!--<p class="body_left_item" ui-sref="systemManageIndex.courseTemplateList" ng-style="router_name=='systemManageIndex.courseTemplateList'?{borderLeft:'#4679c7 solid 3px',color:'#4679c7',background:'#f6f7fb'}:{}">-->
          <!--<span>课程模板设置</span>-->
          <!--</p>-->
          <router-link tag="p" class="body_left_item" to="/systemManageIndex/setCourseInfo"  :style="router_name=='/systemManageIndex/setCourseInfo'?{borderLeft:'#4679c7 solid 3px',color:'#4679c7',background:'#f6f7fb'}:{}">
            <!--<span class="body_left_item_icon body_left_item_icon1"></span>-->
            <!--<router-link to="/systemManageIndex/setCourseInfo"></router-link>-->
            <span>课程专业设置</span>
          </router-link>
          <router-link tag="p" class="body_left_item" to="/systemManageIndex/setProductTypeInfo" :style="router_name=='/systemManageIndex/setProductTypeInfo'?{borderLeft:'#4679c7 solid 3px',color:'#4679c7',background:'#f6f7fb'}:{}">
            <span>产品类型设置</span>
          </router-link>
          <!--<p class="body_left_item" ui-sref="systemManageIndex.setAptitudeRankInfo" ng-style="router_name=='systemManageIndex.setAptitudeRankInfo'?{borderLeft:'#4679c7 solid 3px',color:'#4679c7',background:'#f6f7fb'}:{}">-->
          <!--<span>资质等级设置</span>-->
          <!--</p>-->
          <!--<p class="body_left_item" ui-sref="systemManageIndex.setTeachingMaterialsInfo" ng-style="router_name=='systemManageIndex.setTeachingMaterialsInfo'?{borderLeft:'#4679c7 solid 3px',color:'#4679c7',background:'#f6f7fb'}:{}">-->
          <!--<span>教学资源设置</span>-->
          <!--</p>-->
          <!--<p class="body_left_item" ui-sref="systemManageIndex.setGradeInfo" ng-style="router_name=='systemManageIndex.setGradeInfo'?{borderLeft:'#4679c7 solid 3px',color:'#4679c7',background:'#f6f7fb'}:{}">-->
          <!--<span>年级设置</span>-->
          <!--</p>-->
          <!--<p class="body_left_item" ui-sref="systemManageIndex.setExpenseAccountInfo" ng-style="router_name=='systemManageIndex.setExpenseAccountInfo'?{borderLeft:'#4679c7 solid 3px',color:'#4679c7',background:'#f6f7fb'}:{}">-->
          <!--<span>费用科目设置</span>-->
          <!--</p>-->
          <router-link tag="p" class="body_left_item" to="/systemManageIndex/setTaxRateInfo" :style="router_name=='/systemManageIndex/setTaxRateInfo'?{borderLeft:'#4679c7 solid 3px',color:'#4679c7',background:'#f6f7fb'}:{}">
            <span>税率、分摊费用比维护</span>
          </router-link>
          <p class="body_left_item" ui-sref="systemManageIndex.personnelMaintain" :style="router_name=='/systemManageIndex/personnelMaintain'?{borderLeft:'#4679c7 solid 3px',color:'#4679c7',background:'#f6f7fb'}:{}">
            <span>人员维护</span>
          </p>
          <router-link tag="p" class="body_left_item" to="/systemManageIndex/subjectsRelation" :style="router_name=='/systemManageIndex/subjectsRelation'?{borderLeft:'#4679c7 solid 3px',color:'#4679c7',background:'#f6f7fb'}:{}">
            <span>科目关系对照</span>
          </router-link>
        </div>
      </div>
      <p class="platformName">教务平台</p>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default{
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
      router_name:state => state.app_all.current_router
    }),
  },
  created(){

  },
  mounted(){
    const ps = new perfectScrollbar('.body_left_nav', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    })
  }
}
</script>

<style lang="scss" scoped>
  .bodyHasSplitted{
    position: absolute;
    top:0px;
    left: 0;
    height: 100%;
    width: 100%;
    min-width: 1200px;
    background: #f6f7fb;
    .body_left{
      position: absolute;
      top:101px;
      bottom: 0;
      left: 0;
      width: 220px;
      background: #fff;
      box-shadow: 3px 0 10px #eee;
      z-index: 20;
      .body_left_title{
        height: 98px;
        width: 100%;
        padding-left: 60px;
        line-height: 98px;
        color: #313131;
        border-bottom: #e1e1e1 solid 1px;
        span{
          display: block;
          float: left;
          font-size: 16px;
        }
        .body_left_title_icon{
          height: 16px;
          width: 16px;
          margin-top: 42px;
          margin-right: 10px;
          background-image: url("../../assets/imgs/icon2.png");
          background-position: -176px -67px;
        }
      }
      .body_left_nav{
        position: absolute;
        top:97px;
        bottom: 120px;
        width: 100%;
        overflow-y:hidden;
        div{
          .body_left_item{
            height: 50px;
            line-height: 50px;
            width: 100%;
            color: #393d46;
            margin-bottom: 0;
            padding-left: 60px;
            /*border-bottom: #e6ecf9 solid 1px;*/
            border-left: #fff solid 3px;
            cursor: pointer;
            .body_left_item_icon{
              height: 23px;
              width: 26px;
              margin-top: 12px;
              margin-right: 10px;
              background-image: url("../../assets/imgs/icon.png");
              background-position: -135px -132px;
            }
            span{
              display: block;
              float: left;
            }
            &:hover{
              background: #f6f7fb;
              border-left: #4679c7 solid 3px;
              color: #4679c7;
            }
          }
        }
      }
      .platformName{
        position: absolute;
        bottom: 50px;
        left: 27px;
        height: 30px;
        width: 162px;
        line-height: 30px;
        background: #f6f6f6;
        color: #999;
        font-size: 12px;
        text-align: center;
        border-radius: 3px;
      }
    }
  }
</style>
