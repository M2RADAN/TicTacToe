<script setup lang="ts">
	import { inject, ref, watchEffect } from "vue";
	import { useRouter } from "vue-router";
	import Board from "../../components/Board/Board.vue";
	import RestartGame from "../../components/Forms/RestartGame/RestartGame.vue";
	import Modal from "../../components/Modal/Modal.vue";
	import Nav from "../../components/Nav/Nav/Nav.vue";
	import { socketKey, socketPropsKey } from "../../constants/keys";

	const router = useRouter();
	const props = inject(socketPropsKey);
	const socket = inject(socketKey);

	watchEffect(() => {
		if (props?.isConnected === false || !props?.roomId) {
			alert("Игра окончена или не существует");
			router.push("/");
		}
	});
</script>

<template>
	<div class="game-page">
		<header class="header">
			<Nav />
		</header>
		<Board />
	</div>

	<Modal :isOpen="!!props?.winner" @close="socket?.disconnect()"><RestartGame /></Modal>
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
