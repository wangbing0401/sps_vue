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
var that = this;
instance.interceptors.request.use((config) => {
  if(config.method  === 'get'){
    // config.params = qs.stringify(config.params);
    // console.log(config);
  }
  if (localStorage.user_token){
    config.headers.Authorization = localStorage.user_token
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
  login:(data) => instance.post('/api/v1/login', data)
}

export default http
