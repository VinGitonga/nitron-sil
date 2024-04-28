import { useCallback } from "react";
import useApi from "./useApi";
import { IApiEndpoint, IApiResponse } from "@/types/Api";
import { IAlbum } from "@/types/Album";

interface IAlbumCreateData {
	title: string;
	userId: string;
}

const useAlbumUtils = () => {
	const { get, post } = useApi();

	const saveAlbum = useCallback(async (data: IAlbumCreateData) => {
		const response = await post<IApiResponse<IAlbum>>({
			endpoint: IApiEndpoint.CREATE_ALBUM,
			data: {
				title: data.title,
				user: data.userId,
			},
		});

		return response.data;
	}, []);

	const getAlbums = useCallback(async () => {
		const response = await get<IApiResponse<IAlbum[]>>({ endpoint: IApiEndpoint.GET_ALBUMS });

		return response.data;
	}, []);

	const getAlbumById = useCallback(async (id: string) => {
		const response = await get<IApiResponse<IAlbum>>({ endpoint: IApiEndpoint.GET_ALBUM_BY_ID, queryParams: { id } });

		return response.data;
	}, []);

	const getAlbumsByUserId = useCallback(async (userId: string) => {
		const response = await get<IApiResponse<IAlbum[]>>({ endpoint: IApiEndpoint.GET_ALBUM_BY_USER_ID, queryParams: { userId } });

		return response.data;
	}, []);

	const updateAlbum = useCallback(async (id: string, title: string) => {
		const response = await post<IApiResponse<IAlbum>>({
			endpoint: IApiEndpoint.UPDATE_ALBUM,
			data: {
				id,
				title,
			},
		});

		return response.data;
	}, []);

	return {
		saveAlbum,
		getAlbums,
		getAlbumById,
		getAlbumsByUserId,
		updateAlbum,
	};
};

export default useAlbumUtils;
