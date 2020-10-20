<template>
	<view class="tabbar">
		<image src="../../static/tabbar_bg.png" mode="widthFix"></image>
		<block v-for="(item,index) in tabList" :key="index">
			<view class="navigator" :class="currentTabIndex == index ? 'on' : ''"  @tap="switchTab(index)">
				<view class="icon">
					<image :src="currentTabIndex == index ? item.selectIcon : item.icon" :class="index == 2 ? 'jia' : ''"></image>
				</view>
				<view class="text" :style="{color: currentTabIndex == index ? '#333' : '#999'}">{{item.text}}</view>
			</view>
		</block>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                tabList: [
                    {
                        icon: '../../static/zuzhi.png',
						selectIcon: '../../static/zuzhi1.png',
                        text: '组织'
                    },
                    {
                        icon: '../../static/xingqu.png',
                    	selectIcon: '../../static/xingqu1.png',
                        text: '兴趣'
                    },
                    {
                        icon: '../../static/jia.png',
                    	selectIcon: '../../static/jia.png'
                    },
					{
					    icon: '../../static/tongxunlu.png',
						selectIcon: '../../static/tongxunlu1.png',
					    text: '通讯录'
					},
					{
					    icon: '../../static/mine.png',
						selectIcon: '../../static/mine1.png',
					    text: '我'
					},
                ],
                currentTabIndex: this.current
            }
        },
        props: {
            current: { type: [Number, String], default: 0 }
        },
        methods: {
            switchTab(index){
                this.currentTabIndex = index
                this.$emit('click', index)
            }
        },
    }
</script>

<style lang="less">
	.tabbar{
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		padding: 10rpx 0;
		z-index: 10;
		// background-color: #f8f8f8;
		&>image{
			position: absolute;
			top: 0;
			width: 100%;
			left: -6rpx;
		}
		.navigator{
			flex: 1;
			text-align: center;
			position: relative;
			z-index: 2;
			.icon{
				display: flex;
				justify-content: center;
				image{
					width: 48rpx;
					height: 48rpx;
					display: block;
				}
				.jia{
					width: 130rpx;
					height: 130rpx;
					margin-top: -60rpx;
				}
			}
			.text{
				font-size: 22rpx;
				margin-top: 3rpx;
			}
		}
	}
</style>
