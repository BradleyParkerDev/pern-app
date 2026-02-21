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
		setUser: (state, action: PayloadAction<{ userData: UserState }>) => {
			const { firstName, lastName, emailAddress, userName } =
				action.payload.userData;
			state.firstName = firstName;
			state.lastName = lastName;
			state.emailAddress = emailAddress;
			state.userName = userName;
		},
		resetUser: () => initialState,
	},
});

export const { setUser, resetUser } = usersSlice.actions;

export default usersSlice.reducer;
