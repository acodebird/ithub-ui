// api/comment.js
import { axios } from '@/utils/request'

const api = {
    comment: '/api/comment'
  //comment: '/comment'
}

// 根据评论 id 获取评论信息
export function getComment (id) {
  return axios({
    url: `${api.comment}/${id}`,
    method: 'get'
  })
}


// 增加评论
export function addComment (parameter) {
  return axios({
    url: `${api.comment}/normal/addComment`,
    method: 'post',
    data: parameter
  })
}

// 更新评论 // or (id, parameter)
export function updateComment (parameter) {
  return axios({
    url: `${api.comment}/${parameter.id}`, // or `${api.comment}/${id}`
    method: 'put',
    data: parameter
  })
}


// 删除评论
export function deleteComment (id) {
  return axios({
    url: `${api.comment}/${id}`,
    method: 'delete'
  })
}

// 批量删除评论
export function deleteCommentBatch (parameter) {
  return axios({
    url: `${api.comment}`,
    method: 'delete',
    data: parameter
  })
}

// 获取评论列表 parameter: { pageSize: 10, pageNo: 1 }
export function getCommentList (parameter) {
  return axios({
    url: api.comment,
    method: 'get',
    params: parameter
  })
}

// 加载文章评论
export function getCommentByArticle (parameter) {
  return axios({
    url: `${api.comment}/normal/loadAll`,
    method: 'get',
    params: parameter
  })
}