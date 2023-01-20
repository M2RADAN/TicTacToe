<script setup lang="ts">
	import { inject, ref, Teleport, watch } from "vue";
	import { toastKey } from "../../constants/keys";
	import css from "./Toast.module.css";

	const toasts = inject(toastKey);
	const timers = ref<{ id: number; timer: number }[]>([]);

	watch(
		() => toasts?.value,
		() => {} // TODO:  toasts delete
	);
</script>

<template>
	<Teleport to="#toats">
		<div :class="css.toasts">
			<TransitionGroup name="toasts">
				<div
					v-for="(el, index) in toasts?.reverse()"
					:key="el.id"
					:class="[css.toasts__item, css[`toasts_${el.style}`]]"
				>
					<p :class="css.toast__info">
						{{ el.message }}
					</p>
					<button :class="css.toast__button">&times;</button>
				</div>
			</TransitionGroup>
		</div>
	</Teleport>
</template>

<style scoped>
	.toasts-enter-active,
	.toasts-leave-active {
		transition: all 225ms ease-out;
	}
	.toasts-enter-from,
	.toasts-leave-to {
		opacity: 0.7;
		transform: scale(0.8);
	}
</style>
