<template>
	<view class="organize" :style="{paddingTop: phoneType ? '170rpx' : '130rpx'}">
		<top-bar pageName="组织社区"></top-bar>
		<tab-bar :current="0" @click="tabClick"></tab-bar>
		<view class="nav_switch">
			<div v-for="(item,index) in navList" :key='index' @click='changeNav(index)'>
				<text :class="item.choosed ? 'active' : ''">{{item.name}}</text>
				<image src="../../static/nav_bg.png" v-if="item.choosed"></image>
			</div>
		</view>
		<view class="chat" v-if="!navList[2].choosed">
			<div v-for="(item,index) in facultyChatList" :key='index' @click="navChat(index)">
				<image :src="item.groupProfile.avatar"></image>
				<div>
					<p>
						<span>{{item.groupProfile.name}}</span>
						<span>
							<!-- <text></text> -->
							<!-- <span class="people">{{item.num}}人&nbsp;男:{{item.man}}女:{{item.female}}</span> -->
							<!-- <span class="people">{{item.groupProfile.memberNum}}人</span> -->
						</span>
					</p>
					<p>{{ item.lastMessage.fromAccount == 'administrator' ? 'administrator' + '：' + item.newMsg : item.lastMessage.fromAccountName + '：' + item.newMsg}}</p>
				</div>
				<div>
					<p>{{item.showTime}}</p>
				</div>
			</div>
		</view>
		<view class="activity" v-if="!navList[1].choosed">
			<p v-if="navList[0].choosed || actList.length">活动</p>
			<div v-for="(item,index) in actList" :key='index' @click='navAct(index)'>
				<p>
					<span>{{item.facName}}:</span>
					<span>{{item.actName}}</span>
				</p>
				<p>
					<span>
						{{item.num}}人&nbsp;男:{{item.man}}女:{{item.female}}
					</span>
					<span>
						距离结束 
						<b>{{item.day}}</b>:
						<b>{{item.hour}}</b>
					</span>
				</p>
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
				navList: [
					{
						name: '综合',
						choosed: true
					},
					{
						name: '社群',
						choosed: false
					},
					{
						name: '活动',
						choosed: false
					},
				],
				facultyChatList: [
					// {
					// 	img: '../../static/xxb.png',
					// 	name: '20届 学习部',
					// 	num: 11,
					// 	man: 6,
					// 	female: 5,
					// 	newMsg: '白白：热爱运动，热爱生活，热爱自己，热爱运动，热爱生活，热爱自己'
					// },
					// {
					// 	img: '../../static/tyb.png',
					// 	name: '20届 体育部',
					// 	num: 11,
					// 	man: 6,
					// 	female: 5,
					// 	newMsg: '白白：热爱运动，热爱生活，热爱自己，热爱运动，热爱生活，热爱自己'
					// }
				],
				actList: [
					// {
					// 	facName: '学习部',
					// 	actName: '2020第一学期最佳辩手投票',
					// 	num: 11,
					// 	man: 6,
					// 	female: 5,
					// 	day: '01',
					// 	hour: '15',
					// 	type: 'normal'
					// },
					// {
					// 	facName: '体育部',
					// 	actName: '2020第一学期最佳辩手投票2020第一学期最佳辩手投票2020第一学期最佳辩手投票2020第一学期最佳辩手投票',
					// 	num: 11,
					// 	man: 6,
					// 	female: 5,
					// 	day: '01',
					// 	hour: '15',
					// 	type: 'money'
					// },
					// {
					// 	facName: '体育部',
					// 	actName: '2020第一学期最佳辩手投票2020第一学期最佳辩手投票2020第一学期最佳辩手投票2020第一学期最佳辩手投票',
					// 	num: 11,
					// 	man: 6,
					// 	female: 5,
					// 	day: '01',
					// 	hour: '15',
					// 	type: 'money'
					// },
					// {
					// 	facName: '体育部',
					// 	actName: '2020第一学期最佳辩手投票2020第一学期最佳辩手投票2020第一学期最佳辩手投票2020第一学期最佳辩手投票',
					// 	num: 11,
					// 	man: 6,
					// 	female: 5,
					// 	day: '01',
					// 	hour: '15',
					// 	type: 'vote'
					// },
					// {
					// 	facName: '体育部',
					// 	actName: '2020第一学期最佳辩手投票2020第一学期最佳辩手投票2020第一学期最佳辩手投票2020第一学期最佳辩手投票',
					// 	num: 11,
					// 	man: 6,
					// 	female: 5,
					// 	day: '01',
					// 	hour: '15',
					// 	type: 'forum'
					// }
				],
				isReady: this.$store.state.isSDKReady
			};
		},
		onLoad() {
			that = this
		},
		onShow() {
			that.facultyChatList = this.$store.state.conversationListGroup
		},
		onPullDownRefresh() {
			// this.getConverList()
		},
		methods: {
			tabClick(e){
				if(e == 0){
					uni.pageScrollTo({
						scrollTop: 0
					})
				}else{
					switch(e){
						case 1:
							uni.redirectTo({
								url: '../interest/interest'
							})
							break;
						case 2:
							uni.redirectTo({
								url: '../addOrg/addOrg'
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
			changeNav(index){
				for(let i = 0; i < this.navList.length; i++){
					this.navList[i].choosed = false
				}
				this.navList[index].choosed = true
			},
			navChat(i){
				console.log(this.facultyChatList[i])
				this.$store.commit('createConversationActive', this.facultyChatList[i].conversationID)
				uni.navigateTo({
					url: '../chatPage/chatPage?name=' + this.facultyChatList[i].groupProfile.name + '&converId=' + this.facultyChatList[i].conversationID + '&type=group'
				})
			},
			navAct(i){
				if(this.actList[i].type != 'forum'){
					uni.navigateTo({
						url: './activityDetail/activityDetail?type=' + this.actList[i].type
					})
				}else{
					uni.navigateTo({
						url: './forumActivityDetail/forumActivityDetail'
					})
				}
			},
			changeTime(time){
				var date = new Date(time);
				var YY = date.getFullYear();
				var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				var date1=new Date();
				//年
				var year=date1.getFullYear();
				//月
				var month=date1.getMonth()+1;
				//日
				var day=date1.getDate();
				if(YY == year && MM == month && day == DD){
					return '今天'
				}
				if(YY == year && MM == month && day - DD < 2){
					return '昨天'
				}
				return YY + '-' + MM + '-' + DD;
			}
		}
	}
</script>

<style lang="less">
	.organize{
		padding-bottom: 130rpx;
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
		.chat{
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
					border-radius: 20rpx;
				}
				&>div{
					&:nth-of-type(1){
						
						width: 500rpx;
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
								font-size: 28rpx;
								color: #858585;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
					}
					&:nth-of-type(2){
						flex: 1;
						display: flex;
						justify-content: center;
						p{
							&:nth-of-type(1){
								font-size: 22rpx;
								color: #858585;
								text-align: right;
							}
							// &:nth-of-type(2){
							// 	font-size: 20rpx;
							// 	width: 36rpx;
							// 	line-height: 36rpx;
							// 	background-color: #FE4A48;
							// 	color: #fff;
							// 	text-align: center;
							// 	float: right;
							// 	margin-top: 24rpx;
							// 	border-top-left-radius: 16rpx;
							// 	border-top-right-radius: 16rpx;
							// 	border-bottom-right-radius: 16rpx;
							// 	border-bottom-left-radius: 4rpx;
							// }
						}
					}
				}
			}
		}
		.activity{
			&>p{
				margin: 20rpx;
				font-size: 28rpx;
				font-weight: 600;
				color: #333333;
			}
			&>div{
				background-color: #fff;
				padding: 30rpx 20rpx;
				border-radius: 16rpx;
				margin: 20rpx;
				p{
					display: flex;
					&:nth-of-type(1){
						span{
							font-size: 28rpx;
							color: #333;
							&:nth-of-type(1){
								font-weight: 600;
								width: 100rpx;
							}
							&:nth-of-type(2){
								flex: 1;
							}
						}
					}
					&:nth-of-type(2){
						justify-content: space-between;
						line-height: 50rpx;
						margin-top: 30rpx;
						span{
							color: #858585;
							&:nth-of-type(1){
								font-size: 24rpx;
							}
							&:nth-of-type(2){
								display: flex;
								font-size: 28rpx;
								font-weight: 600;
								b{
									width: 50rpx;
									border-radius: 10rpx;
									text-align: center;
									color: #fff;
									background: linear-gradient(to bottom right, #75E7CB, #38CDBE);
									margin: 0 10rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
