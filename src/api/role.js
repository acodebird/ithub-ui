// api/role.js
import { axios } from '@/utils/request'

const api = {
  role: '/api/role'
  //role: '/role'
}

// 根据用户 id 获取角色信息
export function getRole (id) {
  return axios({
    url: `${api.role}/${id}`,
    method: 'get'
  })
}

// 增加角色
export function addRole (parameter) {
  return axios({
    url: api.role,
    method: 'post',
    data: parameter
  })
}

// 更新角色 // or (id, parameter)
export function updateRole (parameter) {
  return axios({
    url: `${api.role}/${parameter.id}`, // or `${api.role}/${id}`
    method: 'put',
    data: parameter
  })
}


// 删除角色
export function deleteRole (id) {
  return axios({
    url: `${api.role}/${id}`,
    method: 'delete'
  })
}

// 批量删除角色
export function deleteRoleBatch (parameter) {
  return axios({
    url: `${api.role}`,
    method: 'delete',
    data: parameter
  })
}

// 获取角色列表 parameter: { pageSize: 10, pageNo: 1 }
export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

//移除权限
export function removePermission (parameter) {
  return axios({
    url: `${api.role}/removePermission/${parameter.roleId}/${parameter.resourceId}`,
    method: 'delete',
  })
}

//分配权限
export function distributePermission (parameter) {
  return axios({
    url: `${api.role}/distributePermission/${parameter.roleId}/${parameter.resourceId}`,
    method: 'put',
  })
}
