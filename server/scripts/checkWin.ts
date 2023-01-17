import { TField } from "../../frontend/src/types/game";

const fc = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export function checkWin(board: TField[][]) {
	const field = board.flat(1);
	for (let i = 0; i < fc.length; i++) {
		const attp = fc[i];
		if (attp.some((el) => el === null)) continue;
		if (field[attp[0]] === field[attp[1]] && field[attp[1]] === field[attp[2]]) {
			return field[attp[0]];
		}
	}
	if (field.every((el) => !!el)) return "tie";
	return null;
}
