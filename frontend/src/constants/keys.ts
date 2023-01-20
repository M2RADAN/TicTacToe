import { InjectionKey } from "vue";
import { SocketConnection } from "../models/Socket";
import { IUserProvide } from "../types/login";
import { TSocketReactive } from "../types/socket";

export const socketKey = Symbol() as InjectionKey<SocketConnection>;
export const socketPropsKey = Symbol() as InjectionKey<TSocketReactive>;
export const authKey = Symbol() as InjectionKey<IUserProvide>

export const URL_BASE = process.env.NODE_ENV === "development" ? "http://10.193.175.243:3000" : "";