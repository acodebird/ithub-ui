// api/notices.js
import { axios } from '@/utils/request'

const api = {
    notices: '/api/notices'
  //notices: '/notices'
}

// 根据文件 id 获取消息信息
export function getNotices (id) {
  return axios({
    url: `${api.notices}/${id}`,
    method: 'get'
  })
}

// 增加消息
export function addNotices (parameter) {
  return axios({
    url: api.notices,
    method: 'post',
    data: parameter
  })
}

// 更新消息 // or (id, parameter)
export function updateNotices (parameter) {
  return axios({
    url: `${api.notices}/${parameter.id}`, // or `${api.notices}/${id}`
    method: 'put',
    data: parameter
  })
}


// 删除消息
export function deleteNotices (id) {
  return axios({
    url: `${api.notices}/${id}`,
    method: 'delete'
  })
}

// 批量删除消息
export function deleteNoticesBatch (parameter) {
  return axios({
    url: `${api.notices}`,
    method: 'delete',
    data: parameter
  })
}

// 获取消息列表 parameter: { pageSize: 10, pageNo: 1 }
export function getNoticesList (parameter) {
  return axios({
    url: api.notices,
    method: 'get',
    params: parameter
  })
}

// 获取用户所有未读消息
export function getUnread () {
  return axios({
    url: `${api.notices}/normal/getUnread`,
    method: 'get',
  })
}

// 根据类型获取消息
export function getNoticesByType (parameter) {
  return axios({
    url: `${api.notices}/normal`,
    method: 'get',
    params: parameter
  })
}

// 点击消息从未读变为已读
export function changeStatus (id) {
  return axios({
    url: `${api.notices}/normal/${id}`,
    method: 'put',
  })
}

// 根据消息类型标记所有消息已读
export function changeAllStatus (type) {
  return axios({
    url: `${api.notices}/normal/changeAllStatus/${type}`,
    method: 'put',
  })
}

// 普通用户删除消息
export function deleteByNormal (id) {
  return axios({
    url: `${api.notices}/normal/${id}`,
    method: 'delete'
  })
}

// 普通用户根据消息类型批量删除消息
export function deleteBatchByNormal (type) {
  return axios({
    url: `${api.notices}/normal/deleteBatch/${type}`,
    method: 'delete',
  })
}