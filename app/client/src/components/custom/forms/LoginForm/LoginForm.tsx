import { cn } from 'client/src/lib/utils.js';
import { Button } from 'client/src/components/shadcn/button.js';
import { Card, CardContent } from 'client/src/components/shadcn/card.js';
import { Input } from 'client/src/components/shadcn/input.js';
import { Label } from 'client/src/components/shadcn/label.js';
import { LoginSchema } from '@shared/zod/auth/loginSchema.js';
import { z } from 'zod';
import { type Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useUserUtility } from '@/client/src/hooks/index.js';

type LoginFormProps = React.ComponentPropsWithoutRef<'div'> & {
	toggleUserForms?: () => void;
};
export function LoginForm({
	toggleUserForms,
	className,
	...props
}: LoginFormProps) {
	type LoginFormValues = z.infer<typeof LoginSchema>;
	const user = useUserUtility();
	const {
		handleSubmit,
		register,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(LoginSchema) as Resolver<LoginFormValues>,
		defaultValues: {
			emailAddress: '',
			userName: '',
			password: '',
		},
	});

	const [passwordVisiblity, setPasswordVisiblity] = useState('password');
	const togglePasswordVisibility = () => {
		if (passwordVisiblity === 'text') {
			setPasswordVisiblity('password');
		} else {
			setPasswordVisiblity('text');
		}
	};
	const onSubmit = (loginCredentials: LoginFormValues) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		user.login(loginCredentials);
		console.log(loginCredentials);
	};

	const identifierValue = watch('emailAddress') ?? watch('userName') ?? '';
	const emailRegister = register('emailAddress');
	const userNameRegister = register('userName');

	return (
		<div className={cn(`w-full max-w-xl space-y-6`, className)} {...props}>
			<Card>
				<CardContent className="space-y-6">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="space-y-2">
							<Label
								htmlFor="identifier"
								className="text-base font-semibold"
							>
								Username or Email Address
							</Label>
							<input type="hidden" {...emailRegister} />
							<input type="hidden" {...userNameRegister} />
							<Input
								id="identifier"
								type="text"
								placeholder="myUserName123 or me@example.com"
								className="h-11"
								value={identifierValue}
								onChange={(event) => {
									const value = event.target.value;
									const looksLikeEmail = value.includes('@');
									setValue(
										'emailAddress',
										looksLikeEmail ? value : undefined,
										{
											shouldValidate: false,
											shouldDirty: true,
										},
									);
									setValue(
										'userName',
										looksLikeEmail ? undefined : value,
										{
											shouldValidate: false,
											shouldDirty: true,
										},
									);
								}}
								aria-invalid={
									!!errors.emailAddress || !!errors.userName
								}
							/>
							{(errors.emailAddress?.message ||
								errors.userName?.message) && (
								<p className="text-destructive text-sm">
									{errors.emailAddress?.message ||
										errors.userName?.message}
								</p>
							)}
						</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label
									htmlFor="password"
									className="text-base font-semibold"
								>
									Password
								</Label>
								<a
									href="#"
									className="text-primary ml-auto text-sm font-medium underline-offset-4 hover:underline"
								>
									Forgot password?
								</a>
							</div>
							<div className="relative">
								<Input
									id="password"
									type={passwordVisiblity}
									className="h-11 pr-12"
									{...register('password')}
									aria-invalid={!!errors.password}
								/>
								<button
									type="button"
									onClick={togglePasswordVisibility}
									className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 my-auto flex h-5 w-5 items-center justify-center"
									aria-label={
										passwordVisiblity === 'password'
											? 'Show password'
											: 'Hide password'
									}
								>
									{passwordVisiblity === 'password' ? (
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
						</div>
						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full rounded-lg py-3 text-base font-semibold"
						>
							Sign In
						</Button>
						<div
							onClick={toggleUserForms}
							className="mt-[-15px] text-center text-sm"
						>
							Don&apos;t have an account?{' '}
							<a
								href="#"
								className="underline underline-offset-4"
							>
								Sign Up
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
