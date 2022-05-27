import axios from 'axios'

const https = axios.create()


// 添加请求拦截器
https.interceptors.request.use(config => {
	// 在发送请求之前做些什么
	return config
}, error => {
	// 对请求错误做些什么
	return Promise.reject(error)
})


// 添加响应拦截器
https.interceptors.response.use(response =>  {
	// 2xx 范围内的状态码都会触发该函数。
	// 对响应数据做点什么
	// dataAxios 是 axios 返回数据中的 data
	const dataAxios = response.data
	// 这个状态码是和后端约定的
	const code = dataAxios.reset
	return dataAxios
}, error => {
	// 超出 2xx 范围的状态码都会触发该函数。
	// 对响应错误做点什么
	console.log(error)
	return Promise.reject(error)
})

function post(url: string = '', data: object = {}) {
  const axiosData = {
    url: url,
    data: data,
    method: 'post',
    baseURL: 'http://localhost:3022/',
    timeOut: 10000,
    withCredentials: false,
    headers: {
      'token': '58bc58',
      'Content-Type': 'application/json',
      // 'X-Requested-With': 'XMLHttpRequest',
    }
  }
  return new Promise((resolve, reject) => {
    https(axiosData).then((res: object) => {resolve(res)}).catch((error: any) => {reject(error.data)})
  })
  
}

export default post