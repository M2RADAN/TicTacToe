<script setup lang="ts">
	import { ref } from "vue";
	import Button from "../../UI/Button/Button.vue";
	import CopyField from "../../UI/CopyField/CopyField.vue";
	import css from "./CreateGameForm.module.css";

	const copyContent = ref("Tap to copy this id");
</script>

<template>
	<form @submit.prevent :class="css.form">
		<div :class="css.form__btns">
			<Button type="submit">Создать игру</Button>
			<Button >Начать игру</Button>
		</div>

		<CopyField :content="copyContent" :class="css.form__copy" />
	</form>
</template>
