export interface IApiSuccessResponse<T = any> {
	status: "success";
	msg: string;
	data?: T;
}

export interface IApiErrorResponse {
	status: "error";
	msg: string;
	errors?: any;
}

export type IApiResponseType<T = any> = IApiSuccessResponse<T> | IApiErrorResponse;

export interface ApiResponseType<T = any> {
	status: "success" | "error";
	msg?: string;
	data?: T;
}
