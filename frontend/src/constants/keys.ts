import { InjectionKey, Ref } from "vue";
import { SocketConnection } from "../models/Socket";
import { IUserProvide } from "../types/login";
import { TSocketReactive } from "../types/socket";
import { IToast } from "../types/toasts";

export const socketKey = Symbol() as InjectionKey<SocketConnection>;
export const socketPropsKey = Symbol() as InjectionKey<TSocketReactive>;
export const authKey = Symbol() as InjectionKey<IUserProvide>;
export const toastKey = Symbol() as InjectionKey<Ref<IToast[]>>;

export const URL_BASE = process.env.NODE_ENV === "development" ? "http://192.168.3.103:3000" : "";
