import HttpUtils from './http.js'
// const baseUrl = 'http://127.0.0.1:5166'
export function carouselList(data) {
  return HttpUtils.get(`/api/bing/randomBingList?limit=${data}`)
}
export function carouselListServerSide(data) {
  return HttpUtils.get(`/api/bing/randomBingList?limit=${data}`,true)
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
/**
 * createActiveEdit
 * @method createActiveEdit
 * @description 新增一条活动信息
 * @param {Object} params 新增数据类型
 * @param {String} params.title 文章标题
 * @param {String} params.desc

 * @param {String} params.content 文章正文
 */
export function createActiveEdit(params) {
  return HttpUtils.post(`/api/active/createActive`, params)
}
