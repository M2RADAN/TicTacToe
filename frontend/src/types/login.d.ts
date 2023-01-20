import {IStats} from "./game"

export interface IUserRequest {
    success?: boolean;
    token?: string;
}

export interface IUserProvide {
  token?: string | null;
  stats?: IStats;
  isAuth: boolean;
}
