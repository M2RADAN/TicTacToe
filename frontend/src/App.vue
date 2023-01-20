<script setup lang="ts">
	import { onErrorCaptured, provide, ref } from "vue";
	import { RouterView } from "vue-router";
	import Toast from "./components/Toast/Toast.vue";
	import { toastKey } from "./constants/keys";
	import { useAuth } from "./hooks/useAuth";
	import { useSocket } from "./hooks/useSocket";
	import { IToast } from "./types/toasts";

	provide(toastKey, ref<IToast[]>([]));
	const tokenRef = useAuth();
	useSocket(tokenRef);
</script>

<template>
	<RouterView />
	<Toast />
</template>
