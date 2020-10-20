<template>
	<view class="activity_detail">
		<div class="act_info">
			<p>{{info.title}}</p>
			<p class="title_side" v-if="!info.time">活动已结束</p>
			<p class="title_side" v-else>距离本次活动结束时间</p>
			<p v-if="info.time">
				<span>{{info.time.day}}</span>天
				<span>{{info.time.hour}}</span>小时
			</p>
		</div>
		<div class="people_info" v-if="type != 'normal'">
			<ul>
				<li v-for="(item,index) in numList" :key='index'>
					<p>{{item.value}}</p>
					<p>{{item.label}}</p>
				</li>
			</ul>
			<p>男女比例：{{info.prop}}</p>
			<p>
				<span>发起部门：</span>
				<span>{{info.partName}}</span>
			</p>
		</div>
		<div class="money_act" v-if="type == 'money'">
			<div class="store_info">
				<image :src="storeInfo.img"></image>
				<div>
					<p>{{storeInfo.name}}</p>
					<p>服务：{{storeInfo.label}}</p>
					<p>电话：{{storeInfo.phone}}</p>
					<p>地址：{{storeInfo.address}}</p>
				</div>
			</div>
		</div>
		<div class="rule_info" v-if="type != 'vote'">
			<p class="title_side content">活动内容</p>
			<p>{{info.content}}</p>
			<p class="title_side rule">活动规则说明</p>
			<p>{{info.rule}}</p>
		</div>
		<div class='set_in' v-if="type == 'money'">
			<p>
				报名费：<span>{{info.money}}元</span>
			</p>
			<p>
				立即报名
			</p>
		</div>
		<div class="vote_info" v-if="type == 'vote'">
			<p>投票排名情况</p>
			<div v-for="(item,index) in voteList" :key='index'>
				<div>{{index+1}}</div>
				<div>
					<image :src="item.img"></image>
					<div>
						<div>
							<p>{{item.name}}</p>
							<p>
								{{item.voteNum}}票
								<text class="iconfont icon-shoucang-fill" :style="{color: item.voted ? '#15C1B3' : '#BFC2CC'}" @click="voteMine(index)"></text>
							</p>
						</div>
						<p>{{item.intr}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="sign_up" @click="showSign" v-if="type == 'normal'">
			立即报名
		</div>
		<div class="sign_info" v-if="statusSign">
			<div class="sign_content">
				<text class="iconfont icon-quxiao" @click="hideSign"></text>
				<p>信息填写</p>
				<p>
					<input type="text" placeholder="请输入姓名" />
				</p>
				<p>
					<input type="number" placeholder="请输入手机号" />
				</p>
				<p>
					<span>性别</span>
					<radio-group>
						<label>
							<radio /><text>男</text>
						</label>
						<label>
							<radio /><text>女</text>
						</label>
					</radio-group>
				</p>
				<p>
					<span @click="hideSign">取消</span>
					<span>确认</span>
				</p>
			</div>
		</div>
	</view>
</template>

<script>
	
	var that = null
	
	export default {
		data() {
			return {
				type: 'normal',
				statusSign: false,
				info: {
					name: '2020第一学期最佳辩手投票',
					time: {
						day: 234,
						hour: 40
					},
					prop: '10:10',
					partName: '学习部',
					content: '活动呢欧容活动呢欧容活动呢欧容活动呢欧容活动呢欧容活动呢欧容活动呢欧容活动呢欧容活动呢欧容活动呢欧容活动呢欧容',
					rule: '活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则',
					money: '20'
				},
				numList: [
					{
						label: '浏览数量',
						value: 2222
					},
					{
						label: '活动人数',
						value: 20
					},
					{
						label: '已报名',
						value: 10
					}
				],
				storeInfo: {
					img: '',
					name: '商家商家',
					label: '餐饮',
					phone: '13333333333',
					address: '少时诵诗书生生世世少时诵诗书生生世世少时诵诗书生生世世'
				},
				voteList: [
					{
						img: '',
						name: '小白',
						intr: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
						voteNum: 100,
						voted: true
					},
					{
						img: '',
						name: '小白',
						intr: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
						voteNum: 100,
						voted: false
					},
					{
						img: '',
						name: '小白',
						intr: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
						voteNum: 100,
						voted: false
					},
					{
						img: '',
						name: '小白',
						intr: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
						voteNum: 100,
						voted: false
					},
					{
						img: '',
						name: '小白',
						intr: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
						voteNum: 100,
						voted: false
					}
				],
				activityId: ''
			};
		},
		onLoad(e) {
			that = this
			this.type = e.type
			this.activityId = e.id
			// if(this.type == 'vote'){
			// 	this.getVotePartList()
			// }
			this.getActivityDetail()
		},
		methods:{
			voteMine(i){
				if(this.voteList[i].voted){
					this.voteList[i].voted = false
				}else{
					this.voteList[i].voted = true
				}
			},
			showSign(){
				this.statusSign = true
			},
			hideSign(){
				this.statusSign = false
			},
			getVotePartList(){
				// this.$http.get(this.api.getVotePartList+this.activityId).then((res) => {
				// 	console.log(res)
				// 	that.voteList = res.data
				// })
			},
			getActivityDetail(){
				this.$http.get(`${this.api.getActDetail}${this.activityId}`).then((res) => {
					console.log(res)
					res.time = this.getTimeDay(res.date_end)
					this.info = res
				})
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
				if(day < 10){
					day = '0' + String(day)
				}
				if(lastHour < 10){
					lastHour = '0' + String(lastHour)
				}
				return {
					day: day,
					hour: lastHour
				}
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #fff;
	}
	.activity_detail{
		.act_info{
			text-align: center;
			p{
				&:nth-of-type(1){
					font-size: 36rpx;
					color: #333;
					font-weight: 600;
					margin-top: 50rpx;
				}
				&:nth-of-type(3){
					color: #15C1B3;
					display: flex;
					justify-content: center;
					margin: 16rpx 0;
					span{
						width: 50rpx;
						height: 50rpx;
						margin: 0 8rpx;
						background-color: #15C1B3;
						color: #fff;
						font-weight: 600;
						font-size: 28rpx;
						line-height: 50rpx;
					}
				}
			}
			.title_side{
				font-size: 28rpx;
				color: #333;
				margin-top: 30rpx;
				&::after{
					right: 170rpx;
				}
				&::before{
					left: 170rpx;
				}
			}
		}
		.people_info{
			background-color: #f8f8f8;
			margin: 20rpx;
			border-radius: 20rpx;
			padding: 20rpx;
			text-align: center;
			ul{
				display: flex;
				font-size: 28rpx;
				li{
					flex: 1;
					p{
						line-height: 40rpx;
						color: #858585;
						&:nth-of-type(1){
							color: #15C1B3;
						}
					}
				}
			}
			&>p{
				&:nth-of-type(1){
					line-height: 70rpx;
					font-size: 28rpx;
					color: #fff;
					background-color: #15C1B3;
					margin: 30rpx 60rpx;
					border-radius: 35rpx;
				}
				&:nth-of-type(2){
					display: flex;
					justify-content: center;
					font-size: 24rpx;
					span{
						&:nth-of-type(1){
							color: #858585;
						}
						&:nth-of-type(2){
							color: #15C1B3;
						}
					}
				}
			}
		}
		.money_act{
			padding: 20rpx;
			.store_info{
				display: flex;
				background-color: #f8f8f8;
				padding: 28rpx;
				border-radius: 20rpx;
				&>image{
					width: 160rpx;
					height: 160rpx;
					background-color: #fff;
					margin-right: 30rpx;
					border-radius: 10rpx;
				}
				div{
					flex: 1;
					p{
						width: 470rpx;
						font-size: 24rpx;
						line-height: 40rpx;
						color: #858585;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						word-break: break-all;
						&:nth-of-type(1){
							font-weight: 600;
							font-size: 28rpx;
							color: #333333;
							margin-top: 10rpx;
						}
					}
				}
			}
		}
		.rule_info{
			background-color: #f8f8f8;
			padding: 28rpx;
			text-align: left;
			margin: 20rpx;
			border-radius: 20rpx;
			p{
				font-size: 28rpx;
				color: #999;
				&:nth-of-type(3),&:nth-of-type(1){
					margin: 20rpx 0;
					color: #333;
				}
			}
			.content{
				&::after{
					right: 200rpx;
				}
				&::before{
					left: 200rpx;
				}
			}
			.rule{
				&::after{
					right: 180rpx;
				}
				&::before{
					left: 180rpx;
				}
			}
		}
		.set_in{
			position: fixed;
			bottom: 0;
			width: 100%;
			border-top: 1rpx solid #f8f8f8;
			display: flex;
			line-height: 100rpx;
			font-size: 28rpx;
			background-color: #fff;
			z-index: 10;
			p{
				&:nth-of-type(1){
					color: #858585;
					margin-left: 20rpx;
					flex: 1;
					span{
						color: #FFAB2A;
					}
				}
				&:nth-of-type(2){
					background: linear-gradient(to right, #75E7CB, #21C6B6);
					color: #fff;
					text-align: center;
					width: 300rpx;
					font-weight: 600;
				}
			}
		}
		.vote_info{
			margin-top: 20rpx;
			border-top: 20rpx solid #f8f8f8;
			padding: 20rpx;
			&>p{
				font-size: 28rpx;
				color: #858585;
				line-height: 50rpx;
				text-align: center;
			}
			&>div{
				display: flex;
				margin-top: 20rpx;
				&>div{
					&:nth-of-type(1){
						width: 30rpx;
						color: #858585;
						font-size: 24rpx;
						line-height: 50rpx;
					}
					&:nth-of-type(2){
						flex: 1;
						display: flex;
						&>image{
							width: 80rpx;
							height: 80rpx;
							border-radius: 80rpx;
							background-color: #f6f6f6;
							margin-right: 20rpx;
						}
						&>div{
							flex: 1;
							&>div{
								display: flex;
								justify-content: space-between;
								p{
									font-weight: 600;
									line-height: 50rpx;
									&:nth-of-type(1){
										font-size: 28rpx;
									}
									&:nth-of-type(2){
										font-size: 32rpx;
										color: #15C1B3;
										margin-right: 10rpx;
										text{
											margin-left: 20rpx;
											font-size: 38rpx;
										}
									}
								}
							}
							&>p{
								font-size: 24rpx;
								color: #858585;
							}
						}
					}
				}
			}
		}
		.sign_up{
			position: fixed;
			bottom: 0;
			width: 100%;
			text-align: center;
			background: linear-gradient(to right, #75E7CB, #21C6B6);
			color: #fff;
			font-size: 28rpx;
			line-height: 100rpx;
			z-index: 5;
		}
		.sign_info{
			position: fixed;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.5);
			top: 0;
			z-index: 10;
			.sign_content{
				position: absolute;
				bottom: -40rpx;
				width: 100%;
				background-color: #fff;
				border-radius: 20rpx;
				padding: 40rpx 0;
				&>text{
					position: absolute;
					top: 20rpx;
					right: 20rpx;
					color: #BFC2CC;
				}
				p{
					display: flex;
					justify-content: space-between;
					&:nth-of-type(1){
						font-size: 28rpx;
						color: #333;
						line-height: 50rpx;
						justify-content: center;
						font-weight: 600;
					}
					&:nth-last-of-type(2),&:nth-last-of-type(3),&:nth-last-of-type(4){
						margin: 40rpx 70rpx;
						background-color: #f8f8f8;
						height: 100rpx;
						border-radius: 50rpx;
						font-size: 28rpx;
						line-height: 100rpx;
						padding: 0 30rpx;
						input{
							flex: 1;
							font-size: 28rpx;
							color: #666;
							line-height: 100rpx;
							height: 100rpx;
						}
						uni-radio-group{
							label{
								margin-left: 20rpx;
							}
							radio{
								transform: scale(0.7);
							}
						}
					}
					&:nth-of-type(5){
						text-align: center;
						font-size: 28rpx;
						line-height: 90rpx;
						span{
							flex: 1;
							&:nth-of-type(1){
								color: #101010;
								background-color: #F8F8F8;
							}
							&:nth-of-type(2){
								background: linear-gradient(to right, #75E7CB, #21C6B6);
								color: #fff;
								font-weight: 600;
							}
						}
					}
				}
			}
		}
	}
</style>
