<script setup lang="ts">
	import { RouterView } from "vue-router";
	import { useSocket } from "./hooks/useSocket";
	useSocket();
</script>

<template>
	<RouterView />
</template>
