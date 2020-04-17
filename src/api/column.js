// api/column.js
import { axios } from '@/utils/request'

const api = {
    column: '/api/column'
  //column: '/column'
}

// 根据评论 id 获取专栏信息
export function getColumn (id) {
  return axios({
    url: `${api.column}/${id}`,
    method: 'get'
  })
}

// 增加专栏
export function addColumn (parameter) {
  return axios({
    url: api.column,
    method: 'post',
    data: parameter
  })
}

// 更新专栏 // or (id, parameter)
export function updateColumn (parameter) {
  return axios({
    url: `${api.column}/${parameter.id}`, // or `${api.column}/${id}`
    method: 'put',
    data: parameter
  })
}


// 删除专栏
export function deleteColumn (id) {
  return axios({
    url: `${api.column}/${id}`,
    method: 'delete'
  })
}

// 批量删除专栏
export function deleteColumnBatch (parameter) {
  return axios({
    url: `${api.column}`,
    method: 'delete',
    data: parameter
  })
}

// 获取专栏列表 parameter: { pageSize: 10, pageNo: 1 }
export function getColumnList (parameter) {
  return axios({
    url: api.column,
    method: 'get',
    params: parameter
  })
}

// 获取所有专栏 
export function loadAll () {
    return axios({
      url: `${api.column}/loadAll`,
      method: 'get',
    })
  }
