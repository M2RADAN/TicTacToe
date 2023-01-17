<script setup lang="ts">
	import { inject, ref } from "vue";
	import { useRouter } from "vue-router";
	import { socketKey } from "../../../constants/keys";
	import Button from "../../UI/Button/Button.vue";
	import Input from "../../UI/Input/Input.vue";
	import css from "./ConnectGameForm.module.css";

	const id = ref<string>();
	const socket = inject(socketKey);
	const router = useRouter();

	function conncetGame() {
		if (id.value) {
			socket?.connectRoom(id.value, () => {
				router.push("/game");
			});
		}
	}
</script>

<template>
	<form @submit.prevent="conncetGame" :class="css.form">
		<Input v-model="id" type="text" :placeholder="'Введите id комнаты'" :class="css.form__input" />
		<Button type="submit" :disabled="!id">Подключиться</Button>
	</form>
</template>
