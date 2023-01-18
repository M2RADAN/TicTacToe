<script setup lang="ts">
	import { inject, reactive, ref, watchEffect } from "vue";
	import CreateGameForm from "../../components/Forms/CreateGameForm/CreateGameForm.vue";
	import ConnectGameForm from "../../components/Forms/ConnectGameForm/ConnectGameForm.vue";

	import Modal from "../../components/Modal/Modal.vue";
	import Button from "../../components/UI/Button/Button.vue";
	import css from "./Main.module.css";
	import LoginForm from "../../components/Forms/LoginForm/LoginForm.vue";
	import Stats from "../../components/Profile/ProfileStats/ProfileStats.vue";
	import logo from "../../../assets/logo.png";
	import { socketPropsKey } from "../../constants/keys";
	import { useRouter } from "vue-router";
import { IStats } from "../../types/game";


	
	const modals = ref([false, false, false, false]);

	const stats = reactive<IStats>({
		ties: 0,
		wins: 0,
		loses: 0,
		total: 0
	})

	const props = inject(socketPropsKey);
	const router = useRouter();



	const triggerModal = (index: number) => (modals.value[index] = !modals.value[index]);

	watchEffect(() => {
		fetch("/userInfo", {
			method: "POST",
			headers: {
				authorization: "Bearer " + localStorage.getItem("token")
			}
		}).then(res=>res.json()).then((res: IStats) => {
			stats.loses = res.loses;
			stats.ties = res.ties;
			stats.total = res.total;
			stats.wins = res.wins;
		})
	})

</script>

<template>
	<Stats :stats="stats"/>

	<div :class="css.main__wrapper">
		<figure :class="css.logo">
			<img :src="logo" :class="css.logo__img" alt="TicTacToe" />
			<figcaption :class="css.logo__text">TicTacToe</figcaption>
		</figure>

		<main :class="css.main">
			<div :class="css.main__auth">
				<Button @click="triggerModal(0)">Вход</Button>
				<Button @click="triggerModal(1)">Регистрация</Button>
			</div>
			<Button @click="triggerModal(2)">Создать новую игру</Button>
			<Button @click="triggerModal(3)">Присоединиться</Button>
			<Button v-if="props?.isConnected" @click="router.push('/game')">Продолжить игру</Button>

			<Modal :isOpen="modals[0]" @close="triggerModal(0)"><LoginForm type="Вход" /></Modal>
			<Modal :isOpen="modals[1]" @close="triggerModal(1)"><LoginForm type="Регистрация" /></Modal>
			<Modal :isOpen="modals[2]" @close="triggerModal(2)"><CreateGameForm /></Modal>
			<Modal :isOpen="modals[3]" @close="triggerModal(3)"><ConnectGameForm /></Modal>
		</main>
	</div>
</template>
