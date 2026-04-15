import { useEffect } from 'react';
import confetti from 'canvas-confetti';

type UseUIEffectHelperProps = {
	closeAvatarPopover: () => void;
};

export const useUIEffectHelper = ({
	closeAvatarPopover,
}: UseUIEffectHelperProps) => {
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 640) {
				closeAvatarPopover();
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [closeAvatarPopover]);

	const showConfettiEffect = () => {
		confetti({
			particleCount: 100,
			startVelocity: 30,
			spread: 360,
			origin: {
				x: Math.random(),
				y: Math.random() - 0.2,
			},
		});
	};

	return {
		showConfettiEffect,
	};
};
