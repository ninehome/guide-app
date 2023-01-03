/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

import axios from '../utils/axios'



export function addAddress(params) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.post('/addBank', params);
}

export function EditAddress(params) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.put('/addBank', params);
}

export function DeleteBank(id) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.delete(`/delete/bank/${id}`);
}

// export function getDefaultAddress() {
//   return axios.get('/address/default');
// }

export function getBankList() {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.post('/user/bankList')
}


// export function getAddressList() {
//   return axios.get('/user/bankList', { pageNumber: 1, pageSize: 1000 })
// }





export function getBankDetail(id) {
  return axios.get(`/bank/${id}`)
}


