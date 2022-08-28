import HttpUtils from './http.js'

/**
 * 获取网站基本信息
 */
export function getSiteBaseServerSide() {
  return HttpUtils.get(`/api/website`, true)
}
/**
 * 更新网站基本信息
 */
export function putSiteBase(data) {
  return HttpUtils.put(`/api/website`, data)
}
