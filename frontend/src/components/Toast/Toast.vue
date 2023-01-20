<script setup lang="ts">
	import { inject, ref, Teleport, watch } from "vue";
	import { toastKey } from "../../constants/keys";
	import css from "./Toast.module.css";

	const toasts = inject(toastKey);
	const timers = ref<{ id: string; timer: NodeJS.Timeout }[]>([]);

	function deleteToast(id: string) {
		if (!toasts) return;
		toasts.value = toasts.value.filter((el) => el.id !== id);
		timers.value = timers.value.filter((el) => el.id !== id);
	}

	watch(
		() => toasts?.value,
		() => {
			toasts?.value.forEach((el, i) => {
				const findEl = timers.value.find((a) => a.id === el.id);
				if (!findEl) {
					timers.value.push({ id: el.id, timer: setTimeout(() => deleteToast(el.id), 5000) });
				}
			});
		}
	);
</script>

<template>
	<Teleport to="#toats">
		<div :class="css.toasts">
			<TransitionGroup name="toasts">
				<div
					v-for="el in toasts"
					:key="el.id"
					:class="[css.toasts__item, css[`toasts_${el.style}`]]"
				>
					<p :class="css.toast__info">
						{{ el.message }}
					</p>
					<button :class="css.toast__button" @click="deleteToast(el.id)">&times;</button>
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
