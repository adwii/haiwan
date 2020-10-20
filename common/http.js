import Request from '../js_sdk/luch-request/luch-request/index.js'

// var httpUrl = 'http://192.168.101.5:50588'
var httpUrl = 'http://192.168.101.5:50588'
// var httpUrl = 'http://hw.tyabc.cn'




const getTokenStorage = () => {
  let token = ''
  try {
    token = uni.getStorageSync('token')
  } catch (e) {
    //TODO handle the exception
	uni.reLaunch({
		url: '/pages/login/login.vue'
	})
  }
  return token
}
const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = httpUrl /* 根域名不同 */
	config.header = {
	  ...config.header,
	  'content-type': 'application/x-www-form-urlencoded'
	}
	return config
})


http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
// console.log(uni.getStorageSync('token'))
	config.header = {
		...config.header,
		'Authorization': 'Token ' + getTokenStorage()
	}
	/*
 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
   return Promise.reject(config)
 }
 */
	// console.log(config.header)
	return config
}, (config) => {
	return Promise.reject(config)
})


http.interceptors.response.use(async (response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    return Promise.reject(response)
  }else{
	  let res = response.data.result ? response.data.result : response.data.code
	return Promise.resolve(res)
  }
  return response
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	console.log(response)
	if(response.statusCode == 404){
		uni.showToast({
			icon: 'none',
			title: '服务器请求错误'
		})
	}
  return Promise.reject(response)
})

export {
	http,
	httpUrl
}
