import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import { clientApiServices } from '@client/services/client/index.js';
import type { APIResponseType } from '@shared/types/common/index.js';
import { HTTPStatus } from '@shared/types/common/index.js';
import {
	setUserProfileImage,
	removeUserProfileImage,
} from '@/shared/redux/slices/image/imageSlice';
export const useImageHelper = () => {
	const dispatch = useAppDispatch();
	const image = useAppSelector((state) => state.image);

	const { profileImageUrl } = image;

	const uploadProfileImage = async (file: File) => {
		try {
			const response = await clientApiServices.image.uploadImage(file);
			console.log(response.data);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.data) {
				return error.response.data;
			}

			const fallback: APIResponseType<null> = {
				success: false,
				message: 'Failed to upload image.',
				statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
				data: null,
			};

			return fallback;
		}
	};

	const getUserProfileImage = async () => {};

	return {
		profileImageUrl,
		uploadProfileImage,
	};
};
