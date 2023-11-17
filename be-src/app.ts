import express, { json } from 'express';
import mainRounter from './routes';

const app = express();

app.use(json());

app.use('/api', mainRounter);

app.use(express.static('dist'));

export default app;