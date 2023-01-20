import { TField } from "./game";
import { UnwrapNestedRefs } from "vue";
export type TResponse = {
	success?: boolean;
	id?: string;
	observerId?: string;
};

export interface TSocketProps {
	isConnected: boolean;
	roomId: null | string;
	board: TField[][];
	canMove: boolean;
	role: TField | null;
	observerId: string | null;
	winner: null | TField | "tie";
	isObserver: boolean | null;
	token?: Ref<string | null>;
}

export type TSocketReactive = UnwrapNestedRefs<TSocketProps>;

export type TSocket = Socket<DefaultEventsMap, DefaultEventsMap>;

export type TSocketResponse = {
	id?: string;
	role?: TField;
	isObserver: boolean;
} & TSyncResponse;

export type TSyncResponse = {
	canMove: boolean;
	board: TField[][];
	winner: TField | "tie";
};

export type TCallback = (msg: string) => void;
