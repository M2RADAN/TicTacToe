<script setup lang="ts">
	import { ref } from "vue";
	import { IStats } from "../../../types/game";
	import css from "./ProfileStats.module.css";

	defineProps<{stats: IStats}>()
	const titles = ref(["Выиграл", "Проиграл", "Всего"]);

</script>

<template>
	<section :class="css.stats">
		<template v-for="(el, index) in Object.keys(stats)">
			<p :class="css.stats__title">{{ el }}:</p>
			<p :class="css.stats__info">
				{{ stats[el as keyof IStats] }}
			</p>
		</template>
	</section>
</template>
