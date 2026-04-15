import { Button } from '@client/components/shadcn/button.js';
import { Card, CardContent } from '@client/components/shadcn/card.js';
import {
	Field,
	FieldGroup,
	FieldLabel,
} from '@client/components/shadcn/field.js';
import { Input } from '@client/components/shadcn/input.js';
import { DeleteUserDataSchema } from '@shared/zod/user/deleteUserDataSchema.js';
import { z } from 'zod';
import { type Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { toast } from 'sonner';

type DeleteUserDataFormProps = {
	embedded?: boolean;
};

export function DeleteUserDataForm({
	embedded = false,
}: DeleteUserDataFormProps) {
	const { user } = useOutletContext<AppOutletContext>();

	type DeleteUserFormValues = z.input<typeof DeleteUserDataSchema>;

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<DeleteUserFormValues>({
		resolver: zodResolver(
			DeleteUserDataSchema,
		) as Resolver<DeleteUserFormValues>,
		defaultValues: {
			confirmation: '',
		},
	});

	const onSubmit = async (userDeletionConfirmation: DeleteUserFormValues) => {
		const result = await user.deleteUserAccount(userDeletionConfirmation);

		if (result.success) {
			toast.success('User account deleted.');
			reset();
		} else {
			toast.error(result.message);
		}
	};

	const formContent = (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FieldGroup className="space-y-2">
				<Field>
					<FieldLabel
						htmlFor="confirmation"
						className="text-base font-semibold"
					>
						Type Confirmation
					</FieldLabel>
					<Input
						id="confirmation"
						type="text"
						placeholder='"permanently delete"'
						autoComplete="off"
						{...register('confirmation')}
						aria-invalid={!!errors.confirmation}
					/>
					{errors.confirmation?.message && (
						<p className="text-destructive text-sm">
							{errors.confirmation.message}
						</p>
					)}
				</Field>

				<Button
					type="submit"
					className="-mt-[15px] w-full text-base font-semibold"
					disabled={isSubmitting}
				>
					Delete User Account
				</Button>
			</FieldGroup>
		</form>
	);

	if (embedded) {
		return formContent;
	}

	return (
		<Card className="w-full max-w-xl">
			<CardContent className="space-y-6">{formContent}</CardContent>
		</Card>
	);
}
