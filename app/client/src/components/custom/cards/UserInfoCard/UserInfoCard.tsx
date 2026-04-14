import { Card, CardContent } from '@client/components/shadcn/card.js';
import { Button } from '@client/components/shadcn/button.js';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@client/components/shadcn/avatar.js';
import { useUserUtility } from '@client/hooks/index.js';
import { useOutletContext } from 'react-router';
import { UIUtility } from '@/shared/types/client/hooks/UIUtility.js';

type UserInfoCardProps = React.ComponentProps<typeof Card> & {
	update?: boolean;
};

const UserInfoCard = ({ update = false, ...props }: UserInfoCardProps) => {
	const ui = useOutletContext<UIUtility>();
	const user = useUserUtility(ui);

	const {
		firstName,
		lastName,
		userName,
		emailAddress,
		// profileImageUrl,
	} = user ?? {};

	const userInitials =
		`${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.trim() ||
		user.userName?.[0]?.toUpperCase() ||
		'U';

	return (
		<Card className="w-full max-w-xl" {...props}>
			<CardContent className="flex flex-col items-center space-y-4 px-6 py-4">
				{/* Avatar + Username */}
				<div className="flex flex-col items-center space-y-2">
					<Avatar className="h-36 w-36 rounded-full">
						{/* <AvatarImage src={profileImageUrl} /> */}
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
							/>
							<Button
								type="button"
								variant="outline"
								className="text-sm font-semibold"
								onClick={() => {
									document
										.getElementById('profile-image-upload')
										?.click();
								}}
							>
								Upload Profile Image
							</Button>
						</div>
					)}
				</div>

				{/* User Info Fields */}
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
