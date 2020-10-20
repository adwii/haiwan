<template>
	<view class="forum_activity_detail">
		<div class="content_top">
			<image src="../../../static/forum_bg.jpg" mode="widthFix"></image>
			<p><span>规则：</span>{{info.rule}}</p>
			<b>发帖</b>
		</div>
		<div class="forum_list" v-for="(item,index) in forumList" :key='index' @click="toDetail(index)">
			<div>
				<div>
					<image :src="item.imgUrl"></image>
					<div>
						<p>{{item.name}}</p>
						<p>{{item.time}}</p>
					</div>
				</div>
				<div>跟帖</div>
			</div>
			<div>{{item.content}}</div>
			<div>
				<image :src="it" v-for="(it,idx) in item.imgList" :key='idx'></image>
			</div>
			<div>
				<p>
					<text class="iconfont icon-pinglun"></text>
					跟帖：{{item.follow}}
				</p>
				<text class="iconfont icon-rightarrow"></text>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					// rule: '规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则'
				},
				forumList: [
					// {
					// 	imgUrl: '',
					// 	name: 'zz',
					// 	time: '1天前',
					// 	content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
					// 	imgList: ['','','','',''],
					// 	follow: 1122
					// },
					// {
					// 	imgUrl: '',
					// 	name: 'll',
					// 	time: '1天前',
					// 	content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
					// 	imgList: ['','','',''],
					// 	follow: 1122
					// },
					// {
					// 	imgUrl: '',
					// 	name: 'yy',
					// 	time: '1天前',
					// 	content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
					// 	imgList: ['','',''],
					// 	follow: 1122
					// }
				]
			};
		},
		onLoad() {
			
		},
		methods:{
			toDetail(i){
				uni.navigateTo({
					url: '../forumDetail/forumDetail'
				})
			}
		}
	}
</script>

<style lang="less">
	.forum_activity_detail{
		.content_top{
			position: relative;
			background-color: #fff;
			image{
				width: 100%;
			}
			p{
				color: #333;
				font-size: 28rpx;
				padding: 20rpx;
				span{
					font-weight: 600;
				}
			}
			b{
				position: absolute;
				top: 90rpx;
				right: 50rpx;
				width: 150rpx;
				line-height: 60rpx;
				font-size: 28rpx;
				text-align: center;
				color: #fff;
				background-color: #15C1B3;
				border-radius: 30rpx;
			}
		}
		.forum_list{
			margin: 20rpx 0;
			background-color: #fff;
			padding: 20rpx;
			&>div{
				&:nth-of-type(1){
					display: flex;
					justify-content: space-between;
					&>div{
						&:nth-of-type(1){
							display: flex;
							image{
								width: 70rpx;
								height: 70rpx;
								background-color: #f8f8f8;
								border-radius: 70rpx;
								margin-right: 20rpx;
							}
							&>div{
								p{
									&:nth-of-type(1){
										font-size: 28rpx;
										color: #333;
									}
									&:nth-of-type(2){
										color: #999;
										font-size: 22rpx;
									}
								}
							}
						}
						&:nth-of-type(2){
							font-size: 28rpx;
							width: 120rpx;
							color: #15C1B3;
							height: 50rpx;
							line-height: 50rpx;
							border-radius: 35rpx;
							border: 1rpx solid #15C1B3;
							text-align: center;
						}
					}
				}
				&:nth-of-type(2){
					font-size: 28rpx;
					color: #333;
					padding-top: 10rpx;
				}
				&:nth-of-type(3){
					overflow: hidden;
					image{
						float: left;
						width: 220rpx;
						height: 220rpx;
						background-color: #f8f8f8;
						margin-top: 20rpx;
						&:nth-of-type(3n-1){
							margin: 20rpx 26rpx 0;
						}
					}
				}
				&:nth-of-type(4){
					display: flex;
					justify-content: space-between;
					color: #858585;
					font-size: 28rpx;
					p{
						line-height: 50rpx;
						display: flex;
					}
					.iconfont{
						font-size: 38rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>
