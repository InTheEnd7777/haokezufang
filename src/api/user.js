import request from '@/utils/request'
// import store from '@/store/index'
/**
 *
 * @param {string} username
 * @param {string} password
 * @returns  Promise
 */
// 登录
export const login = (username, password) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: { username, password }
  })
}
export const mylist = (authorization) => {
  return request({
    url: '/user',
    method: 'GET',
    headers: {
      Authorization: authorization
    }
  })
}
// 获取轮播图
export const getswiper = () => {
  return request({
    url: '/home/swiper'
  })
}
// 租房小组
export const getRentalGroup = (area) => {
  return request({
    url: '/home/groups',
    query: {
      Area: area
    }
  })
}
// 去出租
export const torent = () => {
  return request({
    url: '/houses/params'
  })
}
// 查询小区
export const querythecommunity = (params) => {
  return request({
    url: '/area/community',
    params
  })
}
// 房屋详情
export const housedetails = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
