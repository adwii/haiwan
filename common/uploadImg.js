// import axios from 'axios'
var httpUrl = 'http://192.168.101.5:50588'
// var httpUrl = 'http://hw.tyabc.cn'
let uploadImage =  function(path, success){
	console.log(path)
	uni.uploadFile({
		url: httpUrl + '/api/account/upload',
		filePath: path,
		name: 'file',
		success: success
	})
	// return axios.post('http://192.168.101.5:50588/api/account/upload', formData, config)
}

export default uploadImage