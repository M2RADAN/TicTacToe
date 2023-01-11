<script setup lang="ts">
	import { RouterLink } from "vue-router";
</script>

<template>
	<div class="container">
		<RouterLink class="nav__item back__main" to="">Назад</RouterLink>
		<button class="nav__item">Начать новую игру</button>
	</div>
</template>

<style scoped>
	.container {
		background: var(--containter_color);
		height: 4vw;
		width: 30vw;
		border-radius: 10px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.nav__item {
		display: inline-block;
		border: 0px;
		border-radius: 5px;
		padding: 10px 30px;
		background: var(--content_color_base);
	}
	.back__main {
		background: rebeccapurple;
		color: white;
	}
</style>
