import { useState, useEffect } from 'react';
import { Button } from '@client/components/shadcn/button.js';
import { useUIUtility } from '@client/hooks/index.js';

const HomePage = () => {
	const ui = useUIUtility();
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `Home | ${ui.appName}`;
	}, []);

	const handleCount = (action: string) => {
		if (count >= 0 && action === 'increase') {
			setCount(count + 1);
		} else if (count > 0 && action === 'decrease') {
			setCount(count - 1);
		}
	};

	// Use public URL for the image so SSR/Node doesn't try to import a binary.
	const react = '/assets/react-logo.svg';
	const softBounceStyle = {
		animation: 'softBounce 3s ease-in-out infinite',
	};

	return (
		<div
			onClick={() => {
				ui.closeAvatarPopoverWithRedux();
			}}
			id="home-page"
			className="flex h-full w-full justify-center"
		>
			<style>
				{`
					@keyframes softBounce {
						0%, 100% { transform: translateY(0); }
						50% { transform: translateY(-6px); }
					}
				`}
			</style>
			<div className="mt-5 min-w-[300px]">
				<p className="flex justify-center text-[16px] font-semibold sm:text-[28px]">
					Express + React
				</p>
				<div className="flex w-full justify-center">
					<img
						style={softBounceStyle}
						className={`flex h-[200px] justify-center motion-safe:animate-none sm:h-[400px]`}
						src={react}
						alt="react logo"
						onClick={() => {
							ui.showConfettiEffect();
						}}
					/>
				</div>

				<div className="flex w-full justify-evenly">
					<Button
						onClick={() => {
							handleCount('decrease');
						}}
						className={``}
					>
						Decrease
					</Button>
					<p className={`text-[16px] font-semibold`}>{count}</p>
					<Button
						onClick={() => {
							handleCount('increase');
						}}
					>
						Increase
					</Button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
