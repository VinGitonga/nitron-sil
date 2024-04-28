import { useCallback } from "react";
import useApi from "./useApi";
import { IApiEndpoint, IApiResponse } from "@/types/Api";
import { IPhoto } from "@/types/Photo";

type SavePhotoInfo = {
	albumId: string;
	title: string;
	url: string;
};

const usePhotoUtils = () => {
	const { post, get } = useApi();

	const savePhoto = useCallback(
		async (photo: SavePhotoInfo) => {
			const resp = await post<IApiResponse<IPhoto>>({
				endpoint: IApiEndpoint.CREATE_PHOTO,
				data: {
					album: photo.albumId,
					title: photo.title,
					imageUrl: photo.url,
				},
			});

			return resp.data;
		},
		[post]
	);

	const getPhotos = useCallback(async () => {
		const resp = await get<IApiResponse<IPhoto[]>>({
			endpoint: IApiEndpoint.GET_PHOTOS,
		});

		return resp.data;
	}, [get]);

	const getPhotosByAlbumId = useCallback(
		async (albumId: string) => {
			const resp = await get<IApiResponse<IPhoto[]>>({
				endpoint: IApiEndpoint.GET_PHOTOS_BY_ALBUM_ID,
				queryParams: { id: albumId },
			});

			return resp.data;
		},
		[get]
	);

	return { savePhoto, getPhotos, getPhotosByAlbumId };
};

export default usePhotoUtils;
