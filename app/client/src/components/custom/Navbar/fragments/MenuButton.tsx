import { Menu } from 'lucide-react';
import { UIUtility } from '@shared/types/client/UIUtility.js';

type MenuButtonProps = {
	ui: UIUtility;
};

export const MenuButton = ({ ui }: MenuButtonProps) => {
	return (
		<button
			type="button"
			onClick={() => ui.toggleNavbarDrawer()}
			className="text-foreground hover:bg-foreground/10 focus-visible:outline-foreground/40 flex h-10 w-10 items-center justify-center rounded-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
			aria-label="Toggle navigation"
		>
			<Menu className="h-5 w-5" />
		</button>
	);
};
