<template>
	<view class="department_info">
		<div class="person_info">
			<div v-for="(item,index) in personList" :key='index' @click="addFriend(index)">
				<image :src="item.avatar"></image>
				<p>{{item.nick}}</p>
			</div>
		</div>
		<div class="chat_info">
			<p>
				<span>部门昵称</span>
				<span>{{partInfo.name}}</span>
			</p>
			<!-- <p>
				<span>所属学院/分院</span>
				<span>{{partInfo.facName}}</span>
			</p> -->
			<p>
				<span>人数</span>
				<span>{{partInfo.memberNum}}</span>
			</p>
			<p>
				<span>群二维码</span>
				<span></span>
			</p>
		</div>
		<!-- <div class="quit">
			<p v-if="quitStatus">退出</p>
			<p v-else>解散群聊</p>
		</div> -->
	</view>
</template>

<script>
	
	var that = null
	
	export default {
		data() {
			return {
				personList: [],
				quitStatus: true,
				partInfo: {
					partName: '20届 学习部',
					facName: '金华职业技术学院/建筑学院',
					num: 20,
					prop: '10:10'
				},
				groupId: null
			};
		},
		onLoad(e) {
			console.log(e.groupId)
			that = this
			this.groupId = e.groupId
			this.getGroupInfo()
		},
		methods: {
			getGroupInfo(){
				this.tim.getGroupProfile({
					groupID: this.groupId
				}).then((res) => {
					console.log(res)
					this.partInfo = res.data.group
					let hundredNum = Math.floor(res.data.group.memberNum / 100)
					console.log(hundredNum)
					for(let i = 0; i <= hundredNum; i++){
						this.tim.getGroupMemberList({
							groupID: this.groupId,
							count: 100,
							offset: hundredNum*100,
						}).then((e) => {
							if(i == 0){
								that.personList = e.data.memberList
							}else{
								that.personList = that.personList.concat(e.data.memberList)
							}
							console.log(that.personList)
						})
					}
				})
			},
			addFriend(i){
				uni.navigateTo({
					url: '../../addressBook/friendDetail/friendDetail?userId=' + this.personList[i].userID + '&name=' + this.personList[i].nick
				})
			}
		}
	}
</script>

<style lang="less">
	.department_info{
		.person_info{
			background-color: #fff;
			padding: 20rpx;
			overflow: hidden;
			border-top: 1rpx solid #f8f8f8;
			div{
				float: left;
				width: 100rpx;
				margin: 26rpx;
				margin-top: 0;
				&:nth-of-type(5n+1){
					margin-left: 0;
				}
				&:nth-of-type(5n){
					margin-right: 0;
				}
				image{
					width: 100rpx;
					height: 100rpx;
					border-radius: 100rpx;
					background-color: #f7f7f7;
				}
				p{
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					word-break: break;
					font-size: 28rpx;
					color: #858585;
				}
			}
		}
		.chat_info{
			margin: 30rpx 0 120rpx 0;
			background-color: #fff;
			p{
				border-bottom: 1rpx solid #f8f8f8;
				display: flex;
				justify-content: space-between;
				line-height: 100rpx;
				font-size: 28rpx;
				color: #333;
				padding: 0 20rpx;
				span{
					&:nth-of-type(2){
						color: #858585;
					}
				}
			}
		}
		.quit{
			position: fixed;
			bottom: 0;
			width: 100%;
			font-size: 28rpx;
			color: #15C1B3;
			text-align: center;
			background-color: #fff;
			border-top: 1rpx solid #d2d2d2;
			line-height: 100rpx;
		}
	}
</style>
