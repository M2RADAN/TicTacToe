import { v4 as uuid } from "uuid";
import { MOVE_MESSAGE } from "../constants/rooms";
import { TSoket } from "../main";
import { checkWin } from "../scripts/checkWin";
import { ICreateRoom, IMember } from "../types/Rooms";

export class Rooms {
	rooms: ICreateRoom[];
	constructor() {
		this.rooms = [];
	}

	createRoom(io: TSoket) {
		const newRoom = createRoom(io);
		this.rooms.push(newRoom);
		return [newRoom.id, newRoom.observerId];
	}

	removeRoom(id: string) {
		this.rooms = this.rooms.filter((el) => el.id !== id);
	}
	getRoom(roomId: string) {
		return this.rooms.find((el) => el.id === roomId || el.observerId === roomId);
	}
}

export function createRoom(io: TSoket): ICreateRoom {
	if (!io) throw new Error("Err");

	return {
		id: uuid(),
		observerId: uuid(),
		ioInstance: io,
		addClient(memberId, connectId) {
			let role: "circle" | "cross" | null = null;
			let isObserver = false;
			if (connectId === this.id && this.players.length < 2) {
				role = this.players.length ? "circle" : "cross";
				this.players.push({
					id: memberId,
					moveable: !this.players.length,
					role,
				});
			} else {
				isObserver = true;
				this.observers.push({
					id: memberId,
					isObserver,
				});
			}

			return [this.players.length !== 2, role, isObserver];
		},
		removeClient(memberId) {
			this.players = this.players.filter((el) => el.id !== memberId);
			this.observers = this.observers.filter((el) => el.id !== memberId);
		},

		emitSubscribers(name, msg) {
			const clients = [...this.players, ...this.observers];
			this.ioInstance.sockets.forEach((el) => {
				const client = clients.find((a) => a.id === el.id);
				if (client) {
					if (typeof msg === "function") el.emit(name, msg(client));
					else el.emit(name, msg);
				}
			});
		},

		sync() {
			this.emitSubscribers("sync", (player: IMember) => ({
				board: this.board,
				canMove: player?.moveable || false,
				winner: this.winner,
			}));
		},

		makeMove(playerId, pos) {
			let player = this.players[0];
			let player2 = this.players[1];
			if (!player2 || !player) return this.sync();
			if (player.id !== playerId) [player, player2] = [player2, player];

			const role = player?.role;
			if (role && this.board[pos[0]][pos[1]] === null && player.moveable && player2) {
				this.board[pos[0]][pos[1]] = role;
				this.emitSubscribers(MOVE_MESSAGE, {
					pos,
					role: role,
				});
				player.moveable = false;
				player2.moveable = true;
				this.winner = checkWin(this.board);
			}

			this.sync();
		},

		restart() {
			this.board = [
				[null, null, null],
				[null, null, null],
				[null, null, null],
			];
			this.winner = null;
			this.players[0].moveable = true;
			this.players[1].moveable = false;
			this.sync();
		},

		players: [],
		observers: [],
		winner: null,

		board: [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		],
	};
}
