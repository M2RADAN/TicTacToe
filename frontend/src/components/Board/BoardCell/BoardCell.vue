<script setup lang="ts">
	import type { TCell } from "../../../types/game";
	import { BOARD_IMG } from "../../../constants/board";
	import css from "./BoardCell.module.css";

	defineProps<{
		state: TCell["state"];
		index: number;
	}>();
	defineEmits<{
		(e: "cell-click", id: number): void;
	}>();
</script>

<template>
	<div :class="css.cell" @click="$emit('cell-click', index)">
		<img :class="css.cell__img" v-if="!!state" :src="BOARD_IMG[state]" :alt="state" />
	</div>
</template>

<style scoped></style>
