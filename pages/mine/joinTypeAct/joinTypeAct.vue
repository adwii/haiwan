<template>
	<view class="join_type_act">
		<div class="release_content">
			<p>选择你要发布的活动类型</p>
			<p>
				<span>已发布：{{number}}个</span>
				<span @click="checkHis">立即查看</span>
			</p>
		</div>
		<div class="type_choose">
			<ul>
				<li v-for="(item,index) in typeList" :key='index' @click="chooseType(index)">
					<image :src="item.img"></image>
					<p>{{item.label}}</p>
				</li>
			</ul>
			<text class="iconfont icon-quxiao-filled" @click="backDet"></text>
		</div>
	</view>
</template>

<script>
	
	import uniIcons from '../../../components/uni-icons/uni-icons.vue'
	
	export default {
		data() {
			return {
				number: 10,
				typeList: [
					{
						img: '../../../static/join_vote.png',
						label: '投票类'
					},
					{
						img: '../../../static/join_apply.png',
						label: '报名类'
					},
					{
						img: '../../../static/join_forum.png',
						label: '论坛类'
					},
					{
						img: '../../../static/join_outreach.png',
						label: '外联'
					}
				]
			};
		},
		components: {
			uniIcons
		},
		methods: {
			backDet(){
				uni.navigateBack({
					delta: 1
				})
			},
			checkHis(){
				uni.navigateTo({
					url: '../historyAct/historyAct'
				})
			},
			chooseType(i){
				let type = ''
				switch(i){
					case 0:
						type = 'vote'
						break;
					case 1:
						type = 'apply'
						break;
					case 2:
						type = 'forum'
						break;
					case 3:
					return
						break;
				}
				uni.navigateTo({
					url: './editVoteActivity/editVoteActivity?type=' + type
				})
			}
		}
	}
</script>

<style lang="less">
	.join_type_act{
		.release_content{
			// background-color: #fff;
			border-radius: 20rpx;
			margin: 40rpx 30rpx;
			background: url('~@/static/joinType_bg.png') no-repeat right top, #fff;
			background-size: 26%;
			padding: 40rpx;
			p{
				&:nth-of-type(1){
					font-size: 32rpx;
					color: #15C1B3;
					font-weight: 600;
				}
				&:nth-of-type(2){
					font-size: 28rpx;
					margin-top: 30rpx;
					display: flex;
					padding-right: 100rpx;
					justify-content: space-between;
					line-height: 50rpx;
					span{
						&:nth-of-type(1){
							color: #858585;
						}
						&:nth-of-type(2){
							color: #fff;
							background: linear-gradient(to right, #7DEBD0, #38CDBE);
							width: 170rpx;
							text-align: center;
							border-radius: 30rpx;
						}
					}
				}
			}
		}
		.type_choose{
			position: absolute;
			bottom: 70rpx;
			left: 0;
			width: 100%;
			ul{
				display: flex;
				li{
					flex: 1;
					text-align: center;
					font-size: 28rpx;
					color: #333;
					margin: 0 20rpx;
					image{
						display: inline-block;
						width: 120rpx;
						height: 120rpx;
					}
					p{
						margin-top: 20rpx;
					}
				}
			}
			&>text{
				display: block;
				text-align: center;
				font-size: 80rpx;
				color: #15C1B3;
				margin-top: 50rpx;
			}
		}
	}
</style>
