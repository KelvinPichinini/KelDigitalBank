import express, { Request, Response } from 'express';
import Account from './database/models/account';
import Transaction from './database/models/transaction';
import User from './database/models/user';
import errorMiddleware from './middleware/errorMiddleware';

const app = express();

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  return res.status(200).send(' DB MODELADO!');
})

app.use(errorMiddleware)

export default app;