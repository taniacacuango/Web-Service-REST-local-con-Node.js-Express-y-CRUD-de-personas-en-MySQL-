import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import personasRouter from './routes/personas.routes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/personas', personasRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  express.static(
    path.join(__dirname, '../public')
  )
);

export default app;