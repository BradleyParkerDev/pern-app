import { z } from 'zod';
import { UserSchema } from './userSchema.js';

// Registration fields extend the base `UserSchema`
// but add TWO passwords for validation
export const UserRegistrationSchema = UserSchema.extend({
	password: z.string().min(6, 'Must be at least 6 characters.'),
	confirmPassword: z.string().min(6, 'Must be at least 6 characters.'),
}).refine((data) => data.password === data.confirmPassword, {
	message: 'Passwords do not match',
	path: ['confirmPassword'], // Highlights confirmPassword in error messages
});
