import { Button } from '@client/components/shadcn/button.js';
import { Card, CardContent } from '@client/components/shadcn/card.js';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@client/components/shadcn/field.js';
import { Input } from '@client/components/shadcn/input.js';
import { RegistrationSchema } from '@/shared/zod/user/registrationSchema.js';
import { z } from 'zod';
import { type Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { toast } from 'sonner';

type RegistrationFormProps = React.ComponentProps<typeof Card> & {
	toggleAuthPageForms?: () => void;
};

export function RegistrationForm({
	toggleAuthPageForms,
	...props
}: RegistrationFormProps) {
	const { user } = useOutletContext<AppOutletContext>();
	type RegistrationFormValues = z.infer<typeof RegistrationSchema>;

	const {
		handleSubmit,
		register,
		setValue,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<RegistrationFormValues>({
		resolver: zodResolver(
			RegistrationSchema,
		) as Resolver<RegistrationFormValues>,
		defaultValues: {
			emailAddress: '',
			userName: '',
			password: '',
			confirmPassword: '',
		},
	});

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
	const onSubmit = async (userRegistrationData: RegistrationFormValues) => {
		try {
			const result = await user.signUp(userRegistrationData);

			if (!result.success) {
				toast.error(result.message);
				return;
			}

			toast.success(result.message);
			toggleAuthPageForms?.();
			reset();
		} catch (error) {
			console.error('[SIGN UP ERROR]', error);
			toast.error('Something went wrong. Please try again.');
		}
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
								autoComplete="off"
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
								autoComplete="off"
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
											autoComplete="new-password"
											type={passwordVisiblity}
											className="pr-12"
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
									</div>
									{errors.password?.message && (
										<p className="text-destructive text-sm">
											{errors.password.message}
										</p>
									)}
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
											autoComplete="new-password"
											type={confirmPasswordVisiblity}
											className="pr-12"
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
									</div>
									{errors.confirmPassword?.message && (
										<p className="text-destructive text-sm">
											{errors.confirmPassword.message}
										</p>
									)}
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
									onClick={toggleAuthPageForms}
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
