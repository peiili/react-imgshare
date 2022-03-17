import HttpUtils from './http.js'

/**
 * 上传附件 formdata
 *@param {Object} params
 *@param {Objecr} params.file
 *@param {String} params.source
 */
export function uploadFile(params) {
  return HttpUtils.post(`/api/typeset/uploader`, params)
}
/**
 * 分页获取排版记录
 * @param {Object} params
 * @param {String|Number} params.size
 * @param {String|Number} params.page
 * @returns
 */
export function getTypeSetPageServerSide(params) {
  return HttpUtils.post('/api/typeset/page', params,true)
}
export function getTypeSetPage(params) {
  return HttpUtils.post('/api/typeset/page', params)
}
/**
 * 更新排版记录
 * @param {Object} params
 * @param {String} params.id
 * @param {String} params.start
 * @param {String} params.download
 * @returns
 */
export function updateTypeSet(params) {
  return HttpUtils.put('/api/typeset', params)
}
