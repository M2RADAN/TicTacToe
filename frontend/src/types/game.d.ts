import { BOARD_IMG } from "../constants/board";

export type TCell = {
	state: keyof typeof BOARD_IMG | null;
};
