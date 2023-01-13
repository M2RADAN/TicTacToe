<script setup lang="ts">
	import { ref } from "vue";
import css from "./ProfileStats.module.css";

	const titles = ref(["Выиграл", "Проиграл", "Всего"])
	const results = ref([6, 6, 12])
</script>

<template>

	<section :class="css.stats">
		<template v-for="(el, index) in titles">
		<p>
			{{ el }}:
		</p>
		<p>
			{{ results[index] }} 
		</p>
	</template>
	</section>

</template>
