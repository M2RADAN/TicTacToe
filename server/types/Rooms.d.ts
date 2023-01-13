import { TSoket } from "../main";

export type Field = (null | "cross" | "circle")[][];

export interface ICreateRoom {
	id: string;
	ioInstance: TSoket;
	addClient(memberId: string): void;
	removeClient(memberId: string): void;
	emitSubscribers(name: string, msg: any): void;
	makeMove(memberId: string, pos: number[]): void;
	players: IMember[];
	observers: IMember[];
	isEnded: boolean;
	winner: null | "cross" | "circle";
	field: Field;
}

export interface IMember {
	id: string;
	role?: "cross" | "circle";
	isObserver?: boolean;
	moveable?: boolean;
}
