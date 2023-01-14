import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";
import { Ref, ref, UnwrapRef } from "vue";

type TResponse = {
	success?: boolean;
	id?: string;
};

export interface IUseSocket {
	startGame: (id: string) => Ref<UnwrapRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>>;
	createRoom: () => Promise<Ref<null | string>>;
	joinRoom: (id: string) => Ref<UnwrapRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>>;
}

export function useSocket(): IUseSocket {
	const isConnected = ref(false);
	const socket = ref<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
	const roomId = ref<null | string>(null);

	function startGame(id: string) {
		if (isConnected.value === true) throw new Error("Игра уже начата! Сначала закончите предыдущую");
		isConnected.value = true;
		const socketInst = io("/", {
			query: {
				roomId: id,
			},
		});
		socket.value = socketInst;
		return socket;
	}

	async function createRoom() {
		const res: TResponse = await (
			await fetch("/newRoom", {
				method: "POST",
			})
		).json();

		if (res.success) {
			roomId.value = res.id || null;
			return roomId;
		}
		return roomId;
	}

	function joinRoom(id: string) {
		if (isConnected.value === true) throw new Error("Игра уже начата! Сначала закончите предыдущую");
		isConnected.value = true;

		const socketinst = io("/", {
			query: {
				roomId: id,
			},
		});
		socket.value = socketinst;
		return socket;
	}

	return { startGame, createRoom, joinRoom };
}
