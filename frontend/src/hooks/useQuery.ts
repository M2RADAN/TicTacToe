import { ref, UnwrapRef } from "vue";
import { URL_BASE } from "../constants/keys";


const POST_PARAMS = (options?:{[key: string]: any}, auth?: string ): {[key: string]: any} => ({
  method: "POST",
  redirect: 'follow',
  headers: {
    'Content-Type': 'application/json',
    "Authorization": "Bearer " + auth
  },
  body: JSON.stringify(options)
})


const GET_PARAMS = (_?:{[key: string]: any}, auth?: string ): {[key: string]: any} => ({
  method: "GET",
  redirect: 'follow',
  headers: {
    "Authorization": "Bearer " + auth
  },
})


export function useQuery<T>(url: string, method: "POST" | "GET",) {
    const err = ref<string | null>(null);
    const data = ref<T | null>(null)

    
    async function toFetch(opt?: {[key: string]: any}, auth?: string): Promise<UnwrapRef<T> | string> {
      
      return fetch(URL_BASE + url, method === "POST" ? POST_PARAMS(opt, auth) : GET_PARAMS(opt, auth)).then((res) => {
        if (res.ok) {
          return res.json()
        }
        return res.json().then((res) => {
          throw Error(res.message)
        })
      }).then((res: T) => {
        data.value = res as UnwrapRef<T>;
        return res as UnwrapRef<T>;
      }).catch((error: Error) => {
        err.value = error.message
        return error.message
      })
  }
    return {err, data, toFetch}
}