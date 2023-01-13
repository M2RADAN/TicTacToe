<script setup lang="ts">
	import css from "./Modal.module.css";
	defineProps<{
		isOpen: boolean;
	}>();

	defineEmits<{
		(e: "close"): void;
	}>();
</script>

<template>
	<Teleport to="#modal">
		<Transition>
			<section :class="css.modal__wrapper" v-if="isOpen">
				<div :class="css.modal" class="modal">
					<span :class="css.modal__times" @click="$emit('close')">&times;</span>
					<slot></slot>
				</div>
				<div :class="css.modal__overlay" @click="$emit('close')"></div>
			</section>
		</Transition>
	</Teleport>
</template>

<style scoped>
	.v-enter-active .modal,
	.v-leave-active .modal,
	.v-enter-active,
	.v-leave-active {
		transition: all 0.2s ease;
	}

	.v-enter-to .modal,
	.v-leave-from .modal {
		transform: translateY(0);
	}

	.v-leave-to .modal {
		transform: translateY(50%);
	}
	.v-enter-from .modal {
		transform: translateY(-50%);
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
