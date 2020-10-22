import Axios from 'axios'
import qs from 'qs'
import {getStorage}from '@/plugins/common/storage'

const axios = Axios.create();
axios.defaults.headers.post['Content-Type']="application/json;charset=UTF-8"

//请求前干点事情，加上账号id和类型，token在头部
axios.interceptors.request.use((config)=>{
  //从localstorage中拿数据
  let storageUserInfo=getStorage('storageUserInfo')
  if(!storageUserInfo){
    storageUserInfo={accountId:null,accountType:null,token:null}
  }
  //本地存储的用户信息不能为空
  if(!storageUserInfo.accountId||!storageUserInfo.accountType||!storageUserInfo.token){
    storageUserInfo={accountId:null,accountType:null,token:null}
  }
  let {accountId,accountType,token} = storageUserInfo
  config.headers.accountId=accountId
  config.headers.accountType=accountType
  config.headers.token=token

  return config;
})

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios;