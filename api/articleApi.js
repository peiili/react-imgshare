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
/**
 * 写入文章
 */
 export function setBlogContent(params) {
     const {title,content,description,type,status} = params
    return HttpUtils.post(`/api/grabbag/addContent`,{title,content,description,type,status})
  }
/**
 * 更新文章
 */
 export function putBlogContent(params) {
     const {id,title,content,description,type,status} = params
    return HttpUtils.put(`/api/grabbag/putContent`,{id,title,content,description,type,status})
 }
/**
 * 删除文章
 */
 export function delBlogContent(id) {
    return HttpUtils.delete(`/api/grabbag/delContent?id=${id}`)
 }