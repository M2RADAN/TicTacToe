<script setup lang="ts">
	import { ref } from "vue";
	import CreateGameForm from "../../components/Forms/CreateGameForm/CreateGameForm.vue";
	import ConnectGameForm from "../../components/Forms/ConnectGameForm/ConnectGameForm.vue";

	import Modal from "../../components/Modal/Modal.vue";
	import Button from "../../components/UI/Button/Button.vue";
	import css from "./Main.module.css";
	import LoginForm from "../../components/Forms/LoginForm/LoginForm.vue";
	import Stats from "../../components/Profile/ProfileStats/ProfileStats.vue";
	const isNewGameOpen = ref(false);
	const isConnectOpen = ref(false);
	const isRegisterOpen = ref(false);
	const isLoginOpen = ref(false);

	const openNewGameTrigger = () => (isNewGameOpen.value = !isNewGameOpen.value);
	const openConnectTrigger = () => (isConnectOpen.value = !isConnectOpen.value);
	const openRegisterTrigger = () => (isRegisterOpen.value = !isRegisterOpen.value);
	const openLoginTrigger = () => (isLoginOpen.value = !isLoginOpen.value);
</script>

<template>
	<div :class="css.main__wrapper">
		<div :class="css.profile">
			<Stats />
		</div>
		<img src ="logo.png" :class ="css.logo">
		<div :class="css.logo__text">TicTacToe</div>
		<main :class="css.main">

			<div :class="css.main__auth">
				<Button  @click="openLoginTrigger">Вход</Button>
				<Button @click="openRegisterTrigger">Регистрация</Button>
			</div>
			<Button @click="openNewGameTrigger">Создать новую игру</Button>
			<Button @click="openConnectTrigger">Присоединиться</Button>
			<Modal :isOpen="isRegisterOpen" @close="openRegisterTrigger"><LoginForm text = "Регистрация"/></Modal>
			<Modal :isOpen="isLoginOpen" @close="openLoginTrigger"><LoginForm text = "Логин"/></Modal>
			<Modal :isOpen="isNewGameOpen" @close="openNewGameTrigger"><CreateGameForm /></Modal>
			<Modal :isOpen="isConnectOpen" @close="openConnectTrigger"><ConnectGameForm /></Modal>
		</main>
	</div>
</template>
