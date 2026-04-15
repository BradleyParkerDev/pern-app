import { Button } from '@client/components/shadcn/button.js';
import { Card, CardContent } from '@client/components/shadcn/card.js';
import {
	Field,
	FieldGroup,
	FieldLabel,
} from '@client/components/shadcn/field.js';
import { Input } from '@client/components/shadcn/input.js';
import { UpdateUserPasswordSchema } from '@shared/zod/user/updateUserPasswordSchema.js';
import { z } from 'zod';
import { type Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { toast } from 'sonner';

export function UpdateUserPasswordForm({ ...props }) {
	const { user } = useOutletContext<AppOutletContext>();
	type FormValues = z.infer<typeof UpdateUserPasswordSchema>;

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: zodResolver(UpdateUserPasswordSchema) as Resolver<FormValues>,
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmedNewPassword: '',
		},
	});

	const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState<
		'password' | 'text'
	>('password');
	const [newPasswordVisibility, setNewPasswordVisibility] = useState<
		'password' | 'text'
	>('password');
	const [confirmedNewPasswordVisibility, setConfirmedNewPasswordVisibility] =
		useState<'password' | 'text'>('password');

	const togglePasswordVisibility = (type: 'current' | 'new' | 'confirm') => {
		if (type === 'current') {
			setCurrentPasswordVisibility((prev) =>
				prev === 'password' ? 'text' : 'password',
			);
		} else if (type === 'new') {
			setNewPasswordVisibility((prev) =>
				prev === 'password' ? 'text' : 'password',
			);
		} else {
			setConfirmedNewPasswordVisibility((prev) =>
				prev === 'password' ? 'text' : 'password',
			);
		}
	};

	const onSubmit = async (userUpdateData: FormValues) => {
		try {
			const result = await user.update(userUpdateData);

			if (result.success) {
				toast.message(result.message);
				reset();
				setCurrentPasswordVisibility('password');
				setNewPasswordVisibility('password');
				setConfirmedNewPasswordVisibility('password');
			} else {
				toast.error(result.message);
			}
		} catch (error) {
			console.error(error);

			toast.error('Something went wrong. Please try again.');
		}
	};

	return (
		<Card className="w-full max-w-xl" {...props}>
			<CardContent className="space-y-2">
				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup className="gap-3">
						<Field>
							<FieldLabel className="text-base font-semibold">
								Current Password
							</FieldLabel>
							<div className="relative">
								<Input
									type={currentPasswordVisibility}
									autoComplete="current-password"
									{...register('currentPassword')}
								/>
								<button
									type="button"
									onClick={() =>
										togglePasswordVisibility('current')
									}
									className="absolute inset-y-0 right-3 flex items-center"
									aria-label={
										currentPasswordVisibility === 'password'
											? 'Show current password'
											: 'Hide current password'
									}
								>
									{currentPasswordVisibility ===
									'password' ? (
										<Eye className="h-4 w-4" />
									) : (
										<EyeOff className="h-4 w-4" />
									)}
								</button>
							</div>
							{errors.currentPassword && (
								<p className="text-destructive text-sm">
									{errors.currentPassword.message}
								</p>
							)}
						</Field>

						<Field>
							<FieldLabel className="text-base font-semibold">
								New Password
							</FieldLabel>
							<div className="relative">
								<Input
									type={newPasswordVisibility}
									autoComplete="new-password"
									{...register('newPassword')}
								/>
								<button
									type="button"
									onClick={() =>
										togglePasswordVisibility('new')
									}
									className="absolute inset-y-0 right-3 flex items-center"
									aria-label={
										newPasswordVisibility === 'password'
											? 'Show new password'
											: 'Hide new password'
									}
								>
									{newPasswordVisibility === 'password' ? (
										<Eye className="h-4 w-4" />
									) : (
										<EyeOff className="h-4 w-4" />
									)}
								</button>
							</div>
							{errors.newPassword && (
								<p className="text-destructive text-sm">
									{errors.newPassword.message}
								</p>
							)}
						</Field>

						<Field>
							<FieldLabel className="text-base font-semibold">
								Confirm New Password
							</FieldLabel>
							<div className="relative">
								<Input
									type={confirmedNewPasswordVisibility}
									autoComplete="new-password"
									{...register('confirmedNewPassword')}
								/>
								<button
									type="button"
									onClick={() =>
										togglePasswordVisibility('confirm')
									}
									className="absolute inset-y-0 right-3 flex items-center"
									aria-label={
										confirmedNewPasswordVisibility ===
										'password'
											? 'Show confirm new password'
											: 'Hide confirm new password'
									}
								>
									{confirmedNewPasswordVisibility ===
									'password' ? (
										<Eye className="h-4 w-4" />
									) : (
										<EyeOff className="h-4 w-4" />
									)}
								</button>
							</div>
							{errors.confirmedNewPassword && (
								<p className="text-destructive text-sm">
									{errors.confirmedNewPassword.message}
								</p>
							)}
						</Field>

						<Button
							type="submit"
							className="mt-3 text-base font-semibold sm:mt-4"
							disabled={isSubmitting}
						>
							Update Password
						</Button>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
