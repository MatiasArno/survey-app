import { Request, Response } from "express";

export const getServerStatus = (req: Request, res: Response) => {
    return res.status(200).json({
		message: 'REST API for human data collecting',
		environment: process.env.ENVIRONMENT,
		running: true,
	});
}