import api from '@shared/axios/index.js';

export const deleteImage = (imageKey: string | null) => {
	if (!imageKey) {
		throw new Error('Image key is required.');
	}

	return api.delete('/image/delete-image', {
		data: { imageKey },
	});
};
