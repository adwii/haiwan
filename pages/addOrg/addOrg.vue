<template>
	<view class="add_org" :style="{paddingTop: phoneType ? '170rpx' : '130rpx'}">
		<top-bar pageName="搜索" :searchShow='false'></top-bar>
		<tab-bar :current="2" @click="tabClick"></tab-bar>
		<div class="search_view">
			<div>
				<text class="iconfont icon-sousuo"></text>
				<input type="text" placeholder="学习部" v-model="info.Name" confirm-type="search" @confirm="searchIntGroup"/>
			</div>
			<div @click="searchIntGroup">搜索</div>
		</div>
		<div class="recommend" v-if="!searched">
			<p>
				<span>热门推荐：</span>
				<span v-for="(item,index) in recommendList" :key='index'>{{item}}</span>
			</p>
		</div>
		<view class="chat" v-else>
			<div v-if="chatList.length" class="has_chat">
				<div v-for="(item,index) in chatList" :key='index'>
					<image :src="item.img"></image>
					<div>
						<p>
							<span>{{item.name}}</span>
						</p>
					</div>
					<div>
						<span @click="joinGroup(index)">加入</span>
					</div>
				</div>
			</div>
			<div v-else class="no_chat">
				<div>
					还没有该兴趣群聊，创建一个吧
				</div>
				<div @click="createGroup">
					创建
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	
	var that = null
	
	export default {
		data() {
			return {
				phoneType: this.$store.state.phoneType,
				searched: false,
				recommendList: ['文化部','体育部','文化部','体育部','文化部','体育部','文化部','体育部','文化部','体育部'],
				chatList: [],
				info: {Name: ''}
			};
		},
		onLoad() {
			that = this
		},
		methods: {
			tabClick(e){
				if(e == 2){
					
				}else{
					switch(e){
						case 1:
							uni.redirectTo({
								url: '../interest/interest'
							})
							break;
						case 0:
							uni.redirectTo({
								url: '../organize/organize'
							})
							break;
						case 3:
							uni.redirectTo({
								url: '../addressBook/addressBook'
							})
							break;
						case 4:
							uni.redirectTo({
								url: '../mine/mine'
							})
					}
				}
			},
			navChat(i){
				uni.navigateTo({
					url: '../chatPage/chatPage?name=' + this.chatList[i].name
				})
			},
			searchIntGroup(){
				uni.showLoading({
					mask: true
				})
				this.$http.post(this.api.searchIntGroup, this.info).then((res) => {
					console.log(res)
					uni.hideLoading()
					that.searched = true
					that.chatList = res.data
				})
			},
			joinGroup(i){
				uni.showLoading({
					title: '加入中'
				})
				this.$http.post(this.api.joinIntGroup, {
					GroupId: this.chatList[i].id
				}).then((res) => {
					uni.hideLoading()
					uni.redirectTo({
						url: '../interest/interest'
					})
				})
			},
			createGroup(){
				uni.showLoading({
					mask: true
				})
				this.$http.post(this.api.createIntGroup, this.info).then((res) => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: '创建成功',
						success() {
							setTimeout(() => {
								uni.redirectTo({
									url: '../interest/interest'
								})
							},500)
						}
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.add_org{
		.search_view{
			background-color: #fff;
			display: flex;
			padding: 20rpx;
			div{
				&:nth-of-type(1){
					display: flex;
					padding: 14rpx;
					flex: 1;
					background-color: #f7f7f7;
					text{
						color: #999;
						font-size: 36rpx;
						// margin-top: 4rpx;
						margin-right: 16rpx;
					}
					input{
						flex: 1;
						font-size: 28rpx;
						color: #999;
						line-height: 52rpx;
						height: 52rpx;
						// margin-top: -10rpx;
					}
				}
				&:nth-of-type(2){
					font-size: 28rpx;
					color: #858585;
					width: 70rpx;
					line-height: 70rpx;
					text-align: center;
					margin-left: 20rpx;
				}
			}
		}
		.recommend{
			padding: 20rpx;
			font-size: 28rpx;
			color: #858585;
			span{
				display: inline-block;
				padding: 0 10rpx;
				margin: 16rpx 10rpx;
				&:nth-of-type(1){
					margin: 16rpx 0;
				}
			}
		}
		.chat{
			.has_chat{
				
				&>div{
					margin: 20rpx;
					background-color: #fff;
					border-radius: 16rpx;
					padding: 30rpx 20rpx;
					display: flex;
					&>image{
						width: 100rpx;
						height: 100rpx;
						margin-right: 20rpx;
					}
					&>div{
						&:nth-of-type(1){
							
							width: 450rpx;
							p{
								&:nth-of-type(1){
									line-height: 50rpx;
									span{
										display: inline-block;
										&:nth-of-type(1){
											color: #333;
											font-size: 28rpx;
											font-weight: 600;
										}
										&:nth-of-type(2){
											position: relative;
											padding-left: 30rpx;
											margin-left: 30rpx;
											text{
												
												&:nth-of-type(1){
													position: absolute;
													width: 160rpx;
													height: 40rpx;
													background-color: #FDEFD0;
													border-radius: 30rpx;
													top: 10rpx;
													left: 0;
													z-index: 0;
												}
											}
										}
										.people{
											color: #FF9B00;
											font-size: 24rpx;
											position: relative;
											z-index: 2;
											font-weight: 500;
										}
									}
								}
								&:nth-of-type(2){
									line-height: 40rpx;
									font-size: 26rpx;
									color: #858585;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}
						}
						&:nth-of-type(2){
							display: flex;
							justify-content: center;
							flex-direction: column;
							span{
								background-color: #20C5B5;
								color: #fff;
								width: 100rpx;
								line-height: 60rpx;
								font-size: 28rpx;
								text-align: center;
								border-radius: 18rpx;
							}
						}
					}
				}
			}
			.no_chat{
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
				margin: 30rpx;
				background-color: #fff;
				padding: 30rpx;
				border-radius: 20rpx;
				div:nth-of-type(2){
					color: #15C1B3;
				}
			}
		}
	}
</style>
