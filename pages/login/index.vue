<template>
	<view>
		<button @click="handleLogin"> 登录</button>
	</view>


</template>
<script>
	export default {
		data() {
			return {
				isLogin: false,
				userInfo: {}
			}
		},
		onLoad(options){
			console.log('onload页面加载')
			console.log('onload页面加载',options,options.id) 
			// 调用后端接口，展示数据 等同于created
		},
		onShow(){
			console.log('onShow页面显示')
		},
		onReady(){
			console.log('onReady')
		},
		methods: {
			handleLogin() {
				// #ifdef MP-WEIXIN
				this.handleWechatLogin()
				// #endif

				// #ifdef H5
				console.log('这是网页版')
				// #endif
			},
			async handleWechatLogin() {
				try {
					// 获取用户信息（必须在点击事件的同步上下文中直接调用，禁止在异步操作）
					const userProfile = await this.getUserProfile();
					console.log('userProfile', userProfile)
					// 1. 检查登录环境
					const provider = await this.checkWechatProvider();

					// 2. 获取临时 code
					const loginRes = await this.wechatLogin(provider);
					
					console.log('code',loginRes.code)
					// 第四步：提交服务器
					const token = await serverLogin(loginRes.code) || 'ceshi123456';

					// 5. 更新状态
					this.loginSuccess(userProfile, token)
				} catch (error) {
					this.handleLoginError(error);
				}
			},
			handleLoginError(error) {
				console.error('登录失败:', error);
				uni.showModal({
					title: '登录失败',
					content: error.message || '未知错误',
					showCancel: false
				});
			},
			// 检查微信登录支持情况
			checkWechatProvider() {
				return new Promise((resolve, reject) => {
					uni.getProvider({
						service: 'oauth',
						success: (res) => {
							if (res.provider.includes('weixin')) {
								resolve('weixin');
							} else {
								reject(new Error('当前环境不支持微信登录'));
							}
						},
						fail: (err) => reject(err)
					});
				});
			},
			// 执行微信登录
			wechatLogin(provider) {
				return new Promise((resolve, reject) => {
					uni.login({
						provider,
						success: resolve,
						fail: reject
					});
				});
			},
			// 获取用户信息（需用户主动授权）
			getUserProfile() {
				return new Promise((resolve, reject) => {
					uni.getUserProfile({
						desc: '获取信息用于展示',
						success: (res) => {
							this.userInfo = {
								nickName: res.userInfo.nickName,
								avatarUrl: res.userInfo.avatarUrl
							};
							resolve(res.userInfo);
						},
						fail: (err) => reject(err)
					});
				});
			},
			// 服务器登录
			async serverLogin(code) {
				try {
					const res = await uni.request({
						// url: 'https://your-api.com/login/wechat',
						method: 'POST',
						data: {
							code
						},
						header: {
							'Content-Type': 'application/json'
						}
					});

					if (res.statusCode === 200 && res.data.token) {
						return res.data.token;
					} else {
						throw new Error(res.data.message || '登录失败');
					}
				} catch (error) {
					throw new Error(`服务器请求失败: ${error.message}`);
				}
			},
			// 登录成功处理
			loginSuccess(userInfo, token) {
				uni.setStorageSync('token', token);
				this.isLogin = true;
				this.userInfo = userInfo;
				uni.$emit('loginStatusChange', true);
				uni.showToast({
					title: '登录成功',
					icon: 'success'
				});
			},
		},
	}
</script>