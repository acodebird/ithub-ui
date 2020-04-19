// api/qiniu.js
import { axios } from '@/utils/request'

const api = {
    qiniu: '/api/qiniu'
  //qiniu: '/qiniu'
}

// 上传文件
export function uploadFile (parameter) {
    return axios({
      url: `${api.qiniu}/uploadFile`,
      method: 'post',
      data: parameter
    })
  }
  
  // 删除文件
  export function deleteFile (parameter) {
    return axios({
      url: `${api.qiniu}/deleteFile`,
      method: 'delete',
      data: parameter
    })
  }