import * as dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './db';
import invoiceRoute from './invoice/invoice.routes';
import userRouter from './user/user.routes';
import loginRouter from './auth/login';

const PORT = parseInt(process.env.PORT!);

// Connect DB
connectDB();

const app = express();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// health check
app.get('/health-check', (req, res) => {
  res.send('Api is Ok');
});

app.use('/invoice', invoiceRoute);
app.use('/users', userRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => console.log(`Hi I'm running at PORT ${PORT}`));

process.on('unhandledRejection', (err) => {
  console.log(err);
});
