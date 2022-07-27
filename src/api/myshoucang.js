import request from '@/utils/request'
// import store from '@/store'
export const getmycollect = (authorization) => {
  return request({
    url: '/user/favorites',
    headers: {
      Authorization: authorization
    }
  })
}
export const getmyrent = (authorization) => {
  return request({
    url: '/user/houses',
    headers: {
      Authorization: authorization
    }
  })
}
// 添加收藏
export const AddtoFavorites = (authorization, id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'POST',
    headers: {
      Authorization: authorization
    }
  })
}
