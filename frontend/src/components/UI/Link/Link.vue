<script setup lang="ts">
	import { RouterLink, RouterLinkProps } from "vue-router";
	import css from "../Button/Button.module.css";

	interface AnchorProps extends RouterLinkProps {}
	const props = defineProps<AnchorProps>();
</script>

<template>
	<RouterLink :class="[css.btn, css.link]" v-bind="props"><slot></slot></RouterLink>
</template>
