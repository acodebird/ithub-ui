// api/Login.js
import { axios } from '@/utils/request'

const api = {
  user: '/api/user',
  //user: '/user',
}

//管理员登录
// 登录
export function login (parameter) {
    return axios({
      url: `${api.user}/login`,
      method: 'post',
      data: parameter
    })
  }
  
  //登出
  export function logout(){
    return axios({
        url: `${api.user}/logout`,
        method: 'get'
    })
  }

  //判断是否登录
  export function isLogin(){
    return axios({
        url: `${api.user}/isLogin`,
        method: 'get'
    })
  }