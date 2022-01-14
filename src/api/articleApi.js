import HttpUtils from './http.js'

/**
 * 获取文章列表
 * @method getBlogList
 * @param {Object} params
 * @param {String} params.type
 * @param {String} params.fuzzy
 * @param {String} params.page
 * @param {String} params.size
 */
export function getBlogList(params) {
  return HttpUtils.post(`/api/grabbag/getList`, params)
}
/**
 * 获取文章详情
 * @method 
 * @param {String} id
 */
export function getBlogContent(id) {
  return HttpUtils.post(`/api/grabbag/getContent`,{id})
}
