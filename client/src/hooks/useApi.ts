import axiosClient from "@/lib/axios-client";
import { IMethodParams, getEndpoint } from "@/types/Api";
import { useCallback } from "react";

/**
 * A custom hook to make api calls using axios client
 * It abstracts the axios client and provides a simple interface to make api calls
 * @returns {post, get, put, patch, del} - Functions to make api calls
 */

const useApi = () => {
	/**
	 * @param endpoint - The endpoint to call
	 * @param data - The data to send to the endpoint
	 * @param checkAuth - If true, the request will be sent with the firebase auth token
	 * @see `src/types/Api.ts` - Reference for all endpoints
	 * @example
	 * ```ts
	 * // for endpoints that require auth
	 * const { data } = await post({
	 *  endpoint: IAPIEndpoint.CREATE_USER,
	 *  data: { name: 'test' }
	 * });
	 * 
	 * ```
	 */
	const post = useCallback(async <T = any>({ endpoint, data }: IMethodParams) => axiosClient.post<T>(getEndpoint(endpoint), data), []);

	/**
	 * @param endpoint - The endpoint to call
	 * @param signal - (optional) the abortcontroller signal used to handle cleanup of request in useEffects
	 * @param queryParams - (optional) any query parameters needed for the endpoints
	 * @see `src/types/Api` - Reference for all api endpoints
	 * @example
	 * ```ts
	 * const { data } = await get({
	 *    endpoint: IAPIEndpoint.USERS,
	 * });
     * 
     * 
	 * const { data } = await get({
	 *    endpoint: IAPIEndpoint.USERS,
	 *    queryParams: {limit: 10},
	 * });
	 * ```
	 */

	const get = useCallback(
		async <T = any>({ endpoint, queryParams, signal }: IMethodParams) =>
			axiosClient.get<T>(getEndpoint(endpoint), {
				params: queryParams,
				signal,
			}),
		[]
	);

	const put = useCallback(
		async <T = any>({ endpoint, data, queryParams }: IMethodParams) =>
			axiosClient.put<T>(getEndpoint(endpoint), data, {
				params: queryParams,
			}),
		[]
	);

	const patch = useCallback(
		async <T = any>({ endpoint, data, queryParams }: IMethodParams) =>
			axiosClient.patch<T>(getEndpoint(endpoint), data, {
				params: queryParams,
				headers: {},
			}),
		[]
	);

	const del = useCallback(
		async <T = any>({ endpoint, queryParams, data }: IMethodParams) =>
			axiosClient.delete<T>(getEndpoint(endpoint), {
				params: queryParams,
				data,
			}),
		[]
	);

	return {
		post,
		get,
		put,
		patch,
		del,
	};
};

export default useApi;
