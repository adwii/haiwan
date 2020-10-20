import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import main from '../main.js'

const store = new Vuex.Store({
    state: {
		phoneType: false,
		isLogin: false,
		isSDKReady: false ,// TIM SDK 是否 ready
		
		conversationActive:{},	//聊天进行中的会话
		toUserId:'',			//聊天对象id
		conversationListGroup:[],		//会话列表
		conversationListIntGroup:[],		//会话列表
		conversationListPerson:[],		//会话列表
		currentMessageList:[],			//消息列表
		TimUserId: '',
		TimUserSig: '',
		TimUserInfo: {},
		ApplyNotice: []
	},
    mutations: {
		changePhoneType(state,type){
			state.phoneType = type.phoneType
		},
		//更新登录状态
		toggleIsLogin(state, isLogin) {
		  state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
		},
		//更新TIMSDK状态
		toggleIsSDKReady(state, isSDKReady) {
		  state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
		},
		//退出登录重置状态
		reset(state) {
			state.isLogin = false
			state.isSDKReady = false
		},
		//选择好友聊天--创建会话/拼接会话id
		createConversationActive(state,toUserId){
			state.conversationActive.conversationID = toUserId
			state.toUserId = toUserId
			state.currentMessageList = []
		},
		//选择已有会话聊天--更新选中会话详情
		updateConversationActive(state,conversationItem){
			state.conversationActive = Object.assign({}, conversationItem.conversation);
			state.toUserId = conversationItem.user.userId
			state.currentMessageList = []
		},
		updateConversationList(state,newConversationList){
			state.conversationList = newConversationList
		},
		//更新群聊会话列表
		updateConversationListGroup(state,newConversationList){
			state.conversationListGroup = newConversationList
		},
		//更新群聊会话列表
		updateConversationListIntGroup(state,newConversationList){
			state.conversationListIntGroup = newConversationList
		},
		//更新私聊会话列表
		updateConversationListPerson(state,newConversationList){
			state.conversationListPerosn = newConversationList
		},
		/**
		 * 将消息插入当前会话列表
		 * 调用时机：收/发消息事件触发时
		 * @param {Object} state
		 * @param {Message[]|Message} data
		 * @returns
		 */
		pushCurrentMessageList(state, data) {
		  // 还没当前会话，则跳过
		  if (Array.isArray(data)) {
		    // 筛选出当前会话的消息
		    const result = data.filter(item => item.conversationID === state.conversationActive.conversationID)
		    state.currentMessageList = [...state.currentMessageList, ...result]
		  } else if (data.conversationID === state.conversationActive.conversationID) {
			// main.tim.setMessageRead({conversationID: state.conversationActive.conversationID})
		    state.currentMessageList = [...state.currentMessageList, data]
		  }
		},
		/**
		 * 滑到顶部请求更多的历史消息
		 * */
		unshiftCurrentMessageList(state,data){
			console.log(data)
			if(data){
				state.currentMessageList = [...data,...state.currentMessageList]
			}
		},
		getTimUserInfo(state,data){
			state.TimUserId = data.userId
			state.TimUserSig = data.userSig
		},
		updateTimUserInfo(state, data){
			state.TimUserInfo = data
		},
		updateApplyNotice(state,data){
			state.ApplyNotice = data
		}
	},
    actions: {}
})
export default store