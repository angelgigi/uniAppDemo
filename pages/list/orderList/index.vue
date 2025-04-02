<template>
	<view>
		tab列表页
		<div class="logo">
			<image src="/static/c1.png"></image>
		</div>
		<view>
			<p>当前求和为：{{ countStore.sum }}</p>
			<button @click="add">加</button>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { useCountStore } from '@/store/count'

	const countStore = useCountStore()

	// 以下两种方式都可以拿到state中的数据
	console.log('@@@', countStore.sum)
	function add() {
		countStore.increment(6)
		// countStore.sum += 1
	}
</script>

<style>
	.logo {
		width: 100rpx;
		height: 100rpx;
	}

	image {
		width: 100%;
		height: 100%;
	}
</style>