<template>
	<view class="about_us">
		<div class="content">
			<p>
				<image :src="info.img"></image>
			</p>
			<p>{{info.name}}</p>
			<p>{{info.version}}</p>
		</div>
		<div class="opera_list">
			<div>
				<p>
					<span>版本更新</span>
				</p>
				<p>
					<text class="iconfont icon-rightarrow"></text>
				</p>
			</div>
			<div>
				<p>
					<span>客服热线</span>
				</p>
				<p>
					<span>{{info.kefu}}</span>
				</p>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					img: '',
					name: '嗨玩',
					version: 'H1.0.1',
					kefu: '1333333333'
				}
			};
		}
	}
</script>

<style lang="less">
	.about_us{
		.content{
			padding: 114rpx 0;
			text-align: center;
			background-color: #fff;
			p{
				color: #333;
				&:nth-of-type(1){
					image{
						width: 120rpx;
						height: 120rpx;
						display: inline-block;
						border-radius: 120rpx;
						background-color: #f1f1f1;
					}
				}
				&:nth-of-type(2){
					font-size: 40rpx;
					font-weight: 600;
					line-height: 80rpx;
				}
				&:nth-of-type(3){
					font-size: 26rpx;
				}
			}
		}
		.opera_list{
			margin: 20rpx 0;
			background-color: #fff;
			div{
				border-bottom: 1rpx solid #f8f8f8;
				font-size: 28rpx;
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				p{
					line-height: 70rpx;
					&:nth-of-type(1){
						color: #333;
					}
					&:nth-of-type(2){
						color: #858585;
					}
				}
			}
		}
	}
</style>
