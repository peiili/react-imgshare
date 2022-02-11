const dev = process.env.NODE_ENV !== 'production';
const baseUrl = dev ? 'http://test.top' : 'http://localhost:3000';
export default class HttpUtils {
  static get = (url) => {
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
  static post = (url, data) => {
    return new Promise((resolve, reject) => {
      fetch(baseUrl+url, {
        method: 'POST',
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
  static put = (url, data) => {
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
  static delete = (url, data) => {
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
