import HttpUtils from './http.js'

/**
 * 获取文章列表
 * @method deleteActive
 * @param {Object} params
 * @param {String} params.type
 * @param {String} params.fuzzy
 * @param {String} params.page
 * @param {String} params.size
 */
export function getBlogList(params) {
  return HttpUtils.post(`/api/grabbag/getList`, params)
}
