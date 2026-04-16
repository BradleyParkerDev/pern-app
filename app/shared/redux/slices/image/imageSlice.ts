import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ImageState } from '@/shared/types/common/redux/index.js';

const initialState: ImageState = {
	profileImageUrl: null,
};

export const imageSlice = createSlice({
	name: 'image',
	initialState,
	reducers: {
		setUserProfileImage: (
			state,
			action: PayloadAction<{ profileImageUrl: string | null }>,
		) => {
			console.log(action.payload.profileImageUrl);
			state.profileImageUrl = action.payload.profileImageUrl;
		},
		removeUserProfileImage: () => initialState,
	},
});

export const { setUserProfileImage, removeUserProfileImage } =
	imageSlice.actions;

export default imageSlice.reducer;
