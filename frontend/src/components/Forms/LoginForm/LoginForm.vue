<script setup lang="ts">
	import { ref } from "vue";
	import { URL_BASE } from "../../../constants/keys";
	import { useQuery } from "../../../hooks/useQuery";
	import Button from "../../UI/Button/Button.vue";
	import Input from "../../UI/Input/Input.vue";
	import css from "./LoginForm.module.css";
	import {IUserRequest} from "../../../types/login"
import { setCookie } from "../../../utils/cookies";

	const props = defineProps<{ type: string }>();
	const emit = defineEmits<{
		(e: "close"): void;
	}>();

	const login = ref<string>();
	const pass = ref<string>();
	const repass = ref<string>();


	const loginQuery = useQuery<IUserRequest>("/login", "POST");
	const regQuery = useQuery<IUserRequest>("/register", "POST")

	async function LoginUser() {
		let res: IUserRequest | string;
		if (props.type === "Регистрация") res = await regQuery.toFetch({
				login: login.value,
				password: pass.value
		});
		else res = await loginQuery.toFetch({
				login: login.value,
				password: pass.value
			})
		
		if (typeof res === "string") return;

		if(res.success) emit("close")
		
		setCookie("token", res.token || "")

	}
</script>

<template>
	<form @submit.prevent="LoginUser" :class="css.form">
		<Input autofocus="true" placeholder="Логин" v-model="login" type="text" />
		<Input placeholder="Пароль" v-model="pass" type="password" />
		<Input v-if="props.type === 'Регистрация'" placeholder="Повтор пароля" v-model="repass" type="password" />
		<Button type="submit" >{{ props.type }}</Button>
	</form>

</template>
