<template>
	<view class="interest" :style="{paddingTop: phoneType ? '170rpx' : '130rpx'}">
		<top-bar pageName="兴趣"></top-bar>
		<tab-bar :current="1" @click="tabClick"></tab-bar>
		<view class="nav_switch">
			<div v-for="(item,index) in navList" :key='index' @click='changeNav(index)'>
				<text :class="item.choosed ? 'active' : ''">{{item.name}}</text>
				<image src="../../static/nav_bg.png" v-if="item.choosed"></image>
			</div>
		</view>
		<div class="group_list" v-if="navList[0].choosed">
			<div v-for="(item,index) in groupList" :key='index' @click="navChat(index,'group')">
				<image :src="item.groupProfile.avatar"></image>
				<div>
					<p>
						<span>{{item.groupProfile.name}}</span>
						<span>
							剩余：{{item.lastTimeShow.day}}天{{item.lastTimeShow.hour}}小时
						</span>
					</p>
					<p>{{item.lastMessage.fromAccount + '：' + item.newMsg}}</p>
				</div>
				<div>
					<p>{{item.showTime}}</p>
					<!-- <p>{{item.num}}</p> -->
				</div>
			</div>
		</div>
		<div class="private_list" v-if="navList[1].choosed">
			<div v-for="(item,index) in personList" :key='index' @click="navChat(index,'c2c')">
				<image :src="item.img"></image>
				<div>
					<p>
						<span>{{item.name}}</span>
						<span>
							<!-- <text></text> -->
							<!-- <span class="people">{{item.faculty}}</span> -->
						</span>
					</p>
					<p>{{item.newMsg}}</p>
				</div>
				<div>
					<p>{{item.showTime}}</p>
					<p v-if="item.unReadNum">{{item.unReadNum}}</p>
				</div>
			</div>
		</div>
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
						name: '群聊',
						choosed: true
					},
					{
						name: '私聊',
						choosed: false
					},
				],
				groupList: [
					{
						img: '../../static/xxb.png',
						name: '关键词',
						num: 11,
						man: 6,
						female: 5,
						newMsg: '白白：热爱运动，热爱生活，热爱自己，热爱运动，热爱生活，热爱自己',
						time: '2020-05-20',
						faculty: '信息学院'
					},
					{
						img: '../../static/tyb.png',
						name: '足球',
						num: 11,
						man: 6,
						female: 5,
						newMsg: '白白：热爱运动，热爱生活，热爱自己，热爱运动，热爱生活，热爱自己',
						time: '今天',
						faculty: '信息学院'
					}
				],
				personList: []
			};
		},
		onLoad() {
			that = this
		},
		onShow() {
			this.personList = this.$store.state.conversationListPerosn
			this.groupList = this.$store.state.conversationListIntGroup
		},
		methods: {
			tabClick(e){
				if(e == 1){
					
				}else{
					switch(e){
						case 0:
							uni.redirectTo({
								url: '../organize/organize'
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
			navChat(i, type){
				let name
				let id
				if(type == 'c2c'){
					name = this.personList[i].name
					id = this.personList[i].converId
				}else{
					name = this.groupList[i].groupProfile.name
					id = this.groupList[i].conversationID
				}
				console.log(type)
				console.log(id)
				this.$store.commit('createConversationActive', id)
				uni.navigateTo({
					url: '../chatPage/chatPage?name=' + name + '&type=' + type + '&converId=' + id
				})
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
	.interest{
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
		.group_list, .private_list{
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
						width: 420rpx;
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
										font-size: 24rpx;
										color: #75E7CB;
										margin-left: 30rpx;
									}
									// .people{
									// 	color: #FF9B00;
									// 	font-size: 24rpx;
									// 	position: relative;
									// 	z-index: 2;
									// 	font-weight: 500;
									// }
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
						p{
							&:nth-of-type(1){
								font-size: 22rpx;
								color: #858585;
								text-align: right;
							}
							&:nth-of-type(2){
								font-size: 20rpx;
								width: 36rpx;
								line-height: 36rpx;
								background-color: #FE4A48;
								color: #fff;
								text-align: center;
								float: right;
								margin-top: 24rpx;
								border-top-left-radius: 16rpx;
								border-top-right-radius: 16rpx;
								border-bottom-right-radius: 16rpx;
								border-bottom-left-radius: 4rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
