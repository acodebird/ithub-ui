// api/document.js
import { axios } from '@/utils/request'

const api = {
    document: '/api/document'
  //document: '/document'
}

// 根据文件 id 获取文件信息
export function getDocument (id) {
  return axios({
    url: `${api.document}/${id}`,
    method: 'get'
  })
}

// 增加文件
export function addDocument (parameter) {
  return axios({
    url: api.document,
    method: 'post',
    data: parameter
  })
}

// 更新文件 // or (id, parameter)
export function updateDocument (parameter) {
  return axios({
    url: `${api.document}/${parameter.id}`, // or `${api.document}/${id}`
    method: 'put',
    data: parameter
  })
}


// 删除文件
export function deleteDocument (id) {
  return axios({
    url: `${api.document}/${id}`,
    method: 'delete'
  })
}

// 批量删除文件
export function deleteDocumentBatch (parameter) {
  return axios({
    url: `${api.document}`,
    method: 'delete',
    data: parameter
  })
}

// 获取文件列表 parameter: { pageSize: 10, pageNo: 1 }
export function getDocumentList (parameter) {
  return axios({
    url: api.document,
    method: 'get',
    params: parameter
  })
}

// 加载所有资源/用户资源 parameter: { pageSize: 10, pageNo: 1 }
export function loadAll (parameter) {
  return axios({
    url: `${api.document}/normal`,
    method: 'get',
    params: parameter
  })
}

// 用户下载资源
export function download (id) {
  return axios({
    url: `${api.document}/normal/download/${id}`,
    method: 'get',
  })
}

// 用户编辑文件 // or (id, parameter)
export function editDocument (parameter) {
  return axios({
    url: `${api.document}/normal/${parameter.id}`, // or `${api.document}/${id}`
    method: 'put',
    data: parameter
  })
}

// 用户取消审核中的资源
export function cancelDocument (id) {
  return axios({
    url: `${api.document}/normal/${id}`,
    method: 'delete'
  })
}