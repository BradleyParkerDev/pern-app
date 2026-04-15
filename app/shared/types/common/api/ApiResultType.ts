import type { APIStatusType } from './APIStatusType.js';

export type APIResultType<T = null> = {
	success: boolean;
	message: string;
	statusCode: number;
	data: T;
	status?: APIStatusType;
};
