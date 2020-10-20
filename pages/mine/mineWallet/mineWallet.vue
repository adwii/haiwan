<template>
	<view class="mine_wallet">
		<image src="../../../static/wallet_bg.png" mode="widthFix"></image>
		<div class="balance_info">
			<div>
				<div>
					<p>{{info.balance}}</p>
					<p>账户余额</p>
				</div>
				<div>
					<p @click="toTransDetail">明细</p>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					balance: '10.00'
				}
			};
		},
		methods: {
			toTransDetail(){
				uni.navigateTo({
					url: '../transDetail/transDetail'
				})
			}
		}
	}
</script>

<style lang="less">
	.mine_wallet{
		&>image{
			position: absolute;
			top: 0;
			width: 100%;
		}
		.balance_info{
			position: relative;
			z-index: 2;
			color: #fff;
			&>div{
				display: flex;
				justify-content: space-between;
				padding: 40rpx 30rpx;
				&>div{
					&:nth-of-type(1){
						p{
							&:nth-of-type(1){
								font-size: 40rpx;
								font-weight: 600;
							}
							&:nth-of-type(2){
								font-size: 26rpx;
							}
						}
					}
					&:nth-of-type(2){
						display: flex;
						justify-content: center;
						flex-direction: column;
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>
