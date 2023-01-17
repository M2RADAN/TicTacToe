import { inject } from "vue";
import { socketKey, socketPropsKey } from "../constants/keys";
import { TField } from "../types/game";

type TUseBoard = {
	onCellClick(id: number[]): void;
};

export function useBoard(): TUseBoard {
	const props = inject(socketPropsKey);
	const socket = inject(socketKey);

	function onCellClick(moveIndex: number[]) {
		if (!props?.canMove || props.board[moveIndex[0]][moveIndex[1]] !== null) return;
		props.board[moveIndex[0]][moveIndex[1]] = props.role;
		props.canMove = false;
		socket?.emit("move", moveIndex);
	}

	return { onCellClick };
}
