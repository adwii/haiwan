<template>
	<view class="top_tab" :style="{paddingTop: phoneType ? '70rpx' : '40rpx'}">
		<text>{{pageName}}</text>
		<div v-if="searchShow" class="search_input">
			<text class="iconfont icon-sousuo"></text>
			<p @click="searchFocus">学习部</p>
		</div>
		<div class="right_icon">
			<text class="iconfont icon-saoma" @click="scanCode"></text>
			<text class="iconfont icon-xiaoxi" @click="toNotice"></text>
			<text class="notice_num" @click="toNotice" v-if="noticeNum > 0">{{noticeNum}}</text>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneType: this.$store.state.phoneType,
				noticeNum: this.$store.state.ApplyNotice.length
			};
		},
		props: {
			pageName: {
				type: String
			},
			searchShow: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			scanCode(){
				uni.scanCode({
					complete() {
						
					}
				})
			},
			searchFocus(){
				if(this.pageName != '搜索'){
					uni.redirectTo({
						url: '../../pages/addOrg/addOrg'
					})
				}
			},
			toNotice(){
				uni.navigateTo({
					url: '../../pages/notices/notices'
				})
			}
		}
	}
</script>

<style lang="less">
	.top_tab{
		position: fixed;
		top: 0;
		width: 100%;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		padding-bottom: 30rpx;
		z-index: 10;
		.iconfont{
			color: #999999;
		}
		&>text{
			margin-left: 30rpx;
			line-height: 70rpx;
			&:nth-of-type(1){
				font-size: 28rpx;
				flex: 1;
			}
		}
		// div{
			.search_input{
				background-color: #f7f7f7;
				display: flex;
				line-height: 70rpx;
				padding: 0 20rpx;
				p{
					height: 70rpx;
					line-height: 70rpx;
					font-size: 28rpx;
					color: #999;
					width: 350rpx;
				}
			}
			.right_icon{
				position: relative;
				text{
					margin: 0 30rpx;
					&:nth-of-type(1){
						margin-right: 0;
					}
				}
				line-height: 70rpx;
				.notice_num{
					position: absolute;
					padding: 6rpx 10rpx;
					font-size: 20rpx;
					background-color: #FE4A48;
					color: #fff;
					right: -10rpx;
					top: 0rpx;
					line-height: 20rpx;
					border-radius: 100%;
				}
			}
		// }
	}
</style>
