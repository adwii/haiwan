<template>
	<view class="forum_detail">
		<div class="forum_list">
			<div>
				<div>
					<image :src="info.imgUrl"></image>
					<div>
						<p>{{info.name}}</p>
						<p>{{info.time}}</p>
					</div>
				</div>
				<div @click="toAdd">跟帖</div>
			</div>
			<div>{{info.content}}</div>
			<div>
				<image :src="it" v-for="(it,idx) in info.imgList" :key='idx'></image>
			</div>
			<!-- <div>
				<p>
					<text class="iconfont icon-pinglun"></text>
					跟帖：{{info.follow}}
				</p>
				<text class="iconfont icon-rightarrow"></text>
			</div> -->
		</div>
		<div >
			<div class='follow_list' v-for="(item,index) in followList" :key='index'>
				<div>
					<div>
						<image :src="item.imgUrl"></image>
						<div>
							<p>{{item.name}}</p>
							<p>{{item.time}}</p>
						</div>
					</div>
					<div>
						<text class="iconfont icon-pinglun"></text>
						跟帖
					</div>
				</div>
				<div>{{item.content}}</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					imgUrl: '',
					name: 'zz',
					time: '1天前',
					content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
					imgList: ['','','','',''],
					follow: 1122
				},
				followList: [
					// {
					// 	imgUrl: '',
					// 	name: 'zz',
					// 	time: '1天前',
					// 	content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
					// },
					// {
					// 	imgUrl: '',
					// 	name: 'zz',
					// 	time: '1天前',
					// 	content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
					// }
				]
			};
		},
		onLoad() {
			
		},
		methods: {
			toAdd(){
				uni.navigateTo({
					url: '../addForum/addForum'
				})
			}
		}
	}
</script>

<style lang="less">
	.forum_detail{
		.forum_list, .follow_list{
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
		.follow_list{
			margin: 2rpx 0;
			&>div{
				&:nth-of-type(1){
					&>div{
						&:nth-of-type(2){
							border: none;
							color: #858585;
							display: flex;
							justify-content: flex-end;
							text{
								margin-right: 8rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
