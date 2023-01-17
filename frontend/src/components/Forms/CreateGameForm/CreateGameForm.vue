<script setup lang="ts">
	import { inject } from "vue";
	import { useRouter } from "vue-router";
	import { socketKey, socketPropsKey } from "../../../constants/keys";
	import Button from "../../UI/Button/Button.vue";
	import CopyField from "../../UI/CopyField/CopyField.vue";
	import css from "./CreateGameForm.module.css";

	const socket = inject(socketKey);
	const props = inject(socketPropsKey);
	const router = useRouter();

	function onGameCreate() {
		socket?.createRoom();
	}

	function startGame() {
		socket?.connectRoom(props?.roomId || "", () => {
			router.push("/game");
		});
	}
</script>

<template>
	<form @submit.prevent="startGame" :class="css.form">
		<div :class="css.form__btns">
			<Button type="button" @click="onGameCreate">Создать игру</Button>
			<Button type="submit">Подключиться</Button>
		</div>

		<CopyField :content="props?.roomId" :class="css.form__copy">ID игрока: </CopyField>
		<CopyField :content="props?.observerId" :class="css.form__copy">ID наблюдателей: </CopyField>
	</form>
</template>
