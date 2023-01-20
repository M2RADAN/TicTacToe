<script setup lang="ts">
	import { inject, ref } from "vue";
	import { useRouter } from "vue-router";
	import { socketKey } from "../../../constants/keys";
	import { useToast } from "../../../hooks/useToast";
	import Button from "../../UI/Button/Button.vue";
	import Input from "../../UI/Input/Input.vue";
	import css from "./ConnectGameForm.module.css";

	const id = ref<string>();
	const socket = inject(socketKey);
	const router = useRouter();
	const addToast = useToast();

	function conncetGame() {
		if (id.value) {
			socket?.connectRoom(id.value, () => {
				router.push("/game");
				addToast("Успешно подключились!", "success");
			});
		}
	}
</script>

<template>
	<form @submit.prevent="conncetGame" :class="css.form">
		<Input
			autofocus="true"
			v-model="id"
			type="text"
			:placeholder="'Введите id комнаты'"
			:class="css.form__input"
		/>
		<Button type="submit" :disabled="!id">Подключиться</Button>
	</form>
</template>
