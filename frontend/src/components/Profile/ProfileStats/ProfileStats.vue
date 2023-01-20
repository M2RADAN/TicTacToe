<script setup lang="ts">
	import { onUpdated, ref } from "vue";
	import { IStats } from "../../../types/game";
	import css from "./ProfileStats.module.css";

	const props = defineProps<{ stats: IStats }>();
	const titles = ref(["Выиграл", "Проиграл", "Ничьи", "Всего"]);
</script>

<template>
	<section :class="css.stats">
		<template v-for="(el, index) of Object.keys(stats)">
			<p :class="css.stats__title">{{ titles[index] }} :</p>
			<p :class="css.stats__info">
				{{ stats[el as keyof IStats] }}
			</p>
		</template>
	</section>
</template>
