import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UserState } from '@shared/types/server/redux/index.js';

const initialState: UserState = {
	firstName: '',
	lastName: '',
	emailAddress: '',
	userName: '',
};

// Create the slice
export const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (
			state,
			action: PayloadAction<{ userData: Partial<UserState> }>,
		) => {
			console.log(action.payload.userData);
			const { firstName, lastName, emailAddress, userName } =
				action.payload.userData;
			if (firstName !== undefined) state.firstName = firstName;
			if (lastName !== undefined) state.lastName = lastName;
			if (emailAddress !== undefined) state.emailAddress = emailAddress;
			if (userName !== undefined) state.userName = userName;
		},
		resetUser: () => initialState,
	},
});

export const { setUser, resetUser } = usersSlice.actions;

export default usersSlice.reducer;
