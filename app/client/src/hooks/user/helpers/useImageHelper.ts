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
						profileImageUrl: result.data?.url ?? null,
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
		if (!profileImageKey) {
			return {
				success: false as const,
				message: 'No profile image to delete.',
			};
		}

		const response =
			await clientApiServices.image.deleteImage(profileImageKey);

		return response.data;
	};

	return {
		profileImageUrl,
		uploadProfileImage,
		deleteUserProfileImage,
	};
};
