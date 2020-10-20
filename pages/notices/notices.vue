<template>
	<view class="notices">
		<view class="nav_switch">
			<div v-for="(item,index) in navList" :key='index' @click='changeNav(index)'>
				<text :class="item.choosed ? 'active' : ''">{{item.name}}</text>
				<image src="../../static/nav_bg.png" v-if="item.choosed"></image>
			</div>
		</view>
		<div class="apply_list">
			<div v-for="(item,index) in applyList" :key='index'>
				<p>
					<image :src="item.from_user.avatar" @click="navTo(index)"></image>
					<text  @click="navTo(index)">{{item.from_user.name}}</text>
				</p>
				<p>
					<span @click="refuse(index)">拒绝</span>
					<span @click="agree(index)">同意</span>
				</p>
			</div>
		</div>
		<uni-popup ref="popUp1" type="dialog">
		    <uni-popup-dialog type="info" title="提示" content="确认拒绝该好友吗？" @confirm="refuseConfirm"></uni-popup-dialog>
		</uni-popup>
		<u-empty text="暂无数据" mode="list" :show="emptyShow" color="#75E7CB" margin-top='300'></u-empty>
	</view>
</template>

<script>
	
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	export default {
		data() {
			return {
				navList: [
					{
						name: '好友申请',
						choosed: true
					},
				],
				applyList: this.$store.state.ApplyNotice,
				refuseIndex: '',
				emptyShow: false
				
			};
		},
		components: {
			uniPopupDialog
		},
		onReady(){
			console.log(this.applyList)
			console.log(this.emptyShow)
		},
		methods: {
			changeNav(index){
				for(let i = 0; i < this.navList.length; i++){
					this.navList[i].choosed = false
				}
				this.navList[index].choosed = true
			},
			navTo(i){
				uni.navigateTo({
					url: '../addressBook/friendDetail/friendDetail?name=' + this.applyList.name + '&userId=' + this.applyList.from_user_id
				})
			},
			refuse(i){
				this.$refs.popUp1.open()
				console.log(this.applyList)
				this.refuseIndex = i
			},
			refuseConfirm(){
				// console.log(this.refuseId)
				this.delete(this.applyList[this.refuseIndex].id)
				this.applyList.splice(this.refuseIndex,1)
				this.$store.commit('updateApplyNotice', this.applyList)
				this.$refs.popUp1.close()
				uni.showToast({
					icon: 'none',
					title: '已拒绝'
				})
			},
			agree(i){
				this.$http.post(this.api.agreeAddFriend, {
					To_Account: this.applyList[i].from_user.id
				}).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '已同意该好友申请'
					})
					this.delete(this.applyList[i].id)
					this.applyList.splice(i,1)
					this.$store.commit('updateApplyNotice', this.applyList)
				})
			},
			delete(id){
				this.$http.post(this.api.deleteApply,{Id: id})
			}
		}
	}
</script>

<style lang="less">
	.notices{
		.nav_switch{
			background-color: #fff;
			padding: 24rpx 34rpx;
			display: flex;
			div{
				position: relative;
				text{
					margin-right: 40rpx;
					font-size: 32rpx;
					color: #858585;
				}
				.active{
					color: #15C1B3;
					font-weight: 600;
					font-size: 35rpx;
				}
				image{
					width: 90rpx;
					position: absolute;
					bottom: -10rpx;
					left: -10rpx;
					height: 40rpx;
				}
			}
		}
		.apply_list{
			padding: 20rpx;
			&>div{
				padding: 20rpx;
				border-radius: 20rpx;
				background-color: #fff;
				display: flex;
				p{
					&:nth-of-type(1){
						flex: 1;
						display: flex;
						line-height: 100rpx;
						image{
							width: 100rpx;
							height: 100rpx;
							border-radius: 100rpx;
							background-color: #f9f9f9;
						}
						text{
							font-size: 32rpx;
							color: #222;
							margin-left: 30rpx;
						}
					}
					&:nth-of-type(2){
						width: 200rpx;
						display: flex;
						justify-content: flex-end;
						font-size: 30rpx;
						color: #999;
						line-height: 100rpx;
						span:nth-of-type(2){
							color: #15C1B3;
							margin-left: 40rpx;
						}
					}
				}
			}
		}
	}
</style>
