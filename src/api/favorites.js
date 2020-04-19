// api/favorites.js
import { axios } from '@/utils/request'

const api = {
    favorites: '/api/favorites'
  //favorites: '/favorites'
}

// 根据收藏 id 获取收藏信息
export function getFavorites (id) {
  return axios({
    url: `${api.favorites}/${id}`,
    method: 'get'
  })
}

// 判断用户是否收藏当前文章
export function isCollect (parameter) {
  return axios({
    url: `${api.favorites}/isCollect`,
    method: 'get',
    params: parameter
  })
}

// 增加收藏
export function addFavorites (parameter) {
  return axios({
    url: api.favorites,
    method: 'post',
    data: parameter
  })
}

// 更新收藏 // or (id, parameter)
export function updateFavorites (parameter) {
  return axios({
    url: `${api.favorites}/${parameter.id}`, // or `${api.favorites}/${id}`
    method: 'put',
    data: parameter
  })
}


// 删除收藏
export function deleteFavorites (id) {
  return axios({
    url: `${api.favorites}/${id}`,
    method: 'delete'
  })
}

// 根据用户和文章id删除收藏
export function deleteFavoritesByUser (parameter) {
  return axios({
    url: `${api.favorites}`,
    method: 'delete',
    data: parameter
  })
}

// 批量删除收藏
export function deleteFavoritesBatch (parameter) {
  return axios({
    url: `${api.favorites}`,
    method: 'delete',
    data: parameter
  })
}

// 获取收藏列表 parameter: { pageSize: 10, pageNo: 1 }
export function getFavoritesList (parameter) {
  return axios({
    url: api.favorites,
    method: 'get',
    params: parameter
  })
}
