let apiObj = {
	getSchoolList: '/api/category', //注册页面-获取学校利列表
	getFacultyList: '/api/sub-category/',//注册页面-获取已选学校的学院\系列表
	register: '/api/account/create', //用户注册
	login: '/api/account/login', //用户登录
	userInfo: '/api/account', //获取用户基本信息，
	getVoteActList: '/api/vote', //获取投票活动列表
	getVotePartList: '/api/folk/', //获取投票活动详情参选人列表
	creatVoteAct: '/api/vote/create', //创建投票活动
	searchIntGroup: '/api/group/search_public',  //搜索兴趣群
	createIntGroup: '/api/group/create_public', //创建兴趣群聊
	agreeAddFriend: '/api/account/add_friend', //同意添加好友请求
	getAllFriend: '/api/account/get_friend',  //获取好友列表
	applyAddFriend: '/api/notice/create', //提交添加好友申请
	getFriendApply: '/api/notice',  //获取好朋友申请
	deleteApply: '/api/notice/delete', //删除好友申请
	joinIntGroup: '/api/group/join_public', //加入兴趣群聊
	createAct: '/api/info/create', //创建活动
	getHistoryAct: '/api/info',  //获取活动列表
	removeHistoryAct: '/api/info/delete',  //删除活动
	getActDetail: '/api/info/',	 //获取活动详情
	getVoteFolkList: '/api/folk/',  //获取投票活动参选人员列表
	submitVoteFolkList: '/api/folk/create/',  //创建投票活动参选人员列表
}

export default apiObj