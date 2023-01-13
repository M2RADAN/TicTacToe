import { throws } from "assert";
import { v4 as uuid } from "uuid";
import { MOVE_MESSAGE } from "../constants/rooms";
import { TSoket } from "../main";
import { Field, ICreateRoom } from "../types/Rooms";

const weights = {
	cross: 1,
	circle: -1,
};

function checkField(field: Field, v: number[][]) {
	const res = v.reduce((w, pos) => {
		const key = field[pos[0]][pos[1]];
		return key ? w + weights[key] : w;
	}, 0);
	return res === 3 || res === -3;
}

function checkWin(field: Field) {
	const lines = field.some((el) => {
		const res = el.reduce((w, cell) => (cell ? w + weights[cell] : w), 0);
		return res === 3 || res === -3;
	});
	const vert = field.some((el, i, arr) => {
		const res = arr.reduce((w, cell) => {
			const ver = cell[i];
			return ver ? w + weights[ver] : w;
		}, 0);
		return res === 3 || res == -3;
	});

	if (lines || vert) return true;

	const v1 = [
		[0, 0],
		[1, 1],
		[2, 2],
	];
	const v2 = [
		[0, 2],
		[1, 1],
		[2, 0],
	];
	if (checkField(field, v1) || checkField(field, v2)) return true;
}

export class Rooms {
	rooms: ICreateRoom[];
	constructor() {
		this.rooms = [];
	}

	createRoom(io: TSoket) {
		const newRoom = createRoom(io);
		this.rooms.push(newRoom);
		return newRoom.id;
	}

	removeRoom(id: string) {
		this.rooms = this.rooms.filter((el) => el.id !== id);
	}
	getRoom(roomId: string) {
		return this.rooms.find((el) => el.id === roomId);
	}
	restartGame(id: string) {
		// TODO
	}
}

export function createRoom(io: TSoket): ICreateRoom {
	if (!io) throw new Error("Err");

	return {
		id: uuid(),
		ioInstance: io,
		addClient(memberId) {
			if (this.players.length > 2)
				this.observers.push({
					id: memberId,
					isObserver: true,
				});
			else
				this.players.push({
					id: memberId,
					moveable: !this.players.length,
					role: this.players.length ? "circle" : "cross",
				});
		},
		removeClient(memberId) {
			this.players = this.players.filter((el) => el.id !== memberId);
			this.observers = this.observers.filter((el) => el.id !== memberId);
		},

		emitSubscribers(name, msg) {
			const clients = [...this.players, ...this.observers];
			this.ioInstance.sockets.forEach((el) => {
				if (clients.find((a) => a.id === el.id)) el.emit(name, msg);
			});
		},

		makeMove(playerId, pos) {
			const player = this.players.find((el) => el.id === playerId);
			const player2 = this.players.find((el) => el.id !== playerId);
			const role = player?.role;
			if (role && this.field[pos[0]][pos[1]] === null && player.moveable && player2) {
				this.field[pos[0]][pos[1]] = role;
				this.emitSubscribers(MOVE_MESSAGE, {
					pos,
					role: role,
				});
				player.moveable = false;
				player2.moveable = true;
				this.isEnded = !!checkWin(this.field);
			}
		},

		players: [],
		observers: [],
		isEnded: false,
		winner: null,

		field: [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		],
	};
}
