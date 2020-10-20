<template>
	<view class="register">
		<div class='top_back'>
			<text class="iconfont icon-back-copy" @click="back"></text>
			注册
		</div>
		<image src="../../../static/register_bg.jpg" mode="widthFix"></image>
		<div class="content">
			<div>
				<p v-if="imgUrl == ''" @click='chooseImg'>
					<text class="iconfont icon-iconzhucetouxiang"></text>
				</p>
				<p v-else @click='chooseImg'>
					<image :src="imgUrl"></image>
				</p>
				<text class="iconfont icon-xiangji"></text>
			</div>
			<p>
				<input type="text" placeholder="请输入姓名" v-model="info.Name"/>
			</p>
			<p>
				<input type="number" placeholder="请输入手机号" maxlength="11" v-model="info.UserName"/>
			</p>
			<p>
				<picker mode="selector" :range="schoolList" :value="schoolIndex" @change="choosedSchool">
					<view class="picker">
						{{schoolList[schoolIndex]}}
						<text class="iconfont icon-rightarrow"></text>
					</view>
				</picker>
			</p>
			<p>
				<picker mode="selector" :range="facultyList" :value="facultyIndex" @change="choosedFaculty">
					<view class="picker">
						{{facultyList[facultyIndex]}}
						<text class="iconfont icon-rightarrow"></text>
					</view>
				</picker>
			</p>
			<p @click="openAddress">
				<view class="picker">
					<text>{{pickerText}}</text>
					<text class="iconfont icon-rightarrow"></text>
				</view>
				<simpleAddress ref="simpleAddress" @onConfirm="onConfirm" style="width: 0;"></simpleAddress>
			</p>
			<p>
				<!-- <picker mode="selector" :range="classList" :value="classIndex" @change="">
					<view class="picker">
						{{classList[classIndex]}}
						<text class="iconfont icon-rightarrow"></text>
					</view>
				</picker> -->
				<input type="text" placeholder="请输入班级" v-model="info.ClassName"/>
			</p>
			<p>
				<input type="text" placeholder="请输入寝室" v-model="info.DormName"/>
			</p>
			<p @click='showPop'>
				<text>注册</text>
			</p>
		</div>
		<uni-popup ref="popUp1" type="dialog">
		    <uni-popup-dialog type="info" title="提示" content="提交后信息无法修改,确认提交吗" @confirm="submit"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	
	import simpleAddress from '../../../components/simple-address/simple-address.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	var that = null
	
	export default {
		data() {
			return {
				imgUrl: '',
				schoolList: ['请选择学校'],
				schoolIndex: 0,
				facultyList: ['请选择学院'],
				facultyIndex: 0,
				pickerText: '请选择院校地址',
				classList: ['请选择班级'],
				classIndex: 0,
				schoolOriginalList: [],
				facultyOriginalList: [],
				info: {},
				areaList: []
			};
		},
		components: {
			simpleAddress,
			uniPopupDialog
		},
		onLoad() {
			that = this
			this.getSchoolList()
		},
		methods: {
			//顶部返回按键
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
			//省市区选择器开启
			openAddress(){
				this.$refs.simpleAddress.open()
			},
			//省市区选择器确定事件
			onConfirm(e) {
				console.log(e)
				this.pickerText = e.label;
				// this.areaList[0] = e.provinceCode
				// this.areaList[1] = e.cityCode
				// this.areaList[2] = e.areaCode
				this.areaList = e.labelArr
			},
			//头像获取
			chooseImg(){
				uni.chooseImage({
					count: 1,
					success(res) {
						uni.showLoading({
							mask: true
						})
						console.log(res)
						uni.uploadFile({
							url: 'http://hw.tyabc.cn/api/account/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							success: function(e){
								console.log(e)
								that.imgUrl = that.httpUrl + JSON.parse(e.data).result.path
								uni.hideLoading()
							}
						})
						// let formData = new FormData()
						// formData.append('file', res.tempFiles[0])
						// let config = {
						// 	headers: { //添加请求头
						// 		'Content-Type': 'multipart/form-data'
						// 	}
						// }
						// that.axios.post('http://192.168.101.5:50588/api/account/upload', formData, config).then((res) => {
						// 	that.imgUrl = that.httpUrl + res.data.result.path
						// 	uni.hideLoading()
						// })
					}
				})
			},
			//获取学校列表
			getSchoolList(){
				this.$http.get(this.api.getSchoolList).then((res) => {
					that.schoolOriginalList = res.data
					let arr = []
					for(let i = 0; i < that.schoolOriginalList.length; i++){
						arr.push(that.schoolOriginalList[i].name)
					}
					that.schoolList = ['请选择学校'].concat(arr)
				}).catch((err) => {
					console.log(err)
				})
			},
			//选择学校确定事件
			choosedSchool(e){
				that.schoolIndex = e.detail.value
				if(that.schoolIndex != 0){
					that.$http.get(`${that.api.getFacultyList}${that.schoolOriginalList[that.schoolIndex-1].id}`).then((res) => {
						that.facultyOriginalList = res.data
						let arr = []
						for(let i = 0; i < res.data.length; i++){
							arr.push(res.data[i].name)
						}
						that.facultyList = ['请选择学院'].concat(arr)
					}).catch((err) => {
						console.log(err)
					})
				}
			},
			//选择学院确定事件
			choosedFaculty(e){
				that.facultyIndex = e.detail.value
			},
			showPop(){
				if(this.imgUrl == ''){
					uni.showToast({
						title: '请上传头像',
						icon:'none'
					})
					return
				}else{
					this.info.Avatar = this.imgUrl
				}
				if(!this.info.Name || !this.info.Name.trim().length){
					uni.showToast({
						title: '请填写姓名',
						icon:'none'
					})
					return
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.info.UserName))){
					uni.showToast({
						title: '请填写正确手机号',
						icon:'none'
					})
					return
				}
				if(!this.schoolIndex){
					uni.showToast({
						title: '请选择学校',
						icon:'none'
					})
					return
				}else{
					this.info.CategoryId = this.schoolOriginalList[this.schoolIndex-1].id
				}
				if(!this.facultyIndex){
					uni.showToast({
						title: '请选择学院',
						icon:'none'
					})
					return
				}else{
					this.info.SubCategoryId = this.facultyOriginalList[this.facultyIndex-1].id
				}
				if(!this.areaList.length){
					uni.showToast({
						title: '请选择院校地址',
						icon:'none'
					})
					return
				}else{
					this.info.Province = this.areaList[0]
					this.info.City = this.areaList[1]
					this.info.Country = this.areaList[2]
				}
				if(!this.info.ClassName || !this.info.ClassName.trim().length){
					uni.showToast({
						title: '请填写班级',
						icon:'none'
					})
					return
				}
				if(!this.info.DormName || !this.info.DormName.trim().length){
					uni.showToast({
						title: '请填写寝室',
						icon:'none'
					})
					return
				}
				this.$refs.popUp1.open()
			},
			//提交注册信息
			submit(){
				
				uni.showLoading({
					mask: true
				})
				this.$http.post(this.api.register, this.info).then((res) => {
					if(res.id){
						uni.showToast({
							title: '注册成功',
							success() {
								setTimeout(() => {
									uni.reLaunch({
										url: '../login'
									})
								}, 500)
							}
						})
					}else{
						uni.showToast({
							icon: 'none',
							title: '手机号已被注册'
						})
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="less">
	.register{
		padding-top: 160rpx;
		.top_back{
			position: fixed;
			top: 40rpx;
			width: 100%;
			font-size: 36rpx;
			color: #fff;
			line-height: 100rpx;
			z-index: 5;
			text-align: center;
			text{
				position: absolute;
				left: 40rpx;
				top: 10rpx;
			}
		}
		&>image{
			width: 100%;
			position: fixed;
			top: 0;
		}
		.content{
			padding: 40rpx;
			background-color: #fff;
			border-radius: 20rpx;
			position: relative;
			z-index: 4;
			margin: 0 16rpx;
			&>div{
				text-align: center;
				position: relative;
				p{
					width: 128rpx;
					height: 128rpx;
					border-radius: 128rpx;
					overflow: hidden;
					display: inline-block;
					background-color: #f7f7f7;
					text{
						color: #999;
						font-size: 98rpx;
					}
				}
				&>text{
					position: absolute;
					transform: scale(0.6);
					color: #15C1B3;
					left: 50%;
					margin-left: 10rpx;
					font-size: 60rpx;
					bottom: -20rpx;
				}
			}
			&>p{
				display: flex;
				margin: 40rpx;
				background-color: #f7f7f7;
				padding: 0 30rpx;
				line-height: 100rpx;
				border-radius: 50rpx;
				font-size: 28rpx;
				color: #999;
				&>input{
					height: 100rpx;
					line-height: 100rpx;
					flex: 1;
					font-size: 28rpx;
					color: #999;
				}
				.iconfont{
					font-size: 30rpx;
				}
				uni-picker{
					width: 100%;
				}
				.picker{
					width: 100%;
					display: flex;
					justify-content: space-between;
				}
				&:last-of-type{
					background: linear-gradient(to right, #7DEBD0, #21C6B6);
					text-align: center;
					font-size: 32rpx;
					font-weight: 600;
					color: #fff;
					justify-content: center;
				}
			}
		}
	}
</style>
