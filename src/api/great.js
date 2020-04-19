// api/great.js
import { axios } from '@/utils/request'

const api = {
    great: '/api/great'
  //great: '/great'
}

// 根据点赞 id 获取点赞信息
export function getGreat (parameter) {
  return axios({
    url: `${api.great}`,
    method: 'get',
    params: parameter
  })
}

// 增加点赞
export function addGreat (parameter) {
  return axios({
    url: api.great,
    method: 'post',
    data: parameter
  })
}

// 更新点赞 // or (id, parameter)
export function updateGreat (parameter) {
  return axios({
    url: `${api.great}/${parameter.id}`, // or `${api.great}/${id}`
    method: 'put',
    data: parameter
  })
}


// 删除点赞
export function deleteGreat (parameter) {
  return axios({
    url: `${api.great}`,
    method: 'delete',
    data: parameter
  })
}

// 批量删除点赞
export function deleteGreatBatch (parameter) {
  return axios({
    url: `${api.great}`,
    method: 'delete',
    data: parameter
  })
}

// 获取点赞列表 parameter: { pageSize: 10, pageNo: 1 }
export function getGreatList (parameter) {
  return axios({
    url: api.great,
    method: 'get',
    params: parameter
  })
}
