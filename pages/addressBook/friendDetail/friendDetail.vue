<template>
	<view class="friend_detail">
		<div class="name_img">
			<image :src="info.avatar"></image>
			<text>{{info.name}}</text>
		</div>
		<div class="info_list">
			<p>
				<span>
					<image src="../../../static/faculty.png"></image>
					<text>学院/分院</text>
				</span>
				<span>
					{{info.category_name + '/' + info.sub_category_name}}
				</span>
			</p>
			<p>
				<span>
					<image src="../../../static/class.png"></image>
					<text>班级</text>
				</span>
				<span>
					{{info.class_name}}
				</span>
			</p>
			<p>
				<span>
					<image src="../../../static/bedroom.png"></image>
					<text>寝室</text>
				</span>
				<span>
					{{info.dorm_name}}
				</span>
			</p>
			<p>
				<span>
					<image src="../../../static/graduation.png"></image>
					<text>毕业地</text>
				</span>
				<span>
					{{info.province + '-' + info.city + '-' + info.country}}
				</span>
			</p>
			<!-- <p>
				<span>
					<image src="../../../static/societies.png"></image>
					<text>社团</text>
				</span>
				<span>
					{{info.societies}}
				</span>
			</p> -->
			<!-- <p>
				<span>
					<text class="iconfont icon-shanchu"></text>
					清空聊天记录
				</span>
				<span>
					<text class="iconfont icon-rightarrow"></text>
				</span>
			</p> -->
		</div>
		<div class="operating" v-if="info.both_way && !isSelf">
			<p @click="createNewMsg">发消息</p>
			<p>删除</p>
		</div>
		<div class="operating" v-if="!info.both_way && !isSelf">
			<p @click="addNewFriend">添加好友</p>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					avatar: '',
					name: '',
					category_name: '',
					sub_category_name: '',
					class_name: '',
					dorm_name: '202',
					province: '',
					city: '',
					country: '',
					// societies: '话剧社',
				},
				userId: '',
				isSelf: false
			};
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: e.name
			})
			console.log(e.userId)
			this.userId = e.userId
			this.getUserInfo()
			if(this.$store.state.TimUserId == e.userId){
				this.isSelf = true
			}
		},
		methods: {
			getUserInfo(){
				this.$http.get(`${this.api.userInfo}/${this.userId}`).then((res) => {
					console.log(res)
					this.info = res
					console.log(this.info)
				})
			},
			addNewFriend(){
				this.$http.post(this.api.applyAddFriend, {
					FromUserAccountId: this.userId,
					Status: '0'
				}).then((res) => {
					if(res == 200){
						uni.showToast({
							title: '已向对方申请',
							icon:'none'
						})
						// this.getUserInfo()
					}
				})
			},
			createNewMsg(){
				let id = 'C2C' + this.userId
				this.$store.commit('createConversationActive', id)
				uni.navigateTo({
					url: '../../chatPage/chatPage?name=' + this.info.name + '&type=c2c' + '&converId=' + id
				})
			}
		}
	}
</script>

<style lang="less">
	.friend_detail{
		.name_img{
			display: flex;
			padding: 20rpx;
			font-size: 32rpx;
			color: #333;
			background-color: #fff;
			line-height: 100rpx;
			image{
				width: 100rpx;
				height: 100rpx;
				margin-right: 20rpx;
				border-radius: 75rpx;
				background-color: #f8f8f8;
			}
		}
		.info_list{
			margin: 20rpx 0;
			p{
				display: flex;
				padding: 20rpx;
				background-color: #fff;
				border-bottom: 1rpx solid #f8f8f8;
				span{
					flex: 1;
					display: flex;
					&:nth-of-type(1){
						color: #333;
						font-size: 28rpx;
						// line-height: 36rpx;
						text{
							margin-right: 20rpx;
							font-size: 28rpx;
							color: #333;
						}
						image{
							width: 32rpx;
							height: 32rpx;
							margin-right: 20rpx;
							margin-top: 4rpx;
						}
					}
					&:nth-of-type(2){
						color: #858585;
						font-size: 28rpx;
						justify-content: flex-end;
					}
				}
				&:last-of-type{
					margin-top: 20rpx;
					line-height: 40rpx;
					border: none;
				}
			}
		}
		.operating{
			margin: 20rpx 0;
			background-color: #fff;
			text-align: center;
			font-size: 28rpx;
			color: #15C1B3;
			line-height: 100rpx;
			p{
				border-bottom: 1rpx solid #f8f8f8;
				&:last-of-type{
					border: none;
				}
			}
		}
	}
</style>
