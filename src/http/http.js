/**
 * Created by WB on 2018/3/2.
 */
import axios from 'axios'
import store from '../vuex_store/store'

const instance = axios.create({
  baseURL: server_url,
  timeout: 1000,
  headers:{'Content-Type': 'application/json', 'Accept': 'application/json'}
});
// 请求拦截器
instance.interceptors.request.use((config) => {
  if(config.method  === 'get'){

  }
  if (localStorage.user_token){
    config.headers.Authorization = localStorage.user_token
  }
  if (config.dic){
    config.baseURL = dic_server_url
  }
  return config;
},(error) =>{
  _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});
//响应拦截器
instance.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  store.dispatch('alert_handle_show', error.response.status)
});

const http = {
  get_user_permiss:(data) => instance.get('/api/v1/user/me', {params:data}),
  login:(data) => instance.post('/api/v1/login', data),
  get_shool_list:(data) => instance.get('/api/v1/school/userManageSchool', {params:data}),
  get_courseTemplate_list:(data) => instance.get('/api/v1/product/getProductBaseList', {params:data}),
  project_approval_list:(data) => instance.get('/api/v1/product/selectProjectApproval', {params:data}),
  get_course_scheduling_list:(data) => instance.get('/api/v1/product/getProductBaseListByDateAndIsNotTemplate', {params:data}),
  find_course_type_list:(data) => instance.get('/api/v1/specialty/query', {params:data}),
  modify_course_type:(data) => instance.patch('/api/v1/specialty/updateSpecialty', data),
  delete_course_type:(data) => instance.delete('/api/v1/specialty/deleteById', {params:data}),
  get_coursetype_code:(data) => instance.get('/api/v1/specialty/specialtyCode', {params:data}),
  add_course_type:(data) => instance.post('/api/v1/specialty/addSpecialty', data),
  change_password:(data) => instance.put('/api/v1/changepw', data),
  find_product_type_list:(data) => instance.get('/api/v1/courseType/getAllCourseType', {params:data}),
  find_rate:(data) => instance.get('/api/v1/finance/getByCustomerId', {params:data}),
  get_kemu_guanxi_list:(data) => instance.get('/api/v1/product/subjectRelationControlList', {params:data}),
  get_area_list:(data) => instance.get('/area/api/v1/area', {params:data, dic:true}),//-1国家， 0省
  get_teahcer_info_list:(data) => instance.get('/api/v1/teacher/teacherListByOrgId', {params:data}),
  get_classroom_info_list:(data) => instance.post('/api/v1/classroom/getAlls', data),
  find_teacher_material:(data) => instance.post('/api/v1/teachResources/selectSchoolResources', data),
  modify_teacher_material:(data) => instance.patch('/api/v1/teachResources/updateSchoolResource', data),
  delete_teacher_material:(data) => instance.delete('/api/v1/teachResources/deleteSchoolResource', {params:data}),
  get_teacherMaterial_code:(data) => instance.get('/api/v1/teachResources/getCode', {params:data}),
  add_teacher_material:(data) => instance.post('/api/v1/teachResources/addSchoolResource', data),
  find_aptitude_rank:(data) => instance.get('/api/v1/qualificationLevel/getAll', {params:data}),
  get_aptitude_code:(data) => instance.get('/api/v1/qualificationLevel/getCode', {params:data}),
  modify_aptitude_rank:(data) => instance.patch('/api/v1/qualificationLevel/update', data),
  delete_aptitude_rank:(data) => instance.delete('/api/v1/qualificationLevel/deleteById', {params:data}),
  get_receiptType_list:(data) => instance.get('/api/v1/applyInfo/getpaymentMethod', {params:data}),
  add_members_type:(data) => instance.post('/api/v1/applyInfo/putpaymentMethod', data),
  delete_members_type:(data) => instance.get('/api/v1/applyInfo/deletepaymentMethod', {params:data}),
  get_members_code:(data) => instance.get('/api/v1/applyInfo/numberPaymentMethod', {params:data}),
  get_EnterpriseNature_list:(data) => instance.get('/api/v1/organization/listEnterpriseNature', {params:data}),
  delete_company_nature_type:(data) => instance.get('/api/v1/organization/deleteEnterpriseNature', {params:data}),
  get_company_nature_code:(data) => instance.get('/api/v1/organization/numberEnterpriseNature', {params:data}),
  add_company_nature_type:(data) => instance.post('/api/v1/organization/putEnterpriseNatures', data),
  get_industry_list:(data) => instance.get('/api/v1/organization/listIndustry', {params:data}),
  add_industry_list:(data) => instance.post('/api/v1/organization/putIndustry', data),
  delete_industry_type:(data) => instance.get('/api/v1/organization/deleteIndustry', {params:data}),
  get_industry_code:(data) => instance.get('/api/v1/organization/numberIndustry', {params:data}),
  get_all_kemu_list:(data) => instance.get('/api/v1/accountingItem/listAll', {params:data}),
  add_kemu_guanxi:(data) => instance.post('/api/v1/product/putSubjectRelationControl', data),
  delete_kemu_guanxi_list:(data) => instance.get('/api/v1/product/deleteSubjectRelationControl', {params:data}),

}

export default http
