<script setup lang="ts">
	import { ref } from "vue";
	import css from "./ProfileStats.module.css";

	const titles = ref(["Выиграл", "Проиграл", "Всего"]);
	const results = ref([6, 6, 12]);
</script>

<template>
	<section :class="css.stats">
		<template v-for="(el, index) in titles">
			<p :class="css.stats__title">{{ el }}:</p>
			<p :class="css.stats__info">
				{{ results[index] }}
			</p>
		</template>
	</section>
</template>
