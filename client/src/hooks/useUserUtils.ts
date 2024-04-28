import { useCallback } from "react";
import useApi from "./useApi";
import { IApiEndpoint, IApiResponse } from "@/types/Api";
import { UserDocument } from "@/types/User";

type SaveUserDetails = {
	name: string;
	username: string;
	email: string;
};

const useUserUtils = () => {
	const { get, post } = useApi();

	const getUserByEmail = useCallback(
		async (email: string) => {
			const resp = await get<IApiResponse<UserDocument>>({ endpoint: IApiEndpoint.GET_USER_BY_EMAIL, queryParams: { email } });

			return resp.data;
		},
		[get]
	);

	const saveUserDetails = useCallback(
		async (data: SaveUserDetails) => {
			const resp = await post<IApiResponse<UserDocument>>({ endpoint: IApiEndpoint.CREATE_USER, data });

			return resp.data;
		},
		[post]
	);

	const getAllUsers = useCallback(async () => {
		const resp = await get<IApiResponse<UserDocument[]>>({ endpoint: IApiEndpoint.GET_ALL_USERS });

		return resp.data;
	}, [get]);

	return { getUserByEmail, saveUserDetails, getAllUsers };
};

export default useUserUtils;
