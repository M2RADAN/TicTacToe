<script setup lang="ts">
	import { ref } from "vue";
import { URL_BASE } from "../../../constants/keys";
import Button from "../../UI/Button/Button.vue";
	import Input from "../../UI/Input/Input.vue";
	import css from "./LoginForm.module.css";

	defineProps<{ type: string }>();

	const login = ref();
	const pass = ref();
	const repass = ref();

	function LoginUser() {
		if (pass.value === repass.value || !login.value) {
		console.log("login")

			// TODO: if на login
			fetch(URL_BASE + "/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					login,
					password: pass,
				})
			}).then(res => res.json()).then(res => {
					console.log(res)

				if (res.success) {
					// TODO: в куки обязательно
					localStorage.setItem("token", res.token)
				}
			})
		}
	}
</script>

<template>
	<form @submit.prevent="LoginUser" :class="css.form">
		<Input placeholder="Логин" v-model="login" />
		<Input placeholder="Пароль" v-model="pass" />
		<Input v-if="type === 'Регистрация'" placeholder="Повтор пароля" v-model="repass" />
		<Button type="submit" >{{ type }}</Button>
	</form>
</template>
