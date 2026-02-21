import { RouteObject } from 'react-router-dom';
import { pages } from '@client/pages/index.js';

const {
	Layout,
	HomePage,
	AuthPage,
	UserPage,
	UserImagesPage,
	FriendPage,
	NewsPage,
	ChatPage,
	StorePage,
	SettingsPage,
} = pages;

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{ path: '/auth', element: <AuthPage /> },
			{ path: '/settings', element: <SettingsPage /> },
			{ path: '/user/:userName', element: <UserPage /> },
			{ path: '/chat', element: <ChatPage /> },
			{ path: '/images', element: <UserImagesPage /> },
			{ path: '/friends', element: <FriendPage /> },
			{ path: '/news', element: <NewsPage /> },
			{ path: '/store', element: <StorePage /> },
		],
	},
];
