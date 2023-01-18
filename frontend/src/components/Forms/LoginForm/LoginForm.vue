<script setup lang="ts">
	import { ref } from "vue";
import { URL_BASE } from "../../../constants/keys";
import Button from "../../UI/Button/Button.vue";
	import Input from "../../UI/Input/Input.vue";
	import css from "./LoginForm.module.css";

	const props = defineProps<{ type: string }>();

	const login = ref();
	const pass = ref();
	const repass = ref();
	const type = ref(props.type);
	const errorMessage = ref();

	function LoginUser() {
	
		if (props.type === "Регистрация") {
			if (pass.value === repass.value || !login.value) {
			console.log("login")

				// TODO: if на login
				fetch(URL_BASE + "/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						login: login.value, 
						password: pass.value,
					})
				}).then(res => res.json()).then(res => {
						console.log(res)
					if (res.success) {
						// TODO: в куки обязательно
						localStorage.setItem("token", res.token)
					} 
					else {
						alert(res.message);
					}
				})
			}
		}
		else {
			if (login.value) {
			console.log("login")

				// TODO: if на login
				fetch(URL_BASE + "/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						login: login.value, 
						password: pass.value,
					})
				}).then(res => res.json()).then(res => {
						console.log(res)
					if (res.success) {
						// TODO: в куки обязательно
						localStorage.setItem("token", res.token)
					} 
					else {
						alert(res.message);
					}
				})
			}

			
		}



	}
</script>

<template>
	<form @submit.prevent="LoginUser" :class="css.form">
		<Input placeholder="Логин" v-model="login" />
		<Input placeholder="Пароль" v-model="pass" />
		<Input v-if="type === 'Регистрация'" placeholder="Повтор пароля" v-model="repass" />
		<Button type="submit" >{{ props.type }}</Button>
	</form>

</template>
