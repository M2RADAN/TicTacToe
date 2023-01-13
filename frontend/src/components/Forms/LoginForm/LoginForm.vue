<script setup lang="ts">
	import Button from "../../UI/Button/Button.vue";
import Input from "../../UI/Input/Input.vue";
import css from "./LoginForm.module.css";

defineProps<{text: string}>()
</script>

<template>
		<form action="" @submit.prevent :class="css.form">		
			<Input placeholder="Логин"/>
			<Input placeholder="Пароль" />
			<Input v-if="text === 'Регистрация'" placeholder="Повтор пароля" />
			<Button type="submit">{{ text }}</Button>
		</form>
</template>
