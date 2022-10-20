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
export function getBlogListServerSide(params) {
  return HttpUtils.post(`/api/grabbag/getList`, params, true)
}
/**
 * 获取文章详情
 * @method
 * @param {String} id
 */
export function getBlogContent(id) {
  return HttpUtils.post(`/api/grabbag/getContent`, { id })
}
export function getBlogContentServerSide(id) {
  return HttpUtils.post(`/api/grabbag/getContent`, { id }, true)
}
/**
 *
 */
export function setBlogContent(params) {
  const { title, content, description, type, status, keywords } = params
  return HttpUtils.post(`/api/grabbag/addContent`, { title, content, description, type, status, keywords })
}
/**
 * 更新文章
 */
export function putBlogContent(params) {
  const { id, title, content, description, keywords, type, status, marked } = params
  return HttpUtils.put(`/api/grabbag/putContent`, { id, title, content, description, type, status, keywords, marked })
}
/**
 * 更新文章
 */
export function putViewServerSide(id) {
  return HttpUtils.get(`/api/grabbag/view/${id}`, true)
}
/**
 * 删除文章
 */
export function delBlogContent(id) {
  return HttpUtils.delete(`/api/grabbag/delContent?id=${id}`)
}
