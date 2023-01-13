<script setup lang="ts">
	import { ref } from "vue";
	import Button from "../../UI/Button/Button.vue";
	import Input from "../../UI/Input/Input.vue";
	import css from "./ConnectGameForm.module.css";

	const text = ref();
</script>

<template>
	<form @submit.prevent :class="css.form">
		<Input
			v-model="text"
			type="text"
			:placeholder="'Введите id комнаты'"
			:class="css.form__input"
		/>
		<Button type="submit" disabled>Подключиться</Button>
	</form>
</template>
