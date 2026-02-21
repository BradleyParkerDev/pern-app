import { AuthUtility } from '@shared/types/client/AuthUtility.js';
import { UIUtility } from '@shared/types/client/UIUtility.js';
import { UserUtility } from '@shared/types/client/UserUtility.js';

import { BarFragment } from './fragments/index.js';

type NavbarProps = {
	ui: UIUtility;
	auth: AuthUtility;
	user: UserUtility;
};

const Navbar = ({ ui, auth, user }: NavbarProps) => {
	return (
		<div id="navbar" className={`sticky top-0 left-0 z-100`}>
			<BarFragment ui={ui} auth={auth} user={user} />
		</div>
	);
};

export default Navbar;
