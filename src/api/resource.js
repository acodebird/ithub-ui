// api/resource.js
import { axios } from '@/utils/request'

const api = {
    resource: '/api/resource'
  //resource: '/resource'
}

// 根据 id 获取权限信息
export function getResource (id) {
  return axios({
    url: `${api.resource}/${id}`,
    method: 'get'
  })
}

// 增加权限
export function addResource (parameter) {
  return axios({
    url: api.resource,
    method: 'post',
    data: parameter
  })
}

// 更新权限 // or (id, parameter)
export function updateResource (parameter) {
  return axios({
    url: `${api.resource}/${parameter.id}`, // or `${api.resource}/${id}`
    method: 'put',
    data: parameter
  })
}


// 删除权限
export function deleteResource (id) {
  return axios({
    url: `${api.resource}/${id}`,
    method: 'delete'
  })
}

// 批量删除权限
export function deleteResourceBatch (parameter) {
  return axios({
    url: `${api.resource}`,
    method: 'delete',
    data: parameter
  })
}

// 获取权限列表 parameter: { pageSize: 10, pageNo: 1 }
export function getResourceList (parameter) {
  return axios({
    url: api.resource,
    method: 'get',
    params: parameter
  })
}

// 根据用户id获取权限列表 
export function loadPermissionByUserId (parameter) {
  return axios({
    url: `${api.resource}/${parameter.id}`,
    method: 'get',
  })
}


//根据角色id获取所有权限
export function loadPermission (parameter) {
  return axios({
    url: `${api.resource}/loadPermission/${parameter.id}`,
    method: 'get',
  })
}
