<script setup lang="ts">
	import Board from "../../components/Board/Board.vue";
	import Nav from "../../components/Nav/Nav/Nav.vue";
</script>

<template>
	<div class="game-page">
		<header class="header">
			<Nav />
		</header>
		<Board />
	</div>
</template>

<style scoped>
	.game-page {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.header {
		margin-top: 25px;
		margin-left: 25px;
	}
</style>
