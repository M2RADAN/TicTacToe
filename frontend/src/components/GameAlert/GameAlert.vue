<script setup lang="ts">
	defineProps<{
		canMove: boolean;
	}>();
</script>

<template>
	<div class="msg__container">
		<div class="msg">{{ canMove ? "Твой ход!" : "Ход пидора!" }}</div>
	</div>
</template>

<style scoped>
	.msg__container {
		background: var(--containter_color);
		height: 4vw;
		width: 30vw;
		border-radius: 0.5em;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.msg {
		font-size: 1.5em;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: 600;
	}
</style>
