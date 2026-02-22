import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserUtility, useUIUtility } from '@client/hooks/index.js';
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from '@client/components/shadcn/avatar.js';
import { Settings } from 'lucide-react';

const UserPage = () => {
	const user = useUserUtility();
	const ui = useUIUtility();
	useEffect(() => {
		document.title = `User | ${ui.appName}`;
	}, []);

	const { userName } = useParams<{ userName?: string }>();
	return (
		<div id="user-page" className={`flex h-full w-full justify-center`}>
			<div
				className={`border-foreground min-h-[120px] min-w-[100px] flex-col justify-start border-[.5px]`}
			>
				<Avatar className="h-[100px] w-[100px] rounded-lg">
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
				<p>@{user.userName}</p>
			</div>
		</div>
	);
};

export default UserPage;
