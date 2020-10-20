<template>
	<view class="edit_activity">
		<div class="base_info">
			<input type="text" placeholder="请输入活动标题" v-model="info.Title"/>
			<p class="picker" @click="openRulePop">
				<span>请编辑活动规则</span>
				<span>
					<text class="iconfont icon-rightarrow"></text>
				</span>
			</p>
			<picker mode="date"  @change="startDate">
				<view class="picker">
					<span>请选择开始时间</span>
					<span>
						{{startDateValue}}
						<text class="iconfont icon-rightarrow"></text>
					</span>
				</view>
			</picker>
			<picker mode="date"  @change="endDate" :start="startDateValue">
				<view class="picker">
					<span>请选择结束时间</span>
					<span>
						{{endDateValue}}
						<text class="iconfont icon-rightarrow"></text>
					</span>
				</view>
			</picker>
			<picker mode="selector" :range="voteTypeList" @change="voteTypechange" v-if="type=='vote'">
				<view class="picker">
					<span>请选择投票类型</span>
					<span>
						{{voteTypeList[voteTypeIndex]}}
						<text class="iconfont icon-rightarrow"></text>
					</span>
				</view>
			</picker>
			<picker mode="selector" :range="scopeActList" @change="scopeActchange" v-if="type=='vote'">
				<view class="picker">
					<span>请选择活动范围</span>
					<span>
						{{scopeActList[scopeActIndex]}}
						<text class="iconfont icon-rightarrow"></text>
					</span>
				</view>
			</picker>
			<picker mode="selector" :range="voteTimesList" @change="voteTimeschange" v-if="type=='vote'">
				<view class="picker">
					<span>请选择每日投票次数</span>
					<span>
						{{voteTimesList[voteTimesIndex]}}
						<text class="iconfont icon-rightarrow"></text>
					</span>
				</view>
			</picker>
			<p class="picker" v-if="type=='vote'">
				<span>是否重复投票</span>
				<span>
					<switch :checked="repeatVote" @change="repeatChange" />
				</span>
			</p>
		</div>
		<div class="vote_content" v-if="type=='vote'">
			<div v-for="(item,index) in votePeopleList" :key='index'>
				<text class="iconfont icon-jianshao-filled" @click="removeVotePeople(index)"></text>
				<image :src="item.Avatar" @click="uploadImgPeo(index)"></image>
				<div>
					<input type="text" placeholder="请输入姓名" v-model="item.Name"/>
					<textarea placeholder="请输入简介" v-model="item.Words"/>
				</div>
			</div>
			<p>
				<text class="iconfont icon-jia-filled" @click="addVotePeople"></text>
				<span @click="addVotePeople">添加选项</span>
			</p>
		</div>
		<uni-popup type="center" ref="rulePop">
			<view class="content">
				<p>活动规则</p>
				<textarea v-model="info.Rule" placeholder="请输入活动规则" @input="setRuleId"/>
				<p @click="closeRulePop">确认</p>
			</view>
		</uni-popup>
		<div class="apply_content" v-if="type == 'apply'">
			<textarea v-model="info.Content" placeholder="请编辑活动内容" />
		</div>
		<div class="submit" @click="releaseAct">发布活动</div>
	</view>
</template>

<script>
	
	var that = null
	
	export default {
		data() {
			return {
				startDateValue: '',
				endDateValue: '',
				repeatVote: false,
				voteTypeList: ['单选投票','多选投票'],
				voteTypeIndex: 0,
				scopeActList: ['全部范围'],
				scopeActIndex: 0,
				voteTimesList: ['1','2','3','4','5'],
				voteTimesIndex: 0,
				votePeopleList: [
					{
						Avatar: '',
						Name: '',
						Words: ''
					},
				],
				type: 'vote',
				info: {
					DeptName: uni.getStorageSync('user_dept')
				},
			};
		},
		onLoad(e) {
			that = this
			this.type = e.type
			console.log(e.type)
		},
		methods: {
			startDate(e){
				// console.log(e)
				this.startDateValue = e.detail.value
			},
			endDate(e){
				// console.log(e)
				this.endDateValue = e.detail.value
			},
			voteTypechange(e){},
			scopeActchange(e){},
			voteTimeschange(e){},
			addVotePeople(){
				this.votePeopleList.push({
						Avatar: '',
						Name: '',
						Words: ''
					})
			},
			removeVotePeople(i){
				if(this.votePeopleList.length == 1){
					
				}else{
					this.votePeopleList.splice(i,1)
				}
			},
			openRulePop(){
				this.$refs.rulePop.open()
			},
			creatVoteAct(){
				if(!this.info.Title || !this.info.Title.trim().length){
					uni.showToast({
						title: '请输入活动标题',
						icon: 'none'
					})
					return false
				}
				if(!this.info.Rule || !this.info.Rule.trim().length){
					uni.showToast({
						title: '请编辑活动规则',
						icon: 'none'
					})
					return false
				}
				if(!this.startDateValue.length){
					uni.showToast({
						title: '请选择开始时间',
						icon: 'none'
					})
					return false
				}
				if(!this.endDateValue.length){
					uni.showToast({
						title: '请选择结束时间',
						icon: 'none'
					})
					return false
				}
				if((!this.votePeopleList[0].Name.length || !this.votePeopleList[0].Words.length || !this.votePeopleList[0].Avatar.length) && this.votePeopleList < 2){
					uni.showToast({
						title: '投票人数不能少于一个',
						icon: 'none'
					})
					return false
				}
				this.info.TypeId = this.voteTypeIndex
				this.info.RangeId = this.scopeActIndex
				this.info.MaxNumber = Number(this.voteTimesList[this.voteTimesIndex])
				this.info.Repeat = Number(this.repeatVote)
				this.info.DateStart = this.startDateValue
				this.info.DateEnd = this.endDateValue
				this.info.Folks = JSON.stringify(this.votePeopleList)
				return true
			},
			createApplyAct(){
				if(!this.info.Title || !this.info.Title.trim().length){
					uni.showToast({
						title: '请输入活动标题',
						icon: 'none'
					})
					return false
				}
				if(!this.info.Rule || !this.info.Rule.trim().length){
					uni.showToast({
						title: '请编辑活动规则',
						icon: 'none'
					})
					return false
				}
				if(!this.startDateValue.length){
					uni.showToast({
						title: '请选择开始时间',
						icon: 'none'
					})
					return false
				}
				if(!this.endDateValue.length){
					uni.showToast({
						title: '请选择结束时间',
						icon: 'none'
					})
					return false
				}
				if(!this.info.Content || !this.info.Content.trim().length){
					uni.showToast({
						title: '请填写活动内容',
						icon: 'none'
					})
					return false
				}
				this.info.DateStart = this.startDateValue
				this.info.DateEnd = this.endDateValue
				return true
			},
			createForumAct(){
				if(!this.info.Title || !this.info.Title.trim().length){
					uni.showToast({
						title: '请输入活动标题',
						icon: 'none'
					})
					return false
				}
				if(!this.info.Rule || !this.info.Rule.trim().length){
					uni.showToast({
						title: '请编辑活动规则',
						icon: 'none'
					})
					return false
				}
				if(!this.startDateValue.length){
					uni.showToast({
						title: '请选择开始时间',
						icon: 'none'
					})
					return false
				}
				if(!this.endDateValue.length){
					uni.showToast({
						title: '请选择结束时间',
						icon: 'none'
					})
					return false
				}
				this.info.DateStart = this.startDateValue
				this.info.DateEnd = this.endDateValue
				return true
			},
			repeatChange(e){
				this.repeatVote = e.detail.value
			},
			releaseAct(){
				let TypeId
				let check = false
				switch(this.type){
					case 'vote':
						TypeId = 1
						check = this.creatVoteAct()
						break;
					case 'apply':
						TypeId = 2
						check = this.createApplyAct()
						break;
					case 'forum':
						TypeId = 3
						check = this.createForumAct()
						break;
				}
				// console.log(check)
				if(!check){
					return
				}
				this.info.TypeId = TypeId
				this.$http.post(this.api.createAct, this.info, {
					header: {
						'content-type': 'application/json'
					}
				}).then((res) => {
					console.log(res)
					if(that.type == 'vote'){
						that.$http.post(`${that.api.submitVoteFolkList}${res.info_id}`, that.votePeopleList,{
							header: {
								'content-type': 'application/json'
							}
						}).then(() => {
							
							uni.showToast({
								title: '提交成功',
								success() {
									setTimeout(function(){
										uni.navigateTo({
											url: '../../historyAct/historyAct'
										})
									},800)
								}
							})
						})
					}else{
						
						if(res == 200){
							uni.showToast({
								title: '提交成功',
								success() {
									setTimeout(function(){
										uni.navigateTo({
											url: '../../historyAct/historyAct'
										})
									},800)
								}
							})
						}
					}
				})
			},
			closeRulePop(){
				this.$refs.rulePop.close()
			},
			setRuleId(e){
				// console.log(e)
				this.info.Rule = e.detail.value
			},
			uploadImgPeo(i){
				uni.chooseImage({
					count: 1,
					success(res) {
						console.log(res)
						that.uploadImage(res.tempFilePaths[0], (e) => {
							console.log(e)
							that.votePeopleList[i].Avatar = that.httpUrl + JSON.parse(e.data).result.path
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.edit_activity{
		padding-bottom: 120rpx;
		.base_info{
			background-color: #fff;
			&>input{
				height: 70rpx;
				line-height: 70rpx;
				margin: 0 20rpx;
			}
			.picker{
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				font-size: 28rpx;
				color: #333;
				border-top: 1rpx solid #f8f8f8;
				span{
					display: flex;
					justify-content: center;
					line-height: 50rpx;
					&:nth-of-type(2){
						color: #858585;
					}
					switch{
						transform: scale(0.6);
					}
				}
			}
		}
		.vote_content{
			&>div{
				margin: 20rpx 0;
				background-color: #fff;
				display: flex;
				position: relative;
				padding: 20rpx;
				padding-left: 60rpx;
				&>text{
					color: #FF815B;
					position: absolute;
					top: 50%;
					left: 10rpx;
					margin-top: -30rpx;
				}
				image{
					width: 200rpx;
					height: 200rpx;
					margin-right: 20rpx;
					background-color: #f8f8f8;
				}
				div{
					input{
						background-color: #f7f7f7;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 28rpx;
						color: #999;
						width: 430rpx;
						padding: 0 10rpx;
					}
					textarea{
						font-size: 28rpx;
						color: #999;
						background-color: #f7f7f7;
						height: 120rpx;
						margin-top: 10rpx;
						width: 430rpx;
						padding: 0 10rpx;
					}
				}
			}
			&>p{
				display: flex;
				justify-content: flex-start;
				font-size: 30rpx;
				color: #858585;
				line-height: 60rpx;
				text{
					font-size: 36rpx;
					color: #15C1B3;
					margin: 0 20rpx 0 10rpx;
				}
			}
		}
		.uni-popup{
			.content{
				background-color: #fff;
				border-radius: 20rpx;
				text-align: center;
				margin: 300rpx 30rpx;
				padding-top: 30rpx;
				overflow: hidden;
				textarea{
					padding: 20rpx;
					font-size: 28rpx;
					width: 620rpx;
					margin: 20rpx;
					text-align: left;
				}
				p{
					&:nth-of-type(2){
						font-size: 30rpx;
						background: linear-gradient(to right, #7DEBD0, #20C5B5);
						color: #fff;
						line-height: 80rpx;
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
		.apply_content{
			background-color: #fff;
			margin: 20rpx 0;
			padding: 20rpx;
			display: flex;
			textarea{
				flex: 1;
				height: 500rpx;
				font-size: 28rpx;
				color: #333;
			}
		}
	}
</style>
