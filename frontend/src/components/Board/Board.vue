<script setup lang="ts">
	import { useBoard } from "../../hooks/useBoard";
	import BoardCell from "./BoardCell/BoardCell.vue";
	import css from "./Board.module.css";

	const { board, onCellClick } = useBoard();
</script>

<template>
	<main :class="css.game">
		<div :class="css.game__board">
			<BoardCell
				v-for="(cell, index) in board"
				:state="cell.state"
				:index="index"
				@cell-click="onCellClick"
			/>
		</div>
	</main>
</template>
