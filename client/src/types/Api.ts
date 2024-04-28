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

	// Albums
	CREATE_ALBUM = "albums/create",
	GET_ALBUMS = "albums/get/all",
	GET_ALBUM_BY_ID = "albums/get/by-id",
	GET_ALBUM_BY_USER_ID = "albums/get/by-user-id",
	UPDATE_ALBUM = "albums/update",

	// Photos
	CREATE_PHOTO = "photos/create",
	GET_PHOTOS = "photos/get/all",
	GET_PHOTO_BY_ID = "photos/get/by-id",
	GET_PHOTOS_BY_ALBUM_ID = "photos/get/by-album-id",
	UPDATE_PHOTO = "photos/update",
}

export interface IMethodParams {
	endpoint: IApiEndpoint;
	queryParams?: Record<string, unknown>;
	signal?: AbortSignal;
	data?: any;
}

export const getEndpoint = (endpoint: IApiEndpoint) => `/${endpoint}`;
