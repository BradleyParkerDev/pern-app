import { Card, CardContent } from '@client/components/shadcn/card.js';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@client/components/shadcn/avatar.js';
import { useUserUtility } from '@client/hooks/index.js';
import { useOutletContext } from 'react-router';
import { UIUtility } from '@/shared/types/client/hooks/UIUtility.js';

export function UserInfoCard() {
	const ui = useOutletContext<UIUtility>();
	const user = useUserUtility(ui);

	const {
		firstName,
		lastName,
		userName,
		emailAddress,
		// profileImageUrl,
	} = user ?? {};

	const initials = (firstName?.[0] ?? '') + (lastName?.[0] ?? '');

	return (
		<Card className="w-full max-w-xl">
			<CardContent className="flex flex-col items-center space-y-4 px-6 py-4">
				{/* Avatar + Username */}
				<div className="flex flex-col items-center space-y-2">
					<Avatar className="h-24 w-24 rounded-full">
						{/* <AvatarImage src={profileImageUrl} /> */}
						<AvatarFallback className="text-2xl font-semibold">
							{initials || 'U'}
						</AvatarFallback>
					</Avatar>

					<p className="text-muted-foreground text-base font-medium">
						@{userName}
					</p>
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
}
