// api/article.js
import { axios } from '@/utils/request'

const api = {
  article: '/api/article'
  //article: '/article'
}

// 根据文章 id 获取文章信息
export function getArticle (id) {
  return axios({
    url: `${api.article}/normal/${id}`,
    method: 'get'
  })
}

// 增加文章
export function addArticle (parameter) {
  return axios({
    url: api.article,
    method: 'post',
    data: parameter
  })
}

// 更新文章 // or (id, parameter)
export function updateArticle (parameter) {
  return axios({
    url: `${api.article}/${parameter.id}`, // or `${api.article}/${id}`
    method: 'put',
    data: parameter
  })
}


// 删除文章
export function deleteArticle (id) {
  return axios({
    url: `${api.article}/${id}`,
    method: 'delete'
  })
}

// 批量删除文章
export function deleteArticleBatch (parameter) {
  return axios({
    url: `${api.article}`,
    method: 'delete',
    data: parameter
  })
}

// 获取文章列表 parameter: { pageSize: 10, pageNo: 1 }
export function getArticleList (parameter) {
  return axios({
    url: api.article,
    method: 'get',
    params: parameter
  })
}


// 用户主页加载所有文章 parameter: { pageSize: 10, pageNo: 1 }
export function loadAll (parameter) {
  return axios({
    url: `${api.article}/normal/loadAll`,
    method: 'get',
    params: parameter
  })
}

// 用户主页加载热门推荐 parameter: { pageSize: 20, pageNo: 1 }
export function loadHot (parameter) {
  return axios({
    url: `${api.article}/normal/loadHot`,
    method: 'get',
    params: parameter
  })
}

// 加载用户最新文章/热门文章/专栏文章 parameter: { pageSize: 5, pageNo: 1 }
export function loadByUser (parameter) {
  return axios({
    url: `${api.article}/normal/loadByUser`,
    method: 'get',
    params: parameter
  })
}