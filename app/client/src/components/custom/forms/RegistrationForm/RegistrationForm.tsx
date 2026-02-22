import { Button } from '@client/components/shadcn/button.js';
import { Card, CardContent } from '@client/components/shadcn/card.js';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@client/components/shadcn/field.js';
import { Input } from '@client/components/shadcn/input.js';
import { UserRegistrationSchema } from '@shared/zod/user/userRegistrationSchema.js';
import { z } from 'zod';
import { type Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useUserUtility } from '@/client/src/hooks/index.js';

type RegistrationFormProps = React.ComponentProps<typeof Card> & {
	toggleUserForms?: () => void;
};

export function RegistrationForm({
	toggleUserForms,
	...props
}: RegistrationFormProps) {
	type RegistrationFormValues = z.infer<typeof UserRegistrationSchema>;

	const {
		handleSubmit,
		register,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<RegistrationFormValues>({
		resolver: zodResolver(
			UserRegistrationSchema,
		) as Resolver<RegistrationFormValues>,
		defaultValues: {
			emailAddress: '',
			userName: '',
			password: '',
			confirmPassword: '',
		},
	});

	const user = useUserUtility();

	const [passwordVisiblity, setPasswordVisiblity] = useState('password');
	const [confirmPasswordVisiblity, setConfirmPasswordVisiblity] =
		useState('password');

	const togglePasswordVisibility = (passwordType?: string) => {
		if (passwordType === 'confirm') {
			if (confirmPasswordVisiblity === 'text') {
				setConfirmPasswordVisiblity('password');
			} else {
				setConfirmPasswordVisiblity('text');
			}
		} else {
			if (passwordVisiblity === 'text') {
				setPasswordVisiblity('password');
			} else {
				setPasswordVisiblity('text');
			}
		}
	};
	const onSubmit = (userRegistrationData: RegistrationFormValues) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		user.signUp(userRegistrationData);
		console.log(userRegistrationData);
	};
	return (
		<Card className="w-full max-w-xl" {...props}>
			<CardContent className="space-y-6">
				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup className="">
						<Field>
							<FieldLabel
								htmlFor="username"
								className="text-base font-semibold"
							>
								Username
							</FieldLabel>
							<Input
								id="username"
								type="text"
								placeholder="myUserName123"
								{...register('userName')}
								aria-invalid={!!errors.userName}
							/>
							{errors.userName?.message && (
								<p className="text-destructive text-sm">
									{errors.userName.message}
								</p>
							)}
						</Field>
						<Field>
							<FieldLabel
								htmlFor="email-address"
								className="text-base font-semibold"
							>
								Email Address
							</FieldLabel>
							<Input
								id="email-address"
								type="email"
								placeholder="me@example.com"
								{...register('emailAddress')}
								aria-invalid={!!errors.emailAddress}
							/>
							{errors.emailAddress?.message && (
								<p className="text-destructive text-sm">
									{errors.emailAddress.message}
								</p>
							)}
						</Field>

						<div
							id="password-fields"
							className="w-[full] space-y-6 sm:flex"
						>
							<div
								id="password-field-one"
								className="sm:mr-[5px] sm:w-[50%]"
							>
								<Field>
									<FieldLabel
										htmlFor="password"
										className="text-base font-semibold"
									>
										Password
									</FieldLabel>
									<div className="relative">
										<Input
											id="password"
											type={passwordVisiblity}
											{...register('password')}
											aria-invalid={!!errors.password}
										/>
										<button
											type="button"
											onClick={() => {
												togglePasswordVisibility();
											}}
											className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 my-auto flex h-5 w-5 items-center justify-center"
											aria-label={
												passwordVisiblity === 'password'
													? 'Show password'
													: 'Hide password'
											}
										>
											{passwordVisiblity ===
											'password' ? (
												<Eye className="h-4 w-4" />
											) : (
												<EyeOff className="h-4 w-4" />
											)}
										</button>
										{errors.password?.message && (
											<p className="text-destructive text-sm">
												{errors.password.message}
											</p>
										)}
									</div>
								</Field>
							</div>
							<div
								id="password-field-two"
								className="sm:ml-[5px] sm:w-[50%]"
							>
								<Field>
									<FieldLabel
										htmlFor="confirm-password"
										className="text-base font-semibold"
									>
										Confirm Password
									</FieldLabel>
									<div className="relative">
										<Input
											id="confirm-password"
											type={confirmPasswordVisiblity}
											{...register('confirmPassword')}
											aria-invalid={
												!!errors.confirmPassword
											}
										/>
										<button
											type="button"
											onClick={() => {
												togglePasswordVisibility(
													'confirm',
												);
											}}
											className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 my-auto flex h-5 w-5 items-center justify-center"
											aria-label={
												confirmPasswordVisiblity ===
												'password'
													? 'Show password'
													: 'Hide password'
											}
										>
											{confirmPasswordVisiblity ===
											'password' ? (
												<Eye className="h-4 w-4" />
											) : (
												<EyeOff className="h-4 w-4" />
											)}
										</button>
										{errors.confirmPassword?.message && (
											<p className="text-destructive text-sm">
												{errors.confirmPassword.message}
											</p>
										)}
									</div>
								</Field>
							</div>
						</div>
						<FieldGroup>
							<Field>
								<Button
									type="submit"
									className="text-base font-semibold sm:-mt-5"
								>
									Sign Up
								</Button>
								<FieldDescription
									onClick={toggleUserForms}
									className="text-foreground mt-[5px] text-center text-sm"
								>
									Already have an account?{' '}
									<a href="#">Sign In</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
