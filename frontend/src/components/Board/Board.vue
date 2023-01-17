<script setup lang="ts">
	import { useBoard } from "../../hooks/useBoard";
	import BoardCell from "./BoardCell/BoardCell.vue";
	import css from "./Board.module.css";
	import { TField } from "../../types/game";
	import { socketPropsKey } from "../../constants/keys";
	import { inject } from "vue";

	const props = inject(socketPropsKey);

	const { onCellClick } = useBoard();
</script>

<template>
	<main :class="css.game">
		<div :class="css.game__board">
			<template v-for="(cell, i) in props?.board">
				<BoardCell
					v-for="(el, j) in cell"
					:state="(el as TField)"
					:index="[i, j]"
					@cell-click="onCellClick"
				/>
			</template>
		</div>
	</main>
</template>
