import { provide, ref, watchEffect, watch } from "vue";
import { DefaultStats } from "../constants/board";
import { authKey } from "../constants/keys";
import { IStats } from "../types/game";
import { getCookie, setCookie } from "../utils/cookies";
import { useQuery } from "./useQuery";

export function useAuth() {
	const token = ref<string | null>(getCookie("token"));
	const stats = ref<IStats>(DefaultStats);
	const statsQuery = useQuery<IStats>("/userInfo", "POST");

	watchEffect(() => {
		if (!token.value) return;
		statsQuery.toFetch({}, token.value).then((res) => {
			console.log(res);

			if (typeof res === "string") return;
			stats.value = res;
		});
	});

	watch(
		() => token.value,
		() => {
			setCookie("token", token.value);
			if (!token.value) stats.value = DefaultStats;
		}
	);

	function forceUpdate() {
		if (!token.value) {
			stats.value = DefaultStats;
			return;
		}
		statsQuery.toFetch({}, token.value).then((res) => {
			if (typeof res === "string") return;
			stats.value = res;
		});
	}

	provide(authKey, { token, stats, forceUpdate });
	return token;
}
