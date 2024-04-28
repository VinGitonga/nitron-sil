import { API_BASE_URL } from "@/env";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface createAxiosClient {
	options?: AxiosRequestConfig;
}

function createAxiosClient({ options }: createAxiosClient = {}) {
	const instance: AxiosInstance = axios.create({
		baseURL: API_BASE_URL,
		...options,
	});

	return instance;
}

/**
 * Axios client instance with default options
 */

const axiosClient = createAxiosClient({
	options: {
		timeout: 10000,
		headers: {
			"Content-Type": "application/json",
		},
	},
});

export default axiosClient;
