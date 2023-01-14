<script setup lang="ts">
	import { onUpdated, provide } from "vue";
	import { RouterView } from "vue-router";
	import { socketKey } from "./constants/keys";
	import { useSocket } from "./models/sockets";

	const socket = useSocket();
	provide(socketKey, socket);
</script>

<template>
	<RouterView />
	<router-link to="/game">111111111</router-link>
</template>
