import { Button } from '@client/components/shadcn/button.js';
import { Card, CardContent } from '@client/components/shadcn/card.js';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@client/components/shadcn/field.js';
import { Input } from '@client/components/shadcn/input.js';
import { UpdateUserDataSchema } from '@shared/zod/user/updateUserDataSchema.js';
import { z } from 'zod';
import { type Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserUtility } from '@/client/src/hooks/index.js';
import { useOutletContext } from 'react-router';
import { UIUtility } from '@/shared/types/client/hooks/UIUtility.js';

type UpdateUserFormProps = React.ComponentProps<typeof Card> & {
	toggleUserForms?: () => void;
};

export function UpdateUserForm({
	toggleUserForms,
	...props
}: UpdateUserFormProps) {
	type UpdateUserFormValues = z.infer<typeof UpdateUserDataSchema>;

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<UpdateUserFormValues>({
		resolver: zodResolver(
			UpdateUserDataSchema,
		) as Resolver<UpdateUserFormValues>,
		defaultValues: {
			firstName: '',
			lastName: '',
			emailAddress: '',
			userName: '',
		},
	});

	const ui = useOutletContext<UIUtility>();
	const user = useUserUtility(ui);

	const onSubmit = (userUpdateData: UpdateUserFormValues) => {
		user.update(userUpdateData);
		console.log(userUpdateData);
		reset();
	};

	return (
		<Card className="w-full max-w-xl" {...props}>
			<CardContent className="space-y-6">
				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup className="">
						<div
							id="name-fields"
							className="w-full space-y-6 sm:flex sm:gap-[10px] sm:space-y-0"
						>
							<div id="first-name-field" className="sm:w-[50%]">
								<Field>
									<FieldLabel
										htmlFor="first-name"
										className="text-base font-semibold"
									>
										First Name
									</FieldLabel>
									<Input
										id="first-name"
										type="text"
										placeholder="John"
										{...register('firstName')}
										aria-invalid={!!errors.firstName}
									/>
									{errors.firstName?.message && (
										<p className="text-destructive text-sm">
											{errors.firstName.message}
										</p>
									)}
								</Field>
							</div>

							<div id="last-name-field" className="sm:w-[50%]">
								<Field>
									<FieldLabel
										htmlFor="last-name"
										className="text-base font-semibold"
									>
										Last Name
									</FieldLabel>
									<Input
										id="last-name"
										type="text"
										placeholder="Doe"
										{...register('lastName')}
										aria-invalid={!!errors.lastName}
									/>
									{errors.lastName?.message && (
										<p className="text-destructive text-sm">
											{errors.lastName.message}
										</p>
									)}
								</Field>
							</div>
						</div>

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

						<FieldGroup>
							<Field>
								<Button
									type="submit"
									className="text-base font-semibold sm:-mt-2"
									disabled={isSubmitting}
								>
									Update User
								</Button>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
