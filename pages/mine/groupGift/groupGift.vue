<template>
	<view class="group_gift">
		<div v-for="(item,index) in giftList" :key='index'>
			<image src="../../../static/gift_notuse.png" mode="widthFix" v-if="item.status"></image>
			<image src="../../../static/gift_used.png" mode="widthFix" v-else></image>
			<div class="content">
				<div>
					<p><text>￥</text>{{item.money}}</p>
					<p>满{{item.fullMoney}}元可用</p>
				</div>
				<div>
					<p>{{item.name}}</p>
					<p>{{item.time}}</p>
				</div>
			</div>
			<p class="tips">嗨玩福利券</p>
			<p class="used">
				{{item.status ? '立即使用' : '已经使用'}}
			</p>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				giftList: [
					{
						status: 1,
						money: 10,
						fullMoney: 50,
						name: '优惠券名称',
						time: '2020-01-01至2020-12-31'
					},
					{
						status: 0,
						money: 10,
						fullMoney: 50,
						name: '优惠券名称',
						time: '2020-01-01至2020-12-31'
					},
					{
						status: 0,
						money: 10,
						fullMoney: 50,
						name: '优惠券名称',
						time: '2020-01-01至2020-12-31'
					}
				]
			};
		}
	}
</script>

<style lang="less">
	.group_gift{
		&>div{
			margin: 20rpx;
			position: relative;
			&>image{
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}
			.tips{
				position: absolute;
				top: 20rpx;
				right: 130rpx;
				z-index: 3;
				font-size: 24rpx;
				background: linear-gradient(to right, #38CDBE, #75E7CB);
				padding: 4rpx 20rpx;
				border-radius: 20rpx;
				color: #fff;
			}
			.used{
				position: absolute;
				right: 20rpx;
				top: 60rpx;
				width: 60rpx;
				font-size: 28rpx;
				font-weight: 600;
				color: #fff;
				z-index: 3;
			}
			&>div{
				position: relative;
				z-index: 2;
				display: flex;
				padding: 40rpx 40rpx;
				&>div{
					&:nth-of-type(1){
						margin-right: 90rpx;
						p{
							color: #15C1B3;
							&:nth-of-type(1){
								font-size: 60rpx;
								font-weight: 600;
								vertical-align: baseline;
								text{
									font-size: 28rpx;
								}
							}
							&:nth-of-type(2){
								font-size: 24rpx;
								line-height: 40rpx;
							}
						}
					}
					&:nth-of-type(2){
						p{
							line-height: 68rpx;
							&:nth-of-type(1){
								font-size: 28rpx;
								color: #333;
							}
							&:nth-of-type(2){
								font-size: 24rpx;
								color: #858585;
							}
						}
					}
				}
			}
		}
	}
</style>
