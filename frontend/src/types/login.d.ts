import { IStats } from "./game";
import { Ref } from "vue";

export interface IUserRequest {
	success?: boolean;
	token?: string;
}

export interface IUserProvide {
	token: Ref<string | null>;
	stats: Ref<IStats>;
	forceUpdate: () => void;
}
