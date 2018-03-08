import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex_store/store'
import http from '../http/http'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: (resolve) => {
        require(['../pages/Login.vue'], resolve)
      }
    },
    {
      path: '/system_main',
      name: 'system_main',
      component: (resolve) => {
        require(['../pages/System_main.vue'], resolve)
      }
    },
    {
      path: '/productDefinitionList',
      name: 'productDefinitionList',
      component: (resolve) => {
        require(['../pages/productManage/ProductDefinitionList.vue'], resolve)
      }
    },
    {
      path: '/projectApprovalList',
      name: 'projectApprovalList',
      component: (resolve) => {
        require(['../pages/productManage/projectApprovalList.vue'], resolve)
      }
    },
    {
      path: '/quotation',
      name: 'quotation',
      component: (resolve) => {
        require(['../pages/productManage/quotation.vue'], resolve)
      }
    },
    {
      path: '/courseSchedulingList',
      name: 'courseSchedulingList',
      component: (resolve) => {
        require(['../pages/productManage/courseSchedulingList.vue'], resolve)
      }
    },
    {
      path: '/resourse_paike_list',
      name: 'resourse_paike_list',
      component: (resolve) => {
        require(['../pages/productManage/resourse_paike_list.vue'], resolve)
      }
    },
    {
      path: '/systemManageIndex',
      name: 'systemManageIndex',
      component: (resolve) => {
        require(['../pages/systemManage/systemManageIndex.vue'], resolve)
      },
      children:[
        {
          path: 'setCourseInfo',
          component: (resolve) => {
            require(['../pages/systemManage/setCourseInfo.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/password_change',
      name: 'password_change',
      component: (resolve) => {
        require(['../pages/password_change.vue'], resolve)
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('set_current_router', to.path)
  if (to.path != '/login'){
    if (!localStorage.user_token){
      next('/login')
    }else {
      if (to.path != '/system_main'){
        http.get_shool_list({accountId:localStorage.account_id, userId:localStorage.user_id}).then(res => {
          store.dispatch('set_school_list', res)
        })
      }
      const nav_url1=[
        {name:'课程定义',url:'/productDefinitionList',child:[]},
        {name:'产品定义',url:'/projectApprovalList',child:[]},
        // {name:'排期',url:'studentApplyList',child:[{name:'学生报名表管理',url:'studentApplyList'},{name:'收款确认单管理',url:'receiptAcknowledgeList'},{name:'退费管理',url:'refundList'}]},
        {name:'排期',url:'/courseSchedulingList',child:[]},
        // {name:'资源信息管理',url:'teacherInfoList',child:[{name:'教师信息管理',url:'teacherInfoList'},{name:'学生信息管理', url:'student_info_manage'},{name:'教室信息管理',url:'classroomInfoList'},{name:'客户信息管理',url:'customerInfoList'}]},
        {name:'资源排期',url:'/resourse_paike_list',child:[]},
        {name:'系统管理',url:'/systemManageIndex/setCourseInfo',child:[]}
      ]
      const nav_url2=[
        {name:'个人客户',url:'/personCustormList',child:[]},
        {name:'企业客户',url:'/companyCustormList',child:[]},
        {name:'客户服务管理',url:'/customerManageList',child:[]},
        {name:'报表', url:'/money_collection_books', child:[{name:'现金收款表', url:'/money_collection_books', child:[]}, {name:'收入明细表', url:'/income_info_table', child:[]}, {name:'收入汇总表', url:'/income_summary_table', child:[]}]}
      ]
      const nav_url3 = [
        {name:'教师资源', url:'/teacherInfoList', child:[]},
        {name:'教学场地', url:'/classroomInfoList', child:[]},
        {name:'教学资源', url:'/setTeachingMaterialsInfo', child:[]},
        {name:'教师资质等级', url:'/setAptitudeRankInfo', child:[]},
        {name:'系统设置', url:'/members_type_list', child:[{name:'会籍', url:'/members_type_list', child:[]}, {name:'企业性质', url:'/company_nature_list', child:[]}, {name:'所属行业', url:'/industry_list', child:[]}]},
      ]
      const nav_url5=[
        {name:'课程管理',url:'/courseManageList',child:[]},
        {name:'学生管理',url:'/studentManageList',child:[]},
        {name:'成绩管理',url:'/achievementManageList',child:[]},
        {name:'个人信息维护',url:'/teacherInfoDetail',child:[]},
      ]
      switch (to.path){
        case '/productManageIndex.courseTemplateList':
        case '/projectApprovalList':
        case '/productDefinitionList':
        case '/systemManageIndex/courseTemplateList':
        case '/systemManageIndex/setCourseInfo':
        case '/systemManageIndex/setProductTypeInfo':
        case '/systemManageIndex/setAptitudeRankInfo':
        case '/systemManageIndex/setTeachingMaterialsInfo':
        case '/systemManageIndex/setGradeInfo':
        case '/systemManageIndex/setExpenseAccountInfo':
        case '/systemManageIndex/setTaxRateInfo':
        case '/systemManageIndex/personnelMaintain':
        case '/productManageIndex/courseSchedulingList':
        case '/courseSchedulingList':
        case '/resourse_paike_list':
        case '/systemManageIndex/subjectsRelation':
          store.dispatch('set_nav_url', nav_url1)
          break
        case '/addProduct':
        case '/productDetail':
        case '/projectApprovalDetail':
        case '/addProjectApproval':
        case '/addCustomerInfo':
        case '/customerInfoDetail':
        case '/addReceiptAcknowledge':
        case '/addBatchCharging':
        case '/receiptAcknowledgeDetail':
        case '/batchChargingDetail':
        case '/teacherInfoDetail':
        case '/addClassroomInfo':
        case '/quotation':
        case '/addCourseScheduling':
        case '/addTeacherInfo':
        case '/addStuApplicationForm':
        case '/addRefund':
        case '/add_student_info':
        case '/view_student_info':
        case '/teacher_student_info':
        case '/password_change':
        case '/classroomInfoDetail':
        case '/courseManageDetail':
        case '/achievementManageDetail':
        case '/timetableDetail':
        case '/stuApplicationFormDetail':
        case '/refundDetail':
        case '/message_list':
        case '/addPersonCustomer':
        case '/addCompanyCustomer/customerContact':
        case '/addCompanyCustomer/collectionInfo':
        case '/addCompanyCustomer/contactList':
        case '/addCompanyCustomer/recommendgents':
        case '/addCompanyCustomer/suggestFeedback':
        case '/addPersonCustomer/personCustomerMembershipInfo':
        case '/addPersonCustomer/personCustomerContactRecord':
        case '/addPersonCustomer/personCustomerComplainSuggestion':
        case '/crm_view_course_info':
        case '/crm_view_course_list':
          store.dispatch('set_nav_url', [])
          break
        case '/studentApplyList':
        case '/receiptAcknowledgeList':
        case '/batchChargingList':
        case '/refundList':
          store.dispatch('set_nav_url', nav_url1)
          break
        case '/student_info_manage':
        case '/teacherInfoList':
        case '/classroomInfoList':
        case '/setTeachingMaterialsInfo':
        case '/setAptitudeRankInfo':
        case '/members_type_list':
        case '/company_nature_list':
        case '/industry_list':
        case '/customerInfoList':
          store.dispatch('set_nav_url', nav_url3)
          break
        case '/personCustormList':
        case '/companyCustormList':
        case '/customerManageList':
        case '/money_collection_books':
        case '/income_info_table':
        case '/income_summary_table':
          store.dispatch('set_nav_url', nav_url2)
          break
        case '/courseManageList':
        case '/studentManageList':
        case '/achievementManageList':
          store.dispatch('set_nav_url', nav_url5)
          break
      }
      next()
    }
  }else {
    next()
  }
})

export default router
