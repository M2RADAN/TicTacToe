<script setup lang="ts">
	import type { TCell } from "../../types/game";
	import { BOARD_IMG } from "../../constants/boardImages";
	defineProps<{
		state: TCell["state"];
		index: number;
	}>();
	defineEmits<{
		(e: "cell-click", id: number): void;
	}>();
</script>

<template>
	<div class="cell" @click="$emit('cell-click', index)">
		<img v-if="!!state" :src="BOARD_IMG[state]" />
	</div>
</template>

<style scoped>
	.cell {
		border-radius: 8%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--content_color_base);
		cursor: pointer;
		user-select: none;
	}
	.cell img {
		object-fit: contain;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
