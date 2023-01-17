import { TSoket } from "../main";

export type Field = (null | "cross" | "circle")[][];

export interface ICreateRoom {
	id: string;
	observerId: string;
	ioInstance: TSoket;
	addClient(memberId: string, connectId: string): [boolean, string | null, boolean];
	removeClient(memberId: string): void;
	emitSubscribers(name: string, msg: any): void;
	sync(): void;
	makeMove(memberId: string, pos: number[]): void;
	restart(): void;
	players: IMember[];
	observers: IMember[];
	winner: null | "cross" | "circle" | "tie";
	board: Field;
}

export interface IMember {
	id: string;
	role?: "cross" | "circle";
	isObserver?: boolean;
	moveable?: boolean;
}
