import { Router } from 'express';
import { getServerStatus } from '../controllers/server-status';
import clientRouter from './client';

const mainRounter = Router();

mainRounter.get('/status', getServerStatus);

mainRounter.use('/clients', clientRouter);

mainRounter.get('*', (req, res) => {
	// NO ESTÁ CONFIGURADO BIEN ESTO!!!!!!!
	// SI RECARGAN LA PAG DEVUELVE CUALQUIER COSA
	res.send(__dirname);
});

export default mainRounter;