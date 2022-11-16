import express, { Request, Response } from 'express';
import errorMiddleware from './middleware/errorMiddleware';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('teste express+ts')
})

app.use(errorMiddleware)

export default app;