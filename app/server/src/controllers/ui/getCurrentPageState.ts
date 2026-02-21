import { Request, Response } from 'express';

const getCurrentPageState = async (req: Request, res: Response) => {
	const path = req.query.path;

	const message = `User wants data from this path: ${path}`;
	try {
		await new Promise((resolve) => setTimeout(resolve, 5000));
		res.send({
			success: 'true',
			pageState: {
				message: message,
			},
			pageLoading: false,
		});
	} catch (err) {
		console.error(err);
	}
};

export default getCurrentPageState;
