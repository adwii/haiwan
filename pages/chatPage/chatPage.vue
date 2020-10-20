<template>
	<view class="chat_page" :style="{height: style.contentViewHeight + 'px'}">
		<scroll-view scroll-y="true" id="scrollview" class="chat-window" :style="{height: style.contentViewHeight + 'px'}" @click="" :scroll-with-animation="true" :scroll-top="scrollTop" @scrolltoupper="loadHistory">
			<view class="load_history" v-if="loadMoreHistory">
				<image src="../../static/loading.gif" v-if="!isCompleted"></image>
				<p v-else>没有更多历史消息</p>
			</view>
			<view class="chat_list">
				<div v-for="(item,index) in chatList" :key='index' class='m-item' v-if="(item.payload.text)">
					<div class="others" v-if="item.flow == 'in'">
						<image :src="item.avatar" @click="navTo(index)"></image>
						<div>
							<span>{{item.nick || item.from}}</span>
							<rich-text :nodes="item.payload.text"></rich-text>
						</div>
					</div>
					<div class="mine" v-else>
						<div>
							<span>{{item.nick}}</span>
							<rich-text :nodes="item.payload.text"></rich-text>
						</div>
						<image :src="item.avatar" @click="navTo(index)"></image>
					</div>
				</div>
			</view>
		</scroll-view>
		<div class="chat_input">
			<div>
				<image src="../../static/emoji.png" @click="emojiHidden"></image>
				<text class="iconfont icon-jia-circle" @click="showMore"></text>
				<textarea v-model="message" :focus="msgFocus" :show-confirm-bar="false" @focus="inputMess" auto-height="true"  @linechange="textareaLineChange"/>
				<button type="primary" @click="sendMsg()">发送</button>
			</div>
			<div v-if="moreOpera">
				<div v-for="(item,index) in moreOperaList" :key='index' @click='moreOperaThing(index)'>
					<p>
						<text :class="'iconfont ' + item.class"></text>
					</p>
					<p>{{item.label}}</p>
				</div>
			</div>
			<div v-if="emojiShow">
				<scroll-view scroll-y="true">
					<view v-for="(item,index) in emojiList" :key='index' @click="chooseEmoji(index)">
						<image :src="'../../static/emoji/' + item.url"></image>
					</view>
				</scroll-view>
			</div>
		</div>
	</view>
</template>

<script>
	
	import commen from '../../common/emoji.js'
	import {mapState} from "vuex";
	var that = null
	
	export default {
		data() {
			return {
				chatList: [],
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				scrollTop: 0,
				beforeLineNum: 1,
				moreOpera: false,
				TIM: null,
				message: '',
				toUser: '',
				emojiList: [],
				emojiShow: false,
				moreOperaList: [
					{
						class: 'icon-tupian',
						label: '照片'
					},
					{
						class: 'icon-tupian',
						label: '照片'
					},
					{
						class: 'icon-tupian',
						label: '照片'
					},
					{
						class: 'icon-tupian',
						label: '照片'
					},
					{
						class: 'icon-tupian',
						label: '照片'
					},
					{
						class: 'icon-tupian',
						label: '照片'
					}
				],
				showMoreHis: false,
				isCompleted: true,
				nextReqMessageID: '',
				loadMoreHistory: false,
				msgFocus: false,
				converType: null,
				converChangeType: null
			};
		},
		mounted() {
			const res = uni.getSystemInfoSync();   //获取手机可使用窗口高度     api为获取系统信息同步接口
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100) - uni.upx2px(20); //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 
			this.scrollToBottom();
		},
		computed:{
			...mapState({
				currentMessageList:state=>state.currentMessageList,
			})
		},
		watch:{
			currentMessageList(newVal,oldVal){
				console.log(this.$store.state.currentMessageList)
				console.log(oldVal)
				this.chatList = newVal
				// this.screenMsg(newVal,oldVal)
				// this.scrollTop = 1000
			},
			moreOpera(e){
				if(e){
					this.style.contentViewHeight -= uni.upx2px(500)
					this.scrollTop += uni.upx2px(500)
				}else{
					this.style.contentViewHeight += uni.upx2px(500)
					this.scrollTop -= uni.upx2px(500)
				}
			},
			emojiShow(e){
				if(e){
					this.style.contentViewHeight -= uni.upx2px(500)
					this.scrollTop += uni.upx2px(500)
				}else{
					this.style.contentViewHeight += uni.upx2px(500)
					this.scrollTop -= uni.upx2px(500)
				}
			}
		},
		onLoad(e) {
			that = this
			uni.setNavigationBarTitle({
			    title: e.name
			});
			this.TIM = this.$TIM
			this.converChangeType = e.type
			console.log(e.converId)
			if(e.type == 'c2c'){
				this.toUserId = this.$store.state.conversationActive.conversationID.substr(3)
				// this.$store.commit('createConversationActive', e.converId)
				this.getMsgList(e.converId, e.type)
				this.converType = this.TIM.TYPES.CONV_C2C
			}else{
				// this.toUserId = this.$store.state.conversationActive.conversationID
				this.getMsgList(e.converId, e.type)
				this.toUserId = this.$store.state.conversationActive.conversationID.substr(5)
				this.converType = this.TIM.TYPES.CONV_GROUP
			}
			this.emojiList = commen.emojiList
			this.tim.getMyProfile().then((res) => {
				console.log(res)
			})
		},
		onShow() {
			
		},
		onNavigationBarButtonTap(e) {
			if(this.converChangeType == 'group'){
				uni.navigateTo({
					url: './departmentInfo/departmentInfo?groupId=' + this.toUserId
				})
			}
		},
		methods: {
			scrollToBottom: function () {
				let that = this;
				let query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec((res) => {
					that.style.mitemHeight = 0;
					res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height + 40)   //获取所有内部子元素的高度
	　　　　　　　　　　 // 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这红字
	　　　　　　　　　　 setTimeout(() => {
	
					　　if (that.style.mitemHeight > (that.style.contentViewHeight - 100)) {   //判断子元素高度是否大于显示高度
						　　that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight    //用子元素的高度减去显示的高度就获益获得序言滚动的高度
					　　}
	　　　　　　　　　}, 100)
	　　　　　　　})
			},
			textareaLineChange(e){
				// console.log(e)
				if(e.detail.lineCount > this.beforeLineNum && e.detail.lineCount <= 4){
					this.style.contentViewHeight -= uni.upx2px(30)
					this.scrollTop += uni.upx2px(30)
				}
				if(e.detail.lineCount < this.beforeLineNum){
					this.style.contentViewHeight += uni.upx2px(30)
					this.scrollTop -= uni.upx2px(30)
				}
				this.beforeLineNum = e.detail.lineCount <= 4 ? e.detail.lineCount : 4
			},
			showMore(){
				this.moreOpera = true
				this.emojiShow = false
				// if(this.moreOpera){
				// 	this.style.contentViewHeight -= uni.upx2px(500)
				// 	this.scrollTop += uni.upx2px(500)
				// }else{
				// 	this.style.contentViewHeight += uni.upx2px(500)
				// 	this.scrollTop -= uni.upx2px(500)
				// }
			},
			sendMsg(msg){
				let message = msg ? msg : this.replaceEmoji(this.message)
				this.emojiShow = false
				this.moreOpera = false
				console.log(this.toUserId)
				console.log(this.$store.state.currentMessageList)
				this.tim.getMyProfile()
				if(!message.trim().length){
					uni.showToast({
						title: '消息不能为空',
						icon: 'none'
					})
					return
				}
				let sendMessage = this.tim.createTextMessage({
					to: this.toUserId,
					// to: '3',
					conversationType: this.converType,
					payload: {
						text: message
					}
				})
				this.scrollTop += uni.upx2px(40)
				this.message = ''
				let saveLoalMsg = {
					conversationID: sendMessage.conversationID,
					flow: 'out',
					payload: {
						text: message
					},
					nick: this.$store.state.TimUserInfo.nick,
					avatar: this.$store.state.TimUserInfo.avatar
				}
				this.$store.commit('pushCurrentMessageList', saveLoalMsg)
				this.tim.sendMessage(sendMessage).then((res) => {
					console.log(res)
				})
			},
			getMsgList(id, type){
				console.log(id)
				console.log(type)
				let promise = this.tim.getMessageList({
					conversationID: id,
					count: 25
				})
				promise.then((res) => {
					console.log(res.data.messageList)
					let data = res.data.messageList
					for(let i = 0; i < data.length; i++){
						this.tim.getUserProfile({
							userIDList: [data[i].from]
						}).then((e) => {
							console.log(e)
							data[i].nick = e.data[0].nick
							data[i].avatar = e.data[0].avatar
						})
					}
					// this.tim.getUserProfile({
					// 	userIDList: [data[0].from]
					// }).then((e) => {
					// 	console.log(e)
					// })
					this.nextReqMessageID =  res.data.nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
					this.isCompleted =  res.data.isCompleted
					this.$store.commit('pushCurrentMessageList', res.data.messageList)
					this.tim.setMessageRead({conversationID: id})
				})
			},
			chooseEmoji(i){
				this.message += this.emojiList[i].alt
			},
			//替换表情符号为图片
			replaceEmoji(str){
				let emojiWth = uni.upx2px(40)
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
					let onlinePath = this.httpUrl + '/Content/emoji/'
					for(let i = 0; i < this.emojiList.length; i++){
						if(item == this.emojiList[i].alt){
							let imgstr = '<img style="width: ' + emojiWth + 'px;vertail-align: middle;" src="'+onlinePath+this.emojiList[i].url+'">';
							return imgstr;
						}
					}
				});
				return replacedStr;
			},
			inputMess(){
				// this.emojiShow = false
				// this.moreOpera = false
				// this.style.contentViewHeight += uni.upx2px(500)
				// this.scrollTop -= uni.upx2px(500)
			},
			emojiHidden(){
				this.emojiShow = true
				this.moreOpera = false
			},
			moreOperaThing(i){
				let imgWth = uni.upx2px(300)
				switch(i){
					case 0:
						uni.chooseImage({
							// count: 1,
							success(res) {
								// for(let i = 0; i < res.tempFiles.length; i++){
									uni.uploadFile({
										url: 'http://hw.tyabc.cn/api/account/upload',
										filePath: res.tempFilePaths[0],
										success: function(e){
											console.log(e)
											// that.message = '<img style="width:' + imgWth + 'px;" src="'+ that.httpUrl + e.data.result.path +'">'
											// that.sendMsg()
										}
									})
									// that.uploadImage(res.tempFiles[0]).then((e) => {
									// 	that.message = '<img style="width:' + imgWth + 'px;" src="'+ that.httpUrl + e.data.result.path +'">'
									// 	that.sendMsg()
									// })
								// }
							}
						})
						break;
				}
			},
			loadHistory(){
				this.loadMoreHistory = true
				let promise
				if(!this.isCompleted){
					promise = this.tim.getMessageList({
						conversationID: this.toUserId, 
						nextReqMessageID: this.nextReqMessageID, 
						count: 25
					})
					promise.then((res) => {
						console.log(res)
						this.nextReqMessageID =  res.data.nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
						this.isCompleted =  res.data.isCompleted
						this.$store.commit('unshiftCurrentMessageList', res.data.messageList)
					})
					this.$nextTick(function() {
						this.scrollToView = this.nextReqMessageID;//跳转上次的第一行信息位置
						this.$nextTick(function() {
							this.scrollAnimation = true;//恢复滚动动画
						});
						
					});
					this.loadMoreHistory = false
				}
			},
			// 接受消息(定位消息)
			screenMsg(newVal,oldVal){
				if(newVal[0].ID && oldVal[0].ID){
					if(newVal[0].ID != oldVal[0].ID && newVal.length>=this.count ){
						this.$nextTick(()=> {this.scrollToView =oldVal[0].ID});
					}else{
						this.$nextTick(()=> {this.scrollToView =newVal[newVal.length-1].ID});
					}
				}else{
					this.$nextTick(()=> {this.scrollToView =newVal[newVal.length-1].ID});
				}
			},
			navTo(i){
				console.log(this.chatList[i])
				if(this.chatList[i].from != "administrator"){
					uni.navigateTo({
						url: '../addressBook/friendDetail/friendDetail?userId=' + this.chatList[i].from + '&name=' + this.chatList[i].nick
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.chat_page{
		.load_history{
			display: flex;
			justify-content: center;
			image{
				width: 30rpx;
				height: 30rpx;
			}
			p{
				font-size: 28rpx;
				color: #999;
			}
		}
		.chat_list{
			div{
				&>div{
					display: flex;
					padding: 10rpx 20rpx;
					&>image{
						width: 70rpx;
						height: 70rpx;
						border-radius: 70rpx;
						background-color: #fff;
					}
					&>div{
						max-width: 500rpx;
						display: flex;
						flex-direction: column;
						padding: 0;
						&>span{
							font-size: 30rpx;
						}
						&>rich-text{
							background-color: #38CDBE;
							padding: 20rpx 30rpx;
							color: #fff;
							border-radius: 40rpx;
							font-size: 28rpx;
						}
					}
				}
				.others{
					justify-content: flex-start;
					&>image{
						margin-right: 10rpx;
					}
					&>div{
						margin-right: 30rpx;
						&>span{
							text-align: left;
						}
						&>rich-text{
							border-top-left-radius: 14rpx;
						}
					}
				}
				.mine{
					justify-content: flex-end;
					&>image{
						margin-left: 10rpx;
					}
					&>div{
						margin-left: 30rpx;
						&>span{
							text-align: right;
						}
						&>rich-text{
							border-top-right-radius: 8rpx;
						}
					}
				}
			}
		}
		.chat_input{
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #fff;
			&>div{
				&:nth-of-type(1){
					padding: 20rpx;
					display: flex;
					justify-content: space-between;
					image{
						width: 48rpx;
						height: 48rpx;
						margin-top: 10rpx;
					}
					textarea{
						background-color: #f8f8f8;
						height: 43rpx;
						max-height: 140rpx;
						font-size: 28rpx;
						padding: 14rpx;
						flex: 1;
					}
					text{
						color: #15C1B3;
						font-size: 50rpx;
						margin: 0 10rpx;
					}
					button{
						font-size: 28rpx;
						text-align: center;
						width: 150rpx;
						margin-left: 10rpx;
						height: 70rpx;
						padding: 0;
					}
				}
				&:nth-of-type(2){
					border-top: 1rpx solid #f8f8f8;
					height: 470rpx;
					background-color: #fff;
					width: 100%;
					scroll-view{
						height: 470rpx;
						view{
							display: inline-block;
							image{
								width: 64rpx;
								height: 64rpx;
								margin: 20rpx;
							}
						}
					}
					&>div{
						display: inline-block;
						margin: 20rpx;
						p{
							text-align: center;
							&:nth-of-type(1){
								padding: 30rpx;
								background-color: #f8f8f8;
								border-radius: 20rpx;
								text{
									color: #999;
									// font-size: 50rpx;
								}
							}
							&:nth-of-type(2){
								font-size: 26rpx;
								color: #999;
								line-height: 50rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
