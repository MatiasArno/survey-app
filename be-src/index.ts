import express from 'express';
import clientRouter from './routes/clients';
import cors from 'cors';

const app = express();
const PORT = Number(process.env.PORT) ?? 45009;

// ----------------------- MIDDLEWARES ----------------------- //

app.use(express.json());
app.use(cors());

// ------------------------- ROUTING ------------------------- //

app.use('/api/clients', clientRouter);

app.get('/api/status', (req, res) => {
	res.status(200).json({
		message: 'REST API for human data collecting',
		environment: process.env.ENVIRONMENT,
		running: true,
	});
});

app.use(express.static('dist'));
app.get('*', (req, res) => {
	res.send(__dirname);
});

// ------------------------- SERVER ------------------------- //

app.listen(PORT, () => {
	console.log('Server listening on port', PORT);
});
