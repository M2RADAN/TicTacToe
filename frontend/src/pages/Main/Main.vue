<script setup lang="ts">
	import { ref } from "vue";
	import CreateGameForm from "../../components/Forms/CreateGameForm/CreateGameForm.vue";
	import ConnectGameForm from "../../components/Forms/ConnectGameForm/ConnectGameForm.vue";

	import Modal from "../../components/Modal/Modal.vue";
	import Button from "../../components/UI/Button/Button.vue";
	import Link from "../../components/UI/Link/Link.vue";
	import css from "./Main.module.css";

	const isNewGameOpen = ref(false);
	const isConnectOpen = ref(false);

	const openNewGameTrigger = () => (isNewGameOpen.value = !isNewGameOpen.value);
	const openConnectTrigger = () => (isConnectOpen.value = !isConnectOpen.value);
</script>

<template>
	<div :class="css.main__wrapper">
		<main :class="css.main">
			<div class="">
				<Link to="/login">Вход</Link>
				<Link to="/login">Вход</Link>
			</div>
			<Button @click="openNewGameTrigger">Создать новую игру</Button>
			<Button @click="openConnectTrigger">Присоединиться</Button>

			<Modal :isOpen="isNewGameOpen" @close="openNewGameTrigger"><CreateGameForm /></Modal>
			<Modal :isOpen="isConnectOpen" @close="openConnectTrigger"><ConnectGameForm /></Modal>
		</main>
	</div>
</template>
