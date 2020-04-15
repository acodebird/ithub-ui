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
