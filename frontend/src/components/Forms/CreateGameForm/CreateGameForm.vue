<script setup lang="ts">
	import { inject, ref } from "vue";
	import { socketKey } from "../../../constants/keys";
	import Button from "../../UI/Button/Button.vue";
	import CopyField from "../../UI/CopyField/CopyField.vue";
	import css from "./CreateGameForm.module.css";

	const copyContent = ref("Tap to copy this id");
	const socket = inject(socketKey);

	const roomId = ref<string | null>(null);

	function onGameCreate() {
		socket?.createRoom().then((id) => {
			roomId.value = id.value;
		});
	}
</script>

<template>
	<form @submit.prevent="onGameCreate" :class="css.form">
		<div :class="css.form__btns">
			<Button type="submit">Создать игру</Button>
			<Button>Начать игру</Button>
		</div>

		<CopyField :content="roomId" :class="css.form__copy" />
	</form>
</template>
