<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			// uni.scanCode({
			// 	complete() {
			// 		console.log(1)
			// 	}
			// })
			let timObj1 = uni.getStorageSync('userInfo')
			console.log(timObj1)
			if(timObj1 && this.$store.state.isSDKReady){
				let timObj = JSON.parse(timObj1)
				console.log(timObj)
				console.log(1)
				uni.redirectTo({
					url: '../organize/organize'
				})
			}else if(timObj1 && !this.$store.state.isSDKReady){
				console.log(2)
				let timObj = JSON.parse(timObj1)
				console.log(timObj)
				let userId = timObj.userId
				let sigObj = this.genTestUserSig(timObj.userId)
				let promise = this.tim.login({
					userID: userId,
					userSig: sigObj.userSig
				})
				promise.then((res) => {
					console.log(res)
					this.$store.commit("toggleIsLogin", true);
					setTimeout(() => {
						uni.reLaunch({
							url: '../organize/organize'
						});
						uni.hideLoading()
					},2000)
				})
			}else{
				console.log(3)
				uni.redirectTo({
					url: '../login/login'
				})
			}
		}
	}
</script>

<style lang="less">

</style>
