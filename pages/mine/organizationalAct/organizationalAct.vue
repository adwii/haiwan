<template>
	<view class="organizational_act">
		<div class="base_info">
			<input type="text" placeholder="请输入标题" />
			<p class="picker">
				<span>请选择商家</span>
				<span>
					<text class="iconfont icon-rightarrow"></text>
				</span>
			</p>
			<picker mode="selector" :range="serviceList" @change="servicechange" v-if="type=='vote'">
				<view class="picker">
					<span>请选择服务</span>
					<span>
						{{serviceList[serviceIndex]}}
						<text class="iconfont icon-rightarrow"></text>
					</span>
				</view>
			</picker>
			<input type="text" placeholder="请输入价格" />
			<picker mode="selector" :range="peopleNumList" @change="peopleNumchange">
				<view class="picker">
					<span>请选择服务</span>
					<span>
						{{peopleNumList[peopleNumIndex]}}
						<text class="iconfont icon-rightarrow"></text>
					</span>
				</view>
			</picker>
			<picker mode="date"  @change="startDate">
				<view class="picker">
					<span>请选择开始时间</span>
					<span>
						{{startDateValue}}
						<text class="iconfont icon-rightarrow"></text>
					</span>
				</view>
			</picker>
		</div>
		
		<div class="submit">发布活动</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				serviceList: [''],
				serviceIndex: 0,
				peopleNumList: ['1-10','10-20','20-30','30-40','40-50','50-60'],
				peopleNumIndex: 0,
				startDateValue: '选择活动开始时间'
			};
		}
	}
</script>

<style lang="less">
	.organizational_act{
		padding-bottom: 120rpx;
		.base_info{
			background-color: #fff;
			&>input{
				height: 70rpx;
				line-height: 70rpx;
				margin: 0 20rpx;
				border-top: 1rpx solid #f8f8f8;
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
	}
</style>
