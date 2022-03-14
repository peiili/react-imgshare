import HttpUtils from './http.js'

/**
 * 上传附件 formdata
 */
export function uploadFile(params) {
  return HttpUtils.post(`/api/attachment/uploader`, params)
}
