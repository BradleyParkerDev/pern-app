import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import { clientApiServices } from '@client/services/client/index.js';
import type { APIResponseType } from '@shared/types/common/index.js';
import { HTTPStatus } from '@shared/types/common/index.js';
import {
	setUserProfileImage,
	removeUserProfileImage,
} from '@/shared/redux/slices/image/imageSlice.js';

export const useImageHelper = () => {
	const dispatch = useAppDispatch();
	const image = useAppSelector((state) => state.image);

	const { profileImageUrl, profileImageKey } = image;

	const uploadProfileImage = async (file: File) => {
		try {
			const response = await clientApiServices.image.uploadImage(file);
			const result = response.data;

			console.log(result);

			if (result.success) {
				dispatch(
					setUserProfileImage({
						profileImageUrl: result.data?.imageUrl ?? null,
						profileImageKey: result.data?.imageKey ?? null,
					}),
				);
			}

			return result;
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

	const deleteUserProfileImage = async () => {
		try {
			if (!profileImageKey) {
				const fallback: APIResponseType<null> = {
					success: false,
					message: 'No profile image to delete.',
					statusCode: HTTPStatus.BAD_REQUEST,
					data: null,
				};

				return fallback;
			}

			const response =
				await clientApiServices.image.deleteImage(profileImageKey);

			const result = response.data;

			if (result.success) {
				dispatch(removeUserProfileImage());
			}

			return result;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.data) {
				return error.response.data;
			}

			const fallback: APIResponseType<null> = {
				success: false,
				message: 'Failed to delete image.',
				statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
				data: null,
			};

			return fallback;
		}
	};

	return {
		profileImageUrl,
		profileImageKey,
		uploadProfileImage,
		deleteUserProfileImage,
	};
};
