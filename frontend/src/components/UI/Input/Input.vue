<script lang="ts">
	export default {
		inheritAttrs: false,
	};
</script>

<script setup lang="ts">
	import { computed, InputHTMLAttributes } from "vue";
	import css from "./Input.module.css";

	const props = defineProps<{
		modelValue?: string;
		placeholder?: string;
		type?: string;
		class?: string;
	}>();

	const emit = defineEmits<{
		(e: "update:modelValue", value?: string): void;
	}>();

	const value = computed({
		get() {
			return props.modelValue;
		},
		set(value) {
			emit("update:modelValue", value);
		},
	});

	const otherProps = computed(() => {
		const { modelValue, ...other } = props;
		return other;
	});
</script>

<template>
	<input v-model="value" :class="[css.input, props.class]" v-bind="otherProps" />
</template>
