<template>
	<view class="add_forum">
		<textarea placeholder="感谢您的意见与建议..." />
		<div class="img_list">
			<div v-for="(item,index) in imgList" :key='index'>
				<image :src="item"></image>
				<text class="iconfont icon-quxiao" @click="removeImg(index)"></text>
			</div>
			<div>
				<text class="iconfont icon-jia"></text>
			</div>
		</div>
		<div class="release">发布</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: ['','']
			};
		},
		methods: {
			removeImg(i){
				this.imgList.splice(i,1)
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #fff;
	}
	.add_forum{
		textarea{
			width: 710rpx;
			margin: 20rpx;
			font-size: 28rpx;
		}
		.img_list{
			overflow: hidden;
			padding: 20rpx;
			div{
				width: 220rpx;
				height: 220rpx;
				float: left;
				text-align: center;
				line-height: 220rpx;
				color: #BFC2CC;
				position: relative;
				background-color: #f8f8f8;
				margin-top: 20rpx;
				&:nth-of-type(3n-1){
					margin: 20rpx 26rpx 0;
				}
				image{
					width: 220rpx;
					height: 220rpx;
				}
				.icon-jia{
					font-size: 60rpx;
				}
				.icon-quxiao{
					font-size: 40rpx;
					position: absolute;
					right: -10rpx;
					top: -10rpx;
					line-height: 40rpx;
				}
			}
		}
		.release{
			position: absolute;
			bottom: 40rpx;
			margin: 0 70rpx;
			background: linear-gradient(to right, #75E7CB, #21C6B6);
			font-size: 30rpx;
			color: #fff;
			line-height: 100rpx;
			border-radius: 50rpx;
			width: 610rpx;
			text-align: center;
			font-weight: 600;
		}
	}
</style>
