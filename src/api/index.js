import HttpUtils from './http.js'
// const baseUrl = 'http://127.0.0.1:5166'
export function carouselList(data) {
  return HttpUtils.get(`/api/bing/randomBingList?limit=${data}`)
}

export function login(data) {
  return HttpUtils.post(`/api/user/login`, data)
}
