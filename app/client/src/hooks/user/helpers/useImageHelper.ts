import axios from 'axios';
import { clientApiServices } from '@client/services/client/index.js';
import type { APIResponseType } from '@shared/types/common/index.js';
import { HTTPStatus } from '@shared/types/common/index.js';

export const useImageHelper = () => {
	const uploadProfileImage = async (file: File) => {
		try {
			const response = await clientApiServices.image.uploadImage(file);
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

	return {
		uploadProfileImage,
	};
};
