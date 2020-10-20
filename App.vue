<script>
	export default {
		mounted() {
			/**官网有很多关于关于sdk 其他的监听方法（比如：有新的消息，用户资料更新等等）
			 * 详情可对照： https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html
			 * 监听的含义：服务端发生了数据变更---前端全局可以接收到变更通知--前端就可以自动触发某个事件来更新相应数据
			 * */
			// 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
			this.tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
			// 收到新消息
			this.tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
			// 会话列表更新
			this.tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
				console.log(event.data)
				let data = event.data
				let groupArr = []
				let groupArr1 = []
				let personArr = []
				let that = this
				
				let j = 0
				
				for(let i = 0; i < data.length; i++){
					let showTime = that.changeTime(data[i].lastMessage.lastTime * 1000)
					// let showTime = date.toLocaleDateString().replace(/\//g, "-")
					let newMsg = null
					if(data[i].lastMessage.messageForShow.indexOf('<img') != -1 && data[i].lastMessage.messageForShow.indexOf('emoji') == -1){
						newMsg = '[图片]'
					}else if(data[i].lastMessage.messageForShow.indexOf('<img') != -1 && data[i].lastMessage.messageForShow.indexOf('emoji') != -1){
						newMsg = '[表情消息]'
					}
					if(data[i].type == 'C2C'){
						let obj = {
							converId: data[i].conversationID,
							img: '../../static/xxb.png',
							name: data[i].userProfile.nick,
							unReadNum: data[i].unreadCount,
							lastTime: data[i].lastMessage.lastTime,
							newMsg: newMsg || data[i].lastMessage.messageForShow,
							showTime: showTime
						}
						personArr.push(obj)
					}
					if(data[i].type == 'GROUP'){
						console.log(data[i])
						data[i].showTime = showTime
						data[i].newMsg = newMsg || data[i].lastMessage.messageForShow
						if(data[i].lastMessage.fromAccount != 'administrator'){
							console.log(data[i])
							that.tim.getUserProfile({
								userIDList: [data[i].lastMessage.fromAccount]
							}).then((res) => {
								console.log(res)
								data[i].lastMessage.fromAccountName = res.data[0].nick
								if(data[i].groupProfile.groupID.indexOf('Org') != -1){
									groupArr.push(data[i])
								}else{
									let lastTimeShow = that.lastTime(data[i].groupProfile.createTime)
									data[i].lastTimeShow = lastTimeShow
									groupArr1.push(data[i])
								}
								
							})
						}else{
							if(data[i].groupProfile.groupID.indexOf('Org') != -1){
								groupArr.push(data[i])
							}else{
								let lastTimeShow = that.lastTime(data[i].groupProfile.createTime)
								data[i].lastTimeShow = lastTimeShow
								groupArr1.push(data[i])
							}
						}
						console.log(groupArr)
					}
				}
				that.$store.commit('updateConversationListGroup', groupArr)
				that.$store.commit('updateConversationListIntGroup', groupArr1)
				that.$store.commit('updateConversationListPerson', personArr)
				that.$store.commit("updateConversationList", event.data);
			});
			// this.tim.on(this.$TIM.EVENT.SDK_NOT_READY, () => {
			// 	if(uni.getStorageSync('userInfo')){
			// 		let timObj = JSON.parse(uni.getStorageSync('userInfo'))
			// 		let promise = this.tim.login({
			// 			userID: timObj.userId,
			// 			userSig: timObj.userSig
			// 		})
			// 		promise.then(() => {
			// 			this.$store.commit("toggleIsLogin", true);
			// 		})
			// 	}else{
			// 		uni.reLaunch({
			// 			url: 'pages/login/login'
			// 		})
			// 	}
			// })
			this.tim.off(this.$TIM.EVENT.SDK_READY, (event) => {
				console.log(1)
			})
			this.tim.off(this.$TIM.EVENT.MESSAGE_RECEIVED, (event) => {
				console.log(2)
			})
		},
		methods: {
			onReadyStateUpdate({name}) {
				const isSDKReady = name === this.$TIM.EVENT.SDK_READY ? true : false;
				//自动监听并更新 sdk 的ready 状态 （未登录是 notReady  登录后是ready）
				console.log(isSDKReady)
				this.$store.commit("toggleIsSDKReady", isSDKReady);
				this.tim.getMyProfile().then((res) => {
					this.$store.commit('updateTimUserInfo', res.data)
				}).catch(() => {
					uni.redirectTo({
						url: 'pages/login/login'
					})
				})
				this.tim.getGroupList({
					groupProfileFilter: [this.$TIM.TYPES.GRP_PROFILE_CREATE_TIME]
				})
		        //sdk ready 后  肯定完成了登录操作    这里可以获取用户存储在im的基础信息/离线消息/黑名单列表
			},
			
			onReceiveMessage({data: messageList}) {
				// this.handleAt(messageList);
				console.log(messageList)
				this.$store.commit("pushCurrentMessageList", messageList);
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
			},
			lastTime(time){
				let now = new Date().getTime()
				let createTime = time * 1000
				let midNum = now - createTime
				let hourMs = 1000 * 60 * 60
				let allHour = Math.floor(midNum / hourMs)
				let sevenHour = 24 * 7
				let day = 6 - Math.floor(allHour / 24)
				let hour = 24 - allHour % 24
				console.log(allHour)
				console.log(allHour / 24)
				console.log(day)
				console.log(hour)
				if(hour == 24){
					hour = 23
				}
				if(day == 7){
					day = 6
				}
				let lastTime = {
					day: day,
					hour: hour
				}
				return lastTime
			},
			getUserPro(id){
				return this.tim.getUserProfile({
					userIDList: [id]
				})
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			this.$store.commit('changePhoneType', {phoneType: plus.navigator.hasNotchInScreen()})
			// this.tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
			// // 收到新消息
			// this.tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
			// // 会话列表更新
			// this.tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
			// 	this.$store.commit("updateConversationList", event.data);
			// });
		},
		onShow: function() {
			console.log('App Show')
			let that = this
			setInterval(() => {
				if(this.$store.state.TimUserId != ''){
					this.$http.get(this.api.getFriendApply).then((res) => {
						console.log(res)
						that.$store.commit('updateApplyNotice', res.data)
					})
				}
			}, 10000)
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	@import url("~@/static/iconfont/iconfont.css");
	 @font-face {
		font-family: 'PingFang';
		src: url('~@/static/font/PingFang.ttf');
	 }
	 *{
		 font-family: 'PingFang';
	 }
	 page{
		 background-color: #f7f7f7;
	 }
	.title_side{
		 position: relative;
		 text-align: center;
		 &::after, &::before{
			 content: '';
			 position: absolute;
			 height: 3rpx;
			 width: 60rpx;
			 top: 50%;
			 margin-top: -1rpx;
			 background-color: #333333;
		 }
	}
	ul{
		list-style: none;
		padding: 0;
	}
</style>
