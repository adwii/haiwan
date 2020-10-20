<template>
	<view class="login">
		<image src="../../static/beijin.jpg" mode="widthFix"></image>
		<div class="content">
			<p>用户登录</p>
			<p>
				<input type="number" confirm-type="next" @confirm="focusCode = true" maxlength="11" placeholder="请输入手机号" v-model="info.UserName"/>
			</p>
			<p>
				<input type="text" confirm-type="done" :focus="focusCode" @confirm="loginSubmit" placeholder="请输入验证码" v-model="info.Password"/>
				<span @click="getVerCode">{{getCode ? '获取验证码' : second + 's后重试'}}</span>
			</p>
			<p @click='loginSubmit'>登录</p>
			<p>
				<span>没有账号？立即扫码</span>
				<navigator url="./register/register" open-type="navigate">注册</navigator>
			</p>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				getCode: true,
				second: 60,
				info: {},
				focusCode: false
			}
		},
		onLoad() {

		},
		methods: {
			loginSubmit(){
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.info.UserName))){
					uni.showToast({
						title: '请填写正确手机号',
						icon:'none'
					})
					return
				}
				if(!this.info.Password || !this.info.Password.trim().length){
					uni.showToast({
						title: '请填写验证码',
						icon:'none'
					})
					return
				}
				uni.showLoading({
					mask: true
				})
				// console.log(this.genTestUserSig(this.info.UserName))
				this.$http.post(this.api.login, this.info).then((res) => {
					uni.setStorageSync('token', res.token)
					let timObj = this.genTestUserSig(String(res.id))
					console.log(timObj)
					timObj.userId = String(res.id)
					uni.setStorageSync('userInfo', JSON.stringify(timObj))
					this.$store.commit('getTimUserInfo',timObj)
					// this.$http.get(`${this.api.userInfo}/${this.$store.state.TimUserId}`).then((e) => {
					// 	console.log(e)
					// })
					let promise = this.tim.login({
						userID: String(res.id),
						userSig: timObj.userSig
					})
					promise.then(() => {
						this.$store.commit("toggleIsLogin", true);
						setTimeout(() => {
							uni.reLaunch({
								url: '../organize/organize'
							});
							uni.hideLoading()
						},1000)
					})
				}).catch((err) => {
					if(err.data.msg == "Unauthorized"){
						// uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: '请先注册使用'
						})
					}
					uni.hideLoading()
				})
			},
			getVerCode(){
				if(this.getCode){
					this.getCode = false
					let setSecond = setInterval(() => {
						if(this.second <= 0){
							this.getCode = true
							clearInterval(setSecond)
							this.second = 60
						}else{
							this.second -= 1
						}
					},1000)
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #ffffff;
	}
	.login{
		&>image{
			width: 100%;
		}
		.content{
			text-align: center;
			p{
				&:nth-of-type(1){
					margin: 54rpx 0;
					font-size: 36rpx;
					color: #333333;
					font-weight: 600;
				}
				&:nth-of-type(2),&:nth-of-type(3),&:nth-of-type(4){
					background-color: #f7f7f7;
					color: #666;
					display: flex;
					padding: 0 30rpx;
					font-size: 28rpx;
					border-radius: 50rpx;
					margin: 40rpx 80rpx;
					line-height: 100rpx;
					input{
						flex: 1;
						height: 100rpx;
						line-height: 100rpx;
						text-align: left;
						font-size: 28rpx;
					}
					span{
						width: 170rpx;
						color: #15C1B3;
					}
				}
				&:nth-of-type(4){
					background: linear-gradient(to right, #7DEBD0, #21C6B6);
					text-align: center;
					font-size: 32rpx;
					font-weight: 600;
					color: #fff;
					justify-content: center;
				}
				&:nth-of-type(5){
					display: flex;
					font-size: 28rpx;
					color: #999;
					justify-content: center;
					navigator{
						color: #15C1B3;
					}
				}
			}
		}
	}
</style>
