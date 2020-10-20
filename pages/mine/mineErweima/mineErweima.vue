<template>
	<view class="mine_erweima">
		<div class="content">
			<div>
				<image :src="info.imgUrl"></image>
				<div>
					<p>{{info.name}}</p>
					<p>{{info.idf}}</p>
				</div>
			</div>
			<image :src="info.erweima"></image>
			<p>扫一扫二维码，加入嗨玩</p>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					name: '四单反',
					idf: '学生会',
					imgUrl: '',
					erweima: ''
				}
			};
		}
	}
</script>

<style lang="less">
	.mine_erweima{
		.content{
			position: absolute;
			margin: 0 50rpx;
			background-color: #fff;
			border-radius: 20rpx;
			padding: 40rpx 70rpx;
			top: 50%;
			margin-top: -450rpx;
			&>div{
				display: flex;
				image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 120rpx;
					background-color: #f8f8f8;
					margin-right: 20rpx;
				}
				&>div{
					p{
						&:nth-of-type(1){
							font-size: 40rpx;
							line-height: 70rpx;
							color: #333;
						}
						&:nth-of-type(2){
							font-size: 28rpx;
							line-height: 40rpx;
							color: #858585;
						}
					}
				}
			}
			&>image{
				width: 500rpx;
				height: 500rpx;
				margin: 20rpx 0;
				background-color: #f8f8f8;
			}
			&>p{
				font-size: 28rpx;
				color: #858585;
				text-align: center;
			}
		}
	}
</style>
