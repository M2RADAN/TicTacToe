import { InjectionKey } from "vue";
import { IUseSocket } from "../models/sockets";

export const socketKey = Symbol() as InjectionKey<IUseSocket>;
