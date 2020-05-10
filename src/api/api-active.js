import HttpUtils from './http.js'

/**
 * 删除单条活动列表
 * @method deleteActive
 * @param {Object} params
 * @param {String} params.id
 * @param {String} params.type
 */
export function deleteActive(params) {
  return HttpUtils.put(`/api/active/delActive`, params)
}
