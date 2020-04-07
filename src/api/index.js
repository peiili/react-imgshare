import HttpUtils from './http.js'
// const baseUrl = 'http://127.0.0.1:5166'
export function carouselList(data) {
  return HttpUtils.get(`/api/bing/randomBingList?limit=${data}`)
}
// 登录
export function login(data) {
  return HttpUtils.post(`/api/user/login`, data)
}
/**
 * 获取活动文章列表
 * @param {Number} type 文章对应的type值
 */

export function getActiveList(type) {
  return HttpUtils.get(`/api/active/activeTitleList?type=${type}`)
}
