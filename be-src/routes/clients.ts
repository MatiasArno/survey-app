import { Router } from 'express';
import ClientController from '../controllers/clients';

const clientRouter = Router();

clientRouter.get('/', async (req, res) => {
	const clientsData = await ClientController.getAll();
	return res.status(200).json(clientsData);
});

clientRouter.post('/', async (req, res) => {
	const result = await ClientController.createClient(req.body);

	if (result.error) return res.status(400).json({ message: result.error });
    if (result instanceof Error) return res.status(500).json({ message: 'Error occurred when writting data to the database'});

	return res.status(201).json(result);
});

export default clientRouter;
