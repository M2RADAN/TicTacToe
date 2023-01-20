<script setup lang="ts">
	import { inject, onMounted, ref } from "vue";
	import CreateGameForm from "../../components/Forms/CreateGameForm/CreateGameForm.vue";
	import ConnectGameForm from "../../components/Forms/ConnectGameForm/ConnectGameForm.vue";

	import Modal from "../../components/Modal/Modal.vue";
	import Button from "../../components/UI/Button/Button.vue";
	import css from "./Main.module.css";
	import LoginForm from "../../components/Forms/LoginForm/LoginForm.vue";
	import ProfileStats from "../../components/Profile/ProfileStats/ProfileStats.vue";
	import logo from "../../../assets/logo.png";
	import { authKey, socketPropsKey } from "../../constants/keys";
	import { useRouter } from "vue-router";
	import { DefaultStats } from "../../constants/board";
	import { useToast } from "../../hooks/useToast";

	const modals = ref([false, false, false, false]);

	const props = inject(socketPropsKey);
	const router = useRouter();
	const auth = inject(authKey);
	const addToast = useToast();

	function logOut() {
		if (auth) auth.token.value = null;
	}

	const triggerModal = (index: number) => (modals.value[index] = !modals.value[index]);

	onMounted(() => {
		auth?.forceUpdate();
	});
</script>

<template>
	<ProfileStats :class="css.stats" :stats="auth?.stats.value || DefaultStats" />

	<div :class="css.main__wrapper">
		<figure :class="css.logo">
			<img :src="logo" :class="css.logo__img" alt="TicTacToe" />
			<figcaption :class="css.logo__text">TicTacToe</figcaption>
		</figure>

		<main :class="css.main">
			<template v-if="!auth?.token.value">
				<div :class="css.main__auth">
					<Button @click="() => addToast('Test text')">Вход</Button>
					<Button @click="triggerModal(1)">Регистрация</Button>
				</div>
			</template>
			<Button v-else @click="logOut">Выход</Button>
			<Button @click="triggerModal(2)">Создать новую игру</Button>
			<Button @click="triggerModal(3)">Присоединиться</Button>
			<Button v-if="props?.isConnected" @click="router.push('/game')">Продолжить игру</Button>

			<Modal :isOpen="modals[0]" @close="triggerModal(0)"
				><LoginForm @close="triggerModal(0)" type="Вход"
			/></Modal>
			<Modal :isOpen="modals[1]" @close="triggerModal(1)"
				><LoginForm @close="triggerModal(1)" type="Регистрация"
			/></Modal>
			<Modal :isOpen="modals[2]" @close="triggerModal(2)"><CreateGameForm /></Modal>
			<Modal :isOpen="modals[3]" @close="triggerModal(3)"><ConnectGameForm /></Modal>
		</main>
	</div>
</template>
