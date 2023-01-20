import { io, ManagerOptions, SocketOptions } from "socket.io-client";
import { URL_BASE } from "../constants/keys";
import {
	TCallback,
	TResponse,
	TSocket,
	TSocketReactive,
	TSocketResponse,
	TSyncResponse,
} from "../types/socket";

export class SocketConnection {
	private url: string;
	private props: TSocketReactive;
	private socket: TSocket;

	constructor(url: string, props: TSocketReactive) {
		this.url = url;
		this.props = props;
	}

	private sync(props: TSyncResponse) {
		this.props.board = props.board;
		this.props.canMove = props.canMove;
		this.props.winner = props.winner;
		if (props.winner) this.updateWins();
	}

	connect(callback?: TCallback, options?: Partial<ManagerOptions & SocketOptions>) {
		if (this.props.isConnected === true) return console.error("Игрок уже подключен к другой сессии");

		this.socket = io(this.url, options);

		this.socket.on("playerConnected", (msg: TSocketResponse) => {
			this.props.isConnected = true;
			this.props.role = msg.role || null;
			this.props.isObserver = msg.isObserver;
			this.sync(msg);
			callback && callback(msg.id || "no id provided");
		});

		this.socket.on("playerDisconnected", (msg: string) => {
			this.props.isConnected = false;
			if (msg === this.props.roomId) this.disconnect();
			else {
				console.warn(
					`Emit disconnect: emitted disconnect from room ${msg}, but it's actually room ${this.props.roomId}`
				);
			}
		});

		this.socket.on("sync", (msg: TSyncResponse) => this.sync(msg));

		this.socket.on("disconnect", (reason: any) => {
			this.props.isConnected = false;
			console.log(reason);
		});
	}

	on<T>(eventName: string, callback: (msg: T) => any) {
		this.socket?.on(eventName, callback);
	}

	emit(eventName: string, ...args: any[]) {
		this.socket?.emit(eventName, ...args);
	}

	disconnect() {
		this.props.isConnected = false;
		this.socket?.disconnect();
	}

	restartGame() {
		this.emit("restart", this.props.roomId);
	}

	async createRoom() {
		const res: TResponse = await (
			await fetch(`${URL_BASE}/newRoom`, {
				method: "POST",
			})
		).json();

		if (res.success) {
			this.props.roomId = res.id || null;
			this.props.observerId = res.observerId || null;
			return res.id || null;
		}
		return null;
	}

	async updateWins() {
		await fetch(`${URL_BASE}/updateStats`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + this.props.token,
			},
			body: JSON.stringify({
				role: this.props.role,
				id: this.props.roomId,
			}),
		});
		return null;
	}

	async connectRoom(id: string, callback?: TCallback) {
		this.connect(
			(msg) => {
				this.props.roomId = id;
				callback && callback(msg);
			},
			{
				query: { id },
			}
		);
	}
}
