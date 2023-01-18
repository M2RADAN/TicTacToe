import { provide, reactive, ref } from "vue";
import { socketKey, socketPropsKey, URL_BASE } from "../constants/keys";
import { SocketConnection } from "../models/Socket";
import { TSocketProps } from "../types/socket";

export function useSocket() {
	const gameProps = reactive<TSocketProps>({
		isConnected: false,
		roomId: null,
		board: Array.from({ length: 3 }, () => [null, null, null]),
		canMove: false,
		role: null,
		observerId: null,
		winner: null,
		isObserver: null,
	});

	const socketInst = new SocketConnection(URL_BASE, gameProps);
	
	provide(socketKey, socketInst);
	provide(socketPropsKey, gameProps);
}
