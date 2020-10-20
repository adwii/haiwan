<template>
	<view class="address_book">
		<top-bar pageName="通讯录"></top-bar>
		<tab-bar :current="3" @click="tabClick"></tab-bar>
		<uniIndexedList :datas="friendList" :index="true" color="#15C1B3" name='name' @ev="navClick"></uniIndexedList>
	</view>
</template>

<script>
	
	import uniIndexedList from '../../components/yt-txl/index.vue'

	export default {
		data() {
			return {
				phoneType: this.$store.state.phoneType,
				friendList: []
			};
		},
		components: {
			uniIndexedList
		},
		onLoad() {
			console.log(this.phoneType)
			this.getFriend()
		},
		methods: {
			tabClick(e) {
				if (e == 3) {

				} else {
					switch (e) {
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
						case 0:
							uni.redirectTo({
								url: '../organize/organize'
							})
							break;
						case 4:
							uni.redirectTo({
								url: '../mine/mine'
							})
					}
				}
			},
			navClick(e){
				console.log(e)
				uni.navigateTo({
					url: './friendDetail/friendDetail?name=' + e.name + '&userId=' + e.id
				})
			},
			getFriend(){
				this.$http.get(this.api.getAllFriend).then((res) => {
					this.friendList = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	.address_book{
		padding-bottom: 130rpx;
	}
</style>
