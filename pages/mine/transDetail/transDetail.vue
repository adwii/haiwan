<template>
	<view class="trans_detail">
		<picker mode="selector" :range="typeList" :value="typeIndex" @change="">
			<view class="picker">
				<span>交易类型：{{typeList[typeIndex]}}</span>
				<text class="iconfont icon-xiala"></text>
			</view>
		</picker>
		<div class="detail_list">
			<div v-for="(item,index) in detailList" :key='index'>
				<div>
					<image src="../../../static/detail_tui.png" v-if="item.status == 'back'"></image>
					<image src="../../../static/detail_pay.png" v-if="item.status == 'pay'"></image>
					<div>
						<p>{{item.label}}</p>
						<p>{{item.time}}</p>
					</div>
				</div>
				<div>
					<p v-if="item.status == 'back'" class="plus">+{{item.money}}</p>
					<p v-if="item.status == 'pay'" class="less">-{{item.money}}</p>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeIndex: 0,
				typeList: ['全部','支付','退款'],
				detailList: [
					{
						status: 'pay',
						label: '活动支付',
						time: '2020-05-20 13:14:15',
						money: '15.00'
					},
					{
						status: 'back',
						label: '活动退款',
						time: '2020-05-20 13:14:15',
						money: '15.00'
					}
				]
			};
		}
	}
</script>

<style lang="less">
	.trans_detail{
		picker{
			.picker{
				display: flex;
				justify-content: space-between;
				padding: 30rpx;
				background-color: #fff;
				color: #333;
				font-size: 28rpx;
				border-top: 1rpx solid #f8f8f8;
				text{
					font-size: 26rpx;
					color: #999;
				}
			}
		}
		.detail_list{
			background-color: #fff;
			margin: 20rpx 0;
			&>div{
				border-bottom: 1rpx solid #f8f8f8;
				padding: 20rpx 26rpx;
				display: flex;
				justify-content: space-between;
				&>div{
					display: flex;
					&:nth-of-type(1){
						image{
							width: 80rpx;
							height: 80rpx;
							margin-right: 20rpx;
						}
						div{
							p{
								&:nth-of-type(1){
									font-size: 28rpx;
									font-weight: 600;
									color: #333;
									line-height: 50rpx;
								}
								&:nth-of-type(2){
									font-size: 20rpx;
									color: #858585;
									line-height: 30rpx;
								}
							}
						}
					}
					&:nth-of-type(2){
						flex-direction: column;
						justify-content: center;
						font-size: 28rpx;
						color: #333;
						.plus{
							color: #FF9B00;
							font-weight: 600;
						}
					}
				}
			}
		}
	}
</style>
