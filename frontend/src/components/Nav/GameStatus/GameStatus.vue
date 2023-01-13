<script setup lang="ts">
	defineProps<{
		canMove: boolean;
	}>();
</script>

<template>
	<p class="msg">{{ canMove ? "Твой ход!" : "Ход опонента!" }}</p>
</template>

<style scoped>
	.msg {
		font-size: 1.5em;
		font-weight: 600;
		margin: 0;
		display: flex;
		align-items: center;
	}
</style>
