export type TToastType = "error" | "success" | "warning" | "info";
export interface IToast {
	message: string;
	style: TToastType;
	id: string;
}
