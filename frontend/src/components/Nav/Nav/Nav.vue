<script setup lang="ts">
	import Button from "../../UI/Button/Button.vue";
	import Link from "../../UI/Link/Link.vue";
	import GameStatus from "../GameStatus/GameStatus.vue";
	import css from "./Nav.module.css";
</script>

<template>
	<nav :class="css.nav">
		<Link to="/">Главная</Link>
		<Button>Новая игра</Button>
		<GameStatus :canMove="false" />
	</nav>
</template>
