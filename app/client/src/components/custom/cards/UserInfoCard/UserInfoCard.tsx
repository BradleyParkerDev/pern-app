// export default UserInfoCard;
import { Card, CardContent } from '@client/components/shadcn/card.js';
import { Button } from '@client/components/shadcn/button.js';
import { Avatar, AvatarFallback, AvatarImage } from './fragments/avatar.js';
import { useOutletContext } from 'react-router';
import {} from '@shared/types/client/hooks/index.js';
import { toast } from 'sonner';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';

type UserInfoCardProps = React.ComponentProps<typeof Card> & {
	update?: boolean;
};

const UserInfoCard = ({ update = false, ...props }: UserInfoCardProps) => {
	const { ui, auth, user } = useOutletContext<AppOutletContext>();

	const { firstName, lastName, userName, emailAddress } = user ?? {};

	const userInitials =
		`${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.trim() ||
		user.userName?.[0]?.toUpperCase() ||
		'U';

	const handleProfileImageChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];

		if (!file) return;

		const result = await user.uploadProfileImage(file);
		if (result.success) {
			toast.success(result.message || 'Profile image uploaded');
		} else {
			toast.error(result.message || 'Failed to upload image');
		}
		console.log(result);

		event.target.value = '';
	};

	const handleProfileImageDelete = async () => {
		try {
			const result = await user.deleteUserProfileImage();

			if (result.success) {
				toast.success(result.message || 'Profile image deleted');
			} else {
				toast.error(result.message || 'Failed to delete image');
			}
		} catch (error) {
			console.error(error);
			toast.error('Something went wrong while deleting');
		}
	};

	return (
		<Card className="w-full max-w-xl" {...props}>
			<CardContent className="flex flex-col items-center space-y-4 px-6 py-4">
				<div className="flex flex-col items-center space-y-2">
					<Avatar className="h-36 w-36 rounded-full">
						<AvatarImage
							src={user.profileImageUrl || undefined}
							className="h-full w-full object-cover object-top"
						/>
						<AvatarFallback className="text-2xl font-semibold">
							{userInitials.toUpperCase()}
						</AvatarFallback>
					</Avatar>

					<p className="text-muted-foreground text-base font-medium">
						@{userName}
					</p>

					{update && (
						<div className="pt-1">
							<input
								id="profile-image-upload"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleProfileImageChange}
							/>
							<div className="flex flex-col">
								<Button
									type="button"
									variant="outline"
									className="text-sm font-semibold"
									onClick={() => {
										document
											.getElementById(
												'profile-image-upload',
											)
											?.click();
									}}
								>
									Upload Profile Image
								</Button>
								<Button
									type="button"
									variant="outline"
									className="border-destructive/35 bg-destructive/[0.04] text-destructive hover:border-destructive/45 hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/30 mt-[10px] text-sm font-semibold"
									onClick={handleProfileImageDelete}
								>
									Delete Profile Image
								</Button>
							</div>
						</div>
					)}
				</div>

				<div className="w-full space-y-3">
					<div>
						<p className="text-muted-foreground text-xs font-semibold">
							First Name
						</p>
						<p className="text-base">{firstName || '-'}</p>
					</div>

					<div>
						<p className="text-muted-foreground text-xs font-semibold">
							Last Name
						</p>
						<p className="text-base">{lastName || '-'}</p>
					</div>

					<div>
						<p className="text-muted-foreground text-xs font-semibold">
							Email Address
						</p>
						<p className="text-base">{emailAddress || '-'}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default UserInfoCard;
