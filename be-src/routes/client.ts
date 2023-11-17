import { Router } from 'express';
import ClientController from '../controllers/client';

const clientRouter = Router();

clientRouter.get('/', ClientController.getAll);
clientRouter.post('/', ClientController.createClient);

export default clientRouter;
