<script setup lang="ts">
	import { computed, ref, watchEffect } from "vue";
	import css from "./CopyField.module.css";
	import copy from "../../../../assets/copy.svg";
	const props = defineProps<{
		content?: string | null;
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
		if ("clipboard" in navigator && props.content) {
			navigator.clipboard.writeText(props.content);
		} else {
			console.error("non write ", props.content, "clipboard" in navigator);
		}
	}
</script>

<template>
	<p :class="classes" @click="onClickHandler" v-if="content">
		<slot></slot>{{ content }}<img :class="css.copy__img" :src="copy" alt="copy" />
	</p>
</template>
