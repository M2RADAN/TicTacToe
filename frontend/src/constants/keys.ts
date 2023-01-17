import { InjectionKey } from "vue";
import { SocketConnection } from "../models/Socket";
import { TSocketReactive } from "../types/socket";

export const socketKey = Symbol() as InjectionKey<SocketConnection>;
export const socketPropsKey = Symbol() as InjectionKey<TSocketReactive>;

export const URL_BASE = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
