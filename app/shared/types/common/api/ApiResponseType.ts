export type APIResponseType<T = null> = {
	success: boolean;
	message: string;
	statusCode: number;
	data: T;
};
