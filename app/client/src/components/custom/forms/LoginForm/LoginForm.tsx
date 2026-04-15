import { cn } from '@client/lib/utils.js';
import { Button } from '@client/components/shadcn/button.js';
import { Card, CardContent } from '@client/components/shadcn/card.js';
import { Input } from '@client/components/shadcn/input.js';
import { Label } from '@client/components/shadcn/label.js';
import { LoginSchema } from '@shared/zod/auth/loginSchema.js';
import { z } from 'zod';
import { type Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { toast } from 'sonner';

type LoginFormProps = React.ComponentPropsWithoutRef<'div'> & {
	toggleAuthPageForms?: () => void;
};
export function LoginForm({
	toggleAuthPageForms,
	className,
	...props
}: LoginFormProps) {
	const { user } = useOutletContext<AppOutletContext>();

	type LoginFormValues = z.infer<typeof LoginSchema>;
	const {
		handleSubmit,
		register,
		setValue,
		watch,
		reset,
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
	const onSubmit = async (loginCredentials: LoginFormValues) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		const result = await user.login(loginCredentials);
		console.log(loginCredentials);

		if (result.success) {
			toast.success('User successfully logged in!');
			toggleAuthPageForms?.();
			reset();
		} else {
			toast.error(result.message);
		}
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
								autoComplete="off"
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
									autoComplete="current-password"
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
							onClick={toggleAuthPageForms}
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
