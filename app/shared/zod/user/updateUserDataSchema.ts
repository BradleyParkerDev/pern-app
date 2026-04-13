import { z } from 'zod';

const optionalTrimmedString = (schema: z.ZodString) =>
	z.preprocess((value) => {
		if (typeof value !== 'string') {
			return value;
		}

		const trimmedValue = value.trim();
		return trimmedValue === '' ? undefined : trimmedValue;
	}, schema.optional());

export const UpdateUserDataSchema = z.object({
	firstName: optionalTrimmedString(z.string().min(1)),
	lastName: optionalTrimmedString(z.string().min(1)),
	emailAddress: optionalTrimmedString(z.string().email()),
	userName: optionalTrimmedString(z.string().min(3)),
});
