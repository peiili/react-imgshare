const dev = process.env.NODE_ENV !== 'production';
let baseUrl = dev ? 'http://test.top' : 'http://localhost:3000';
export default class HttpUtils {
  static get = (url,ServerSide) => {
    if(!dev){
      baseUrl = ServerSide?'http://localhost:3000':''
    }
    return new Promise((resolve, reject) => {
      fetch(baseUrl+url)
        .then((response) => response.json())
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  static post = (url, data,ServerSide) => {
    // 判断提交的数据类型
    const isFormData = Object.prototype.toString.call(data)==='[object FormData]'
    if(!dev){
      baseUrl = ServerSide?'http://localhost:3000':''
    }
    return new Promise((resolve, reject) => {
      fetch(baseUrl+url, {
        method: 'POST',
        headers: isFormData?undefined:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: isFormData?data:JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  static put = (url, data,ServerSide) => {
    if(!dev){
      baseUrl = ServerSide?'http://localhost:3000':''
    }
    return new Promise((resolve, reject) => {
      fetch(baseUrl+url, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  static delete = (url, data,ServerSide) => {
    if(!dev){
      baseUrl = ServerSide?'http://localhost:3000':''
    }
    return new Promise((resolve, reject) => {
      fetch(baseUrl+url, {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
