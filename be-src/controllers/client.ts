import { Request, Response } from 'express';
import ClientModel from '../models/client';

abstract class ClientController {
	static async getAll(req: Request, res: Response) {
		const result = await ClientModel.getAll();
		return res.json(result);
	}

	static async createClient(req: Request, res: Response) {
		const { name, email, cellphone, company, interests, channels } =
			req.body;

		if (!name || !email || !cellphone || !company)
			return { error: 'Basic fields are required' };

		const newClient = await ClientModel.createNew({
			name,
			email,
			cellphone,
			company,
			interests,
			channels,
		});

		if(newClient.error) return res.status(500).json(newClient);
		return res.status(201).json(newClient);
	}
}

export default ClientController;
