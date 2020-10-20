<template>
	<view class="history_act">
		<div class="nav_choose">
			<view class="nav_switch">
				<div v-for="(item,index) in navList" :key='index' @click='changeNav(index)'>
					<text :class="item.choosed ? 'active' : ''">{{item.name}}</text>
					<image src="../../../static/nav_bg.png" v-if="item.choosed"></image>
				</div>
			</view>
			<view class="manager" @click="managerAct">
				{{removeShow ? '完成' : '管理'}}
			</view>
		</div>
		<view class="activity">
			<!-- <p v-if="navList[0].choosed">活动</p> -->
			<div v-for="(item,index) in actList" :key='index' @click='navAct(index)'>
				<text class="iconfont icon-jianshao-filled" @click.stop="removeAct(index)" v-if="removeShow"></text>
				<p>
					<span>{{item.deptName || ''}}:</span>
					<span>{{item.title}}</span>
				</p>
				<p>
					<span>
						<!-- {{item.num}}人&nbsp;男:{{item.man}}女:{{item.female}} -->
					</span>
					<span v-if="item.day != null">
						距离结束 
						<b>{{item.day}}</b>天
						<b>{{item.hour}}</b>小时
					</span>
					<span v-else>
						已结束
					</span>
				</p>
			</div>
		</view>
		<div class="submit" @click="openPop">发布活动</div>
		<uni-popup type="bottom" ref="popUp">
			<view class="content">
				<p>选择活动类型</p>
				<text class="iconfont icon-quxiao" @click="closePopup"></text>
				<picker-view  :value="value"  @change="bindChange">
					<picker-view-column>
						<view v-for="(item,index) in actTypeList" :key='index'>
							{{item}}
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-popup>
		<uni-popup ref="popUp1" type="dialog">
		    <uni-popup-dialog type="info" title="提示" :content="popInfo.content" @confirm="navTo"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popUp2" type="dialog">
		    <uni-popup-dialog type="info" title="提示" content="确认删除本条活动吗？" @confirm="confirmRemove"></uni-popup-dialog>
		</uni-popup>
		<uni-load-more :status="loadMoreStatus"></uni-load-more>
	</view>
</template>

<script>
	
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	
	var that = null
	
	export default {
		data() {
			return {
				navList: [
					{
						name: '投票',
						choosed: true,
						pageNum: 1
					},
					{
						name: '报名',
						choosed: false,
						pageNum: 1
					},
					{
						name: '论坛',
						choosed: false,
						pageNum: 1
					},
					{
						name: '付费',
						choosed: false,
						pageNum: 1
					},
				],
				actList: [],
				removeShow: false,
				actTypeList: ['请选择活动类型','参与型活动','组织型活动'],
				popInfo: {
					content: '',
					type: 0
				},
				value: [0],
				loadMoreStatus: 'loading',
				count: 0,
				choosedType: 1,
				choosedIndex: null
			};
		},
		components: {
			uniPopupDialog
		},
		onLoad() {
			that = this
			this.getActList(1, 1)
		},
		onReachBottom() {
			if(this.count > this.actList.length){
				this.getActList(this.navList[this.choosedType].pageNum + 1, this.choosedType)
			}
		},
		methods: {
			changeNav(index){
				for(let i = 0; i < this.navList.length; i++){
					this.navList[i].choosed = false
					this.navList[i].pageNum = 1
				}
				this.getActList(1, index + 1)
				this.choosedType = index + 1
				this.navList[index].choosed = true
			},
			managerAct(){
				this.removeShow = !this.removeShow
			},
			bindChange(e){
				if(e.detail.value[0] == 0){
					return
				}
				if(e.detail.value[0] == 1){
					this.popInfo.content = '确认选择参与型活动？'
					this.popInfo.type = 1
				}else{
					this.popInfo.type = 2
					this.popInfo.content = '确认选择组织型活动？'
				}
				this.$refs.popUp1.open()
			},
			openPop(){
				this.$refs.popUp.open()
			},
			closePopup(){
				this.$refs.popUp.close()
			},
			navTo(){
				if(this.popInfo.type == 1){
					uni.navigateTo({
						url: '../joinTypeAct/joinTypeAct'
					})
				}else{
					uni.navigateTo({
						url: '../organizationalAct/organizationalAct'
					})
				}
				this.$refs.popUp.close()
				this.$refs.popUp1.close()
			},
			getActList(page, type){
				this.$http.get(this.api.getHistoryAct, {
					params: {
						page: page,
						pageSize: 15,
						typeId: type
					}
				}).then((res) => {
					// for(let i = 0; i < res.data.length; i++){
					// 	res.data[i].type = 'vote'
					// }\
					console.log(res)
					that.count = res.count
					for(let i = 0; i < res.data.length; i++){
						let time = that.getTimeDay(res.data[i].date_end)
						if(time){
							res.data[i].day = time.day
							res.data[i].hour = time.hour
						}else{
							res.data[i].day = null
						}
						switch(res.data[i].type_id){
							case 1:
								res.data[i].type = 'vote'
								break;
							case 2:
								res.data[i].type = 'normal'
								break;
							case 3:
								res.data[i].type = 'forum'
								break;
							case 4:
								res.data[i].type = 'money'
								break;
						}
					}
					if(page == 1){
						that.actList = res.data
					}else{
						that.actList = that.actList.concat(res.data)
					}
					if(that.actList.length == res.count){
						that.loadMoreStatus = 'noMore'
					}else{
						that.loadMoreStatus = 'more'
					}
				})
			},
			navAct(i){
				if(this.actList[i].type != 'forum'){
					uni.navigateTo({
						url: '../../organize/activityDetail/activityDetail?type=' + this.actList[i].type + '&id=' + this.actList[i].id
					})
				}else{
					uni.navigateTo({
						url: '/pages/forumActivityDetail/forumActivityDetail'
					})
				}
			},
			getTimeDay(time){
				let time1 = new Date().getTime()
				let time2 = Date.parse(new Date(time))
				if(time2 < time1){
					return false
				}
				let timeAll = time2 - time1
				let daySec = 1000 * 60 * 60
				let hour = Math.floor(timeAll / daySec)
				let day = Math.floor(hour / 24)
				let lastHour = hour % 24
				return {
					day: day,
					hour: lastHour
				}
			},
			removeAct(index){
				this.choosedIndex = index
				this.$refs.popUp2.open()
			},
			confirmRemove(){
				this.$http.post(this.api.removeHistoryAct, {
					Id: this.actList[this.choosedIndex].id
				}).then((res) => {
					this.actList.splice(this.choosedIndex, 1)
					uni.showToast({
						icon: 'none',
						title: '已删除'
					})
					this.$refs.popUp2.close()
				})
			}
		}
	}
</script>

<style lang="less">
	.history_act{
		padding-bottom: 120rpx;
		.nav_choose{
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			padding: 24rpx 34rpx;
			.nav_switch{
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
			.manager{
				font-size: 28rpx;
				color: #858585;
				line-height: 50rpx;
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
				position: relative;
				background-color: #fff;
				padding: 30rpx 20rpx;
				border-radius: 16rpx;
				margin: 20rpx;
				&>text{
					position: absolute;
					right: 10rpx;
					top: 10rpx;
					color: #FF815B;
				}
				p{
					display: flex;
					&:nth-of-type(1){
						padding-right: 40rpx;
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
		.submit{
			position: fixed;
			bottom: 0;
			width: 100%;
			text-align: center;
			font-size: 30rpx;
			background: linear-gradient(to right, #7DEBD0, #20C5B5);
			color: #fff;
			line-height: 100rpx;
		}
		.uni-popup{
			text-align: center;
			.content{
				background: #fff!important;
				border-top-left-radius: 30rpx;
				border-top-right-radius: 30rpx;
				overflow: hidden;
				position: relative;
				p{
					background: #fff;
					font-size: 30rpx;
					font-weight: 600;
					margin-top: 50rpx;
				}
				&>text{
					position: absolute;
					top: 20rpx;
					right: 30rpx;
					color: #858585;
				}
				uni-picker-view{
					height: 400rpx;
					uni-picker-view-column{
						font-size: 28rpx;
						line-height: 70rpx;
					}
				}
			}
		}
	}
</style>
