import express from 'express';
import { auth } from './middleware/auth';
import { signUpValidation } from './middleware/signUpValidation';
import { accountInfo, login, signup } from './controllers/user.controller';
import { transactions, transfer } from './controllers/transactions.controller';
import { transferValidation } from './middleware/transferValidation';

const app = express();

app.use(express.json());

app.post('/login',login)

app.post('/signup',signUpValidation, signup)

app.post('/transfer',auth,transferValidation, transfer)

app.get('/accountInfo',auth, accountInfo)


app.get('/transactions',auth, transactions)


export default app;