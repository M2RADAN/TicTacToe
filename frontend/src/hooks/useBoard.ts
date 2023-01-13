import { ref, reactive } from "vue";
import { TCell } from "../types/game";

export function useBoard() {
	// ... useSoket functions
	const playerRole = ref<TCell["state"]>("circle");
	const canMove = ref(true);
	const board = reactive<TCell[]>(Array.from({ length: 9 }, () => ({ state: null })));

	function onCellClick(id: number) {
		if (!canMove.value) return;
		board[id].state = playerRole.value;
		canMove.value = true;
	}

	return { onCellClick, board };
}
