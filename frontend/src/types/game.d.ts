import { BOARD_IMG } from "../constants/board";

export type TField = keyof typeof BOARD_IMG | null;
export interface IStats  {
		ties: number,
		wins: number,
		loses: number,
		total: number
	}