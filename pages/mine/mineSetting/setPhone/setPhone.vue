<template>
	<view class="set_phone">
		<div class="have_phone" v-if="bindPhone">
			<p>
				<text class="iconfont icon-shouji"></text>
			</p>
			<p>
				绑定的手机号：{{phoneNumber}}
			</p>
			<p @click="bindPhone = false">更换手机号</p>
		</div>
		<div v-else class="change_phone">
			<p>
				<input type="text" placeholder="请输入手机号" />
			</p>
			<p>
				<input type="text" placeholder="请输入验证码" />
				<span v-if="notGetCode">获取验证码</span>
				<span v-else>{{secondNum}}s后重试</span>
			</p>
			<p @click="bindPhone = true">确认更换</p>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bindPhone: false,
				phoneNumber: '1333333333',
				notGetCode: true,
				secondNum: 60
			};
		}
	}
</script>

<style lang="less">
	.set_phone{
		.have_phone{
			padding: 100rpx 70rpx;
			background-color: #fff;
			border-top: 1rpx solid #f8f8f8;
			p{
				text-align: center;
				&:nth-of-type(1){
					color: #111;
					text{
						font-size: 100rpx;
					}
				}
				&:nth-of-type(2){
					font-size: 28rpx;
					color: #333;
					line-height: 100rpx;
				}
				&:nth-of-type(3){
					background: linear-gradient(to right, #7DEBD0, #21C6B6);
					font-size: 32rpx;
					color: #fff;
					font-weight: 600;
					line-height: 100rpx;
					border-radius: 50rpx;
				}
			}
		}
		.change_phone{
			padding: 70rpx;
			background-color: #fff;
			border-top: 1rpx solid #f8f8f8;
			p{
				display: flex;
				border-radius: 50rpx;
				background-color: #f8f8f8;
				padding: 0 40rpx;
				line-height: 100rpx;
				margin-top: 40rpx;
				input{
					flex: 1;
					height: 100rpx;
					line-height: 100rpx;
					font-size: 28rpx;
				}
				span{
					width: 160rpx;
					text-align: center;
					color: #15C1B3;
					font-size: 24rpx;
				}
				&:nth-of-type(3){
					background: linear-gradient(to right, #7DEBD0, #21C6B6);
					font-size: 32rpx;
					color: #fff;
					font-weight: 600;
					justify-content: center;
				}
			}
		}
	}
</style>
