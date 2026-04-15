import React from 'react';
import { Button } from '@client/components/shadcn/button.js';
import { UIUtility } from '@/shared/types/client/hooks/UIUtility.js';

type StatusCardProps = {
	ui: UIUtility;
	icon?: React.ReactNode;
	title: string;
	description: string;
	buttonText?: string;
	redirectTo?: string;
};

export const StatusCard = ({
	ui,
	icon,
	title,
	description,
	buttonText = 'Return Home',
	redirectTo = '/',
}: StatusCardProps) => {
	return (
		<div className="flex min-h-[40vh] items-center justify-center p-[20px]">
			<div className="bg-foreground/5 border-foreground/10 text-foreground flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border px-6 py-8 text-center shadow-lg">
				{icon && (
					<div className="border-foreground/30 flex h-12 w-12 items-center justify-center rounded-full border border-dashed text-lg font-bold">
						{icon}
					</div>
				)}

				<h2 className="text-xl font-semibold">{title}</h2>

				<p className="text-muted-foreground text-sm">{description}</p>

				<Button
					onClick={() => {
						ui.navigateTo(redirectTo);
					}}
				>
					{buttonText}
				</Button>
			</div>
		</div>
	);
};
