<template>
	<view class="mine">
		<tab-bar :current="4" @click="tabClick"></tab-bar>
		<image src="../../static/mine_bg.png" mode="widthFix"></image>
		<div class="person_set" :style="{paddingTop: phoneType ? '70rpx' : '30rpx'}">
			<p>
				<span class="iconfont icon-saoma"></span>
				<span class="iconfont icon-xiaoxi" @click="toNotice"></span>
			</p>
			<div>
				<div>
					<image :src="info.avatar"></image>
					<div>
						<p>{{info.name}}</p>
						<p>{{info.identity}}</p>
					</div>
				</div>
				<div>
					<text class="iconfont icon-shezhi" @click="toSet"></text>
				</div>
			</div>
		</div>
		<div class="person_other">
			<navigator v-for="(item,index) in otherList" :key='index' :url="item.url">
				<image :src="item.img"></image>
				<p>{{item.label}}</p>
			</navigator>
		</div>
		<div class="info_list">
			<p>
				<span>
					<b>
						<image src="../../static/faculty.png"></image>
						<text>学院/分院</text>
					</b>
				</span>
				<span>
					{{info.category_name + '/' + info.sub_category_name}}
				</span>
			</p>
			<p>
				<span>
					<b>
						<image src="../../static/class.png"></image>
						<text>班级</text>
					</b>
				</span>
				<span>
					{{info.class_name}}
				</span>
			</p>
			<p>
				<span>
					<b>
						<image src="../../static/bedroom.png"></image>
						<text>寝室</text>
					</b>
				</span>
				<span>
					{{info.dorm_name}}
				</span>
			</p>
			<p>
				<span>
					<b>
						<image src="../../static/graduation.png"></image>
						<text>毕业地</text>
					</b>
				</span>
				<span>
					{{info.province + '-' + info.city + '-' + info.country}}
				</span>
			</p>
			<!-- <p>
				<span>
					<b>
						<image src="../../static/societies.png"></image>
						<text>社团</text>
					</b>
				</span>
				<span>
					{{info.societies}}
				</span>
			</p> -->
			<p @click="openPopup" v-if="info.dept_name">
				<span>
					<b>
						<image src="../../static/release_act.png"></image>
						<text>发布活动</text>
					</b>
				</span>
				<span>
					<text class="iconfont icon-rightarrow"></text>
				</span>
			</p>
		</div>
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
	</view>
</template>

<script>
	
	var that = null
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	export default {
		data() {
			return {
				phoneType: this.$store.state.phoneType,
				value: [0],
				info: {
					avatar: '',
					name: '',
					identity: '学生会',
					faculty: '金华职业学院/信息学院',
					class_name: '20届信息1班',
					dorm_name: '202',
					societies: '',
					category_name: '',
					sub_category_name: '',
					province: '',
					city: '',
					country: ''
				},
				otherList: [
					{
						img: '../../static/mine_erweima.png',
						label: '个人二维码',
						url: './mineErweima/mineErweima'
					},
					{
						img: '../../static/mine_wallet.png',
						label: '我的钱包',
						url: './mineWallet/mineWallet'
					},
					{
						img: '../../static/mine_hisAct.png',
						label: '历史活动',
						url: './historyAct/historyAct'
					},
					{
						img: '../../static/mine_gift.png',
						label: '群体福利',
						url: './groupGift/groupGift'
					}
				],
				actTypeList: ['请选择活动类型','参与型活动','组织型活动'],
				popInfo: {
					content: '',
					type: 0
				}
			};
		},
		onLoad() {
			that = this
			this.getUserInfo()
		},
		components: {
			uniPopupDialog
		},
		methods: {
			tabClick(e){
				if(e == 4){
					
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
						case 0:
							uni.redirectTo({
								url: '../organize/organize'
							})
					}
				}
			},
			toSet(){
				uni.navigateTo({
					url: './mineSetting/mineSetting'
				})
			},
			toRelease(){
				uni.navigateTo({
					
				})
			},
			openPopup(){
				this.$refs.popUp.open()
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
			closePopup(){
				this.$refs.popUp.close()
			},
			navTo(){
				if(this.popInfo.type == 1){
					uni.navigateTo({
						url: './joinTypeAct/joinTypeAct'
					})
				}else{
					uni.navigateTo({
						url: './organizationalAct/organizationalAct'
					})
				}
				this.$refs.popUp.close()
				this.$refs.popUp1.close()
			},
			getUserInfo(){
				let userId = JSON.parse(uni.getStorageSync('userInfo')).userId
				that.$http.get(`${this.api.userInfo}/${userId}`).then((res) => {
					console.log(res)
					if(res.dept_name){
						uni.setStorageSync('user_dept', res.dept_name)
					}
					that.info = res
				})
			},
			toNotice(){
				uni.navigateTo({
					url: '../notices/notices'
				})
			}
		}
	}
</script>

<style lang="less">
	.mine{
		padding-bottom: 130rpx;
		&>image{
			position: fixed;
			width: 100%;
			top: 0;
			z-index: 1;
		}
		.person_set{
			position: relative;
			z-index: 2;
			&>p{
				color: #fff;
				display: flex;
				justify-content: flex-end;
				padding: 20rpx 30rpx;
				span{
					margin-left: 40rpx;
					font-size: 46rpx;
				}
			}
			&>div{
				display: flex;
				justify-content: space-between;
				padding: 30rpx;
				margin-top: 20rpx;
				&>div{
					&:nth-of-type(1){
						display: flex;
						image{
							width: 120rpx;
							height: 120rpx;
							border-radius: 120rpx;
							background-color: #fff;
							margin-right: 20rpx;
						}
						div{
							display: flex;
							flex-direction: column;
							justify-content: center;
							p{
								color: #fff;
								&:nth-of-type(1){
									font-size: 40rpx;
									font-weight: 600;
									line-height: 80rpx;
								}
								&:nth-of-type(2){
									font-size: 22rpx;
									line-height: 40rpx;
								}
							}
						}
					}
					&:nth-of-type(2){
						display: flex;
						flex-direction: column;
						justify-content: center;
						text{
							font-size: 50rpx;
							color: #fff;
						}
					}
				}
			}
		}
		.person_other{
			position: relative;
			z-index: 2;
			background-color: #fff;
			border-radius: 20rpx;
			margin: 60rpx 20rpx;
			padding: 50rpx 0;
			display: flex;
			navigator{
				flex: 1;
				text-align: center;
				margin: 0 20rpx;
				image{
					width: 60rpx;
					height: 60rpx;
					display: inline-block;
				}
				p{
					font-size: 28rpx;
					color: #333;
				}
			}
		}
		.info_list{
			margin: 20rpx;
			position: relative;
			z-index: 2;
			border-radius: 20rpx;
			border-radius: 20rpx;
			overflow: hidden;
			p, .picker{
				display: flex;
				padding: 30rpx 20rpx;
				background-color: #fff;
				border-bottom: 1rpx solid #f8f8f8;
				span{
					flex: 1;
					display: flex;
					&:nth-of-type(1){
						color: #333;
						font-size: 28rpx;
						// line-height: 36rpx;
						// display: flex;
						justify-content: center;
						flex-direction: column;
						b{
							display: flex;
							font-weight: 500;
						}
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
			}
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
