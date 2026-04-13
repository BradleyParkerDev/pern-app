export type DeleteUserDataType = {
	userId: string;
	confirmation: string;
};

export type DeleteUserResult =
	| {
			success: true;
			deletedUser: any; // replace with your User type if you have one
	  }
	| {
			success: false;
			reason: 'missing_user_id' | 'missing_confirmation' | 'not_found';
			message: string;
	  };
