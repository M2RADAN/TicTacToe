<script setup lang="ts">
	import { reactive, ref } from "vue";
	import Cell from "../Cell/Cell.vue";
	import type { TCell } from "../../types/game";
	import GameAlert from "../GameAlert/GameAlert.vue";
	import GameNavigation from "../GameNavigation/GameNavigation.vue";

	const role = ref<"cross" | "circle">("circle");
	const canMove = ref(true);

	const board = reactive<TCell[]>(Array.from({ length: 9 }, () => ({ state: null })));
	function onClick(id: number) {
		if (!canMove.value) return;
		board[id].state = role.value;
		canMove.value = false;
	}
</script>

<template>
	<div class="wrapper">
		<div class="board">
			<Cell
				v-for="(cell, index) in board"
				:state="cell.state"
				:index="index"
				@cell-click="onClick"
			/>
		</div>
		<GameAlert :canMove="canMove" />
		<GameNavigation />
	</div>
</template>

<style scoped>
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%;
		gap: 6%;
	}
	.board {
		border: 0.5vw solid var(--containter_color);
		border-radius: 2%;
		gap: 5px;
		background: var(--containter_color);
		display: grid;
		grid-template-rows: 1fr 1fr 1fr;
		grid-template-columns: 1fr 1fr 1fr;
		justify-content: center;
		align-items: stretch;
		width: 30vw;
		height: 30vw;
	}
</style>
