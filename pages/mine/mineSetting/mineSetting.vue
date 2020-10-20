<template>
	<view class="mine_setting">
		<div v-for="(item,index) in setList" :key='index' @click='setClick(index)'>
			<p>
				{{item.label}}
			</p>
			<p>
				{{item.value || ''}}
				<switch :checked="false" @change="" v-if="index == 1"/>
				<text class="iconfont icon-rightarrow" v-else></text>
			</p>
		</div>
		<uni-popup type="dialog" ref="popUp1">
			<uni-popup-dialog type="error" title="提示" :content="popInfo" @confirm="navTo"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	export default {
		data() {
			return {
				setList:[
					{
						label: '手机号',
						value: '1333333333'
					},
					{
						label: '新消息提醒'
					},
					{
						label: '清理缓存'
					},
					{
						label: '关于嗨玩'
					},
					{
						label: '意见反馈'
					},
					{
						label: '退出'
					}
				],
				popInfo: ''
			};
		},
		components: {
			uniPopupDialog
		},
		methods: {
			setClick(i){
				switch(i){
					case 0:
						uni.navigateTo({
							url: './setPhone/setPhone'
						})
						break;
					case 2:
						uni.showToast({
							title: '清理缓存完成'
						})
						break;
					case 3:
						uni.navigateTo({
							url: './aboutUs/aboutUs'
						})
						break;
					case 4:
						uni.navigateTo({
							url: './feedBack/feedBack'
						})
						break;
					case 5:
						this.popInfo = '确定退出当前账号？'
						this.$refs.popUp1.open()
						break;
				}
			},
			navTo(){
				uni.clearStorageSync()
				this.tim.logout()
				uni.reLaunch({
					url: '../../login/login'
				})
			}
		}
	}
</script>

<style lang="less">
	.mine_setting{
		&>div{
			display: flex;
			background-color: #fff;
			border-bottom: 1rpx solid #f8f8f8;
			padding: 20rpx;
			justify-content: space-between;
			font-size: 28rpx;
			color: #333;
			line-height: 70rpx;
			text{
				color: #858585;
				font-weight: 600;
				font-size: 32rpx;
			}
			switch{
				transform: scale(0.6);
			}
			&:nth-of-type(1),&:nth-of-type(4),&:nth-of-type(6){
				margin-top: 20rpx;
			}
		}
	}
</style>
