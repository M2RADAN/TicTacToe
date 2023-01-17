<script setup lang="ts">
	import css from "./RestartGame.module.css";
	import Button from "../../UI/Button/Button.vue";
	import { inject } from "vue";
	import { socketKey, socketPropsKey } from "../../../constants/keys";

	const props = inject(socketPropsKey);
	const socket = inject(socketKey);
</script>

<template>
	<form @submit.prevent="socket?.restartGame" :class="css.form">
		<h1 v-if="props?.winner === 'circle'">Победа ноликов</h1>
		<h1 v-else-if="props?.winner === 'cross'">Победа крестиков</h1>
		<h1 v-else>Ничья</h1>
		<Button type="submit" v-if="!props?.isObserver">Перезапуск игры</Button>
	</form>
</template>
