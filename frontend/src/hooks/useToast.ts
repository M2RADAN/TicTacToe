import { v4 } from "uuid";
import { inject } from "vue";
import { toastKey } from "../constants/keys";
import { TToastType } from "../types/toasts";

export function useToast() {
	const toasts = inject(toastKey);

	return function addToast(message: string, style: TToastType = "info") {
		if (!toasts) return;
		const newToasts = [...(toasts.value || [])];
		newToasts.push({
			message,
			style,
			id: v4(),
		});
		toasts.value = newToasts;
	};
}
