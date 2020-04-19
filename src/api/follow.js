// api/follow.js
import { axios } from '@/utils/request'

const api = {
    follow: '/api/follow'
  //follow: '/follow'
}

// 根据关注 id 获取关注信息
export function getFollow (id) {
  return axios({
    url: `${api.follow}/${id}`,
    method: 'get'
  })
}

// 增加关注
export function addFollow (followId) {
  return axios({
    url: `${api.follow}/${followId}`,
    method: 'post',
  })
}

// 更新关注 // or (id, parameter)
export function updateFollow (parameter) {
  return axios({
    url: `${api.follow}/${parameter.id}`, // or `${api.follow}/${id}`
    method: 'put',
    data: parameter
  })
}


// 删除关注
export function deleteFollow (id) {
  return axios({
    url: `${api.follow}/${id}`,
    method: 'delete'
  })
}

// 批量删除关注
export function deleteFollowBatch (parameter) {
  return axios({
    url: `${api.follow}`,
    method: 'delete',
    data: parameter
  })
}

// 获取关注列表 parameter: { pageSize: 10, pageNo: 1 }
export function getFollowList (parameter) {
  return axios({
    url: api.follow,
    method: 'get',
    params: parameter
  })
}

// 判断用户是否关注当前用户
export function isFocus (userId) {
  return axios({
    url: `${api.follow}/${userId}`,
    method: 'get',
  })
}
