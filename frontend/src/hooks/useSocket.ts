import { provide, reactive, ref, inject } from "vue";
import { authKey, socketKey, socketPropsKey, URL_BASE } from "../constants/keys";
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

	const auth = inject(authKey)

	const socketInst = new SocketConnection(URL_BASE, gameProps, auth?.token || undefined);
	
	provide(socketKey, socketInst);
	provide(socketPropsKey, gameProps);
}
