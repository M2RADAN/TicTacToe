<script setup lang="ts">
	import { ButtonHTMLAttributes, computed } from "vue";
	import css from "./Button.module.css";

	interface ButtonProps extends ButtonHTMLAttributes {
		elType?: "btn";
	}

	const props = defineProps<ButtonProps>();
</script>

<template>
	<button :class="css.btn" v-bind="props"><slot></slot></button>
</template>
