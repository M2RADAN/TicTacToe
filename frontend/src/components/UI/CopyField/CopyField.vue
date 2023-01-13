<script setup lang="ts">
	import { computed, ref, watchEffect } from "vue";
	import css from "./CopyField.module.css";

	const { content } = defineProps<{
		content?: string;
	}>();

	const isClicked = ref(false);

	watchEffect(() => {
		if (isClicked.value === true) {
			setTimeout(() => (isClicked.value = false), 200);
		}
	});

	const classes = computed(() => ({
		[css.copy]: true,
		[css.copy__animation]: isClicked.value,
	}));

	function onClickHandler() {
		isClicked.value = true;
		if ("clipboard" in navigator && content) {
			navigator.clipboard.writeText(content);
		}
	}
</script>

<template>
	<p :class="classes" @click="onClickHandler" v-if="content">
		{{ content }}<img :class="css.copy__img" src="../../../../public/copy.svg" alt="copy" />
	</p>
</template>
