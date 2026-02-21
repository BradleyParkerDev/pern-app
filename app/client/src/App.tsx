import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// infer the type from createBrowserRouter to keep it safe
export type AppRouter = ReturnType<typeof createBrowserRouter>;

interface AppProps {
	router: AppRouter;
}

export default function App({ router }: AppProps) {
	return <RouterProvider router={router} />;
}
