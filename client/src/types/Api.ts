interface IApiSuccessResponse<T> {
	status: "success";
	msg: string;
	data?: T;
}
interface IApiErrorResponse {
	status: "error" | "failure" | "not-ready";
	msg: string;
}

export type IApiResponse<T = any> = IApiSuccessResponse<T> | IApiErrorResponse;

export const enum IApiEndpoint {
	CREATE_USER = "users/create",
    GET_USER_BY_EMAIL = "users/get/by-email",
    GET_USER_BY_ID = "users/get/by-id",
	GET_ALL_USERS = "users/get/all",
    
}

export interface IMethodParams {
	endpoint: IApiEndpoint;
	queryParams?: Record<string, unknown>;
	signal?: AbortSignal;
	data?: any;
}

export const getEndpoint = (endpoint: IApiEndpoint) => `/${endpoint}`;
