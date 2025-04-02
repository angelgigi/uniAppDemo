<template>
	<view class="container">
		
		<button @click="handleNavToLogin">登录/注册</button>
		<button @click="handleSwitchTab">跳转到tab页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:123
			}
		},
		methods: {
			
			handleNavToLogin(){
				uni.navigateTo({
					url:'/pages/login/index',
					 query: {
					    id: 123,
					    name: 'uniapp'
					  }
				})
			},
			handleSwitchTab(){
				uni.switchTab({
					url:'/pages/list/orderList/index'
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
