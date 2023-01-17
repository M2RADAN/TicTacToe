<script setup lang="ts">
	import { inject } from "vue";
	import { socketPropsKey } from "../../../constants/keys";
	import Button from "../../UI/Button/Button.vue";
	import CopyField from "../../UI/CopyField/CopyField.vue";
	import Link from "../../UI/Link/Link.vue";
	import GameStatus from "../GameStatus/GameStatus.vue";
	import css from "./Nav.module.css";

	const props = inject(socketPropsKey);
</script>

<template>
	<nav :class="css.nav">
		<Link to="/">Главная</Link>
		<template v-if="!props?.isObserver">
			<Button>Новая игра</Button>
			<GameStatus :canMove="!!props?.canMove" />
			<div :class="css.nav__copy">
				<CopyField :content="props?.roomId">ID игроков: </CopyField>
				<CopyField :content="props?.observerId">ID наблюдателей: </CopyField>
			</div>
		</template>
		<h1 :class="css.nav__observer" v-if="props?.isObserver">Вы наблюдатель</h1>
	</nav>
</template>
