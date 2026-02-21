import React from 'react';
import { Button } from '@client/components/shadcn/button.js';
import { Construction } from 'lucide-react';
import { UIUtility } from '@shared/types/client/UIUtility.js';

type PageUnderConstructionProps = {
	ui: UIUtility;
};

export const PageUnderContstruction = ({ ui }: PageUnderConstructionProps) => {
	return (
		<div className="flex min-h-[40vh] items-center justify-center p-[20px]">
			<div className="bg-foreground/5 border-foreground/10 text-foreground flex max-w-md flex-col items-center gap-3 rounded-2xl border px-6 py-8 text-center shadow-lg">
				<div className="border-foreground/30 flex h-12 w-12 items-center justify-center rounded-full border border-dashed text-lg font-bold">
					<Construction />
				</div>
				<h2 className="text-xl font-semibold">
					Page Under Construction
				</h2>
				<p className="text-muted-foreground text-sm">
					We are still building this experience. Check back soon for
					updates.
				</p>
				<Button
					onClick={() => {
						ui.navigateTo('/');
					}}
				>
					Return Home
				</Button>
			</div>
		</div>
	);
};
