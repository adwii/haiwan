import Vue from 'vue'
import App from './App'
import tabBar from './components/tabbar/tabbar.vue'
import topBar from './components/topTab/topTab.vue'
import axios from 'axios'
import store from './store'
import tim from './common/tim/tim.js'
import TIM from 'tim-js-sdk'
import genTestUserSig from 'common/tim/GenerateTestUserSig.js'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.axios = axios


Vue.prototype.tim = tim.tim 			//tim sdk 引入后生成的tim服务
Vue.prototype.$TIM = TIM				//tim 的状态/事件 常量
Vue.prototype.genTestUserSig = genTestUserSig

import {http,httpUrl} from 'common/http.js'
Vue.prototype.$http = http


import uploadImage from './common/uploadImg.js'
Vue.prototype.uploadImage = uploadImage
Vue.prototype.httpUrl = httpUrl

import apiObj from 'common/api.js'
Vue.prototype.api = apiObj

Vue.component('tab-bar', tabBar)
Vue.component('top-bar', topBar)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
