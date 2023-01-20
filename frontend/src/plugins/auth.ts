import { App } from "vue";
import { authKey } from "../constants/keys";
import { useQuery } from "../hooks/useQuery";
import { IStats } from "../types/game";
import { getCookie } from "../utils/cookies";

export function authPlugin(app: App, options: {[key: string]: any}) {
  const token = getCookie("token");
    app.provide(authKey, {token: token, isAuth: !!token});

  
}