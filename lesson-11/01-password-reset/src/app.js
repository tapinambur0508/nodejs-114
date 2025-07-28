import express from 'express';
// import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';

import { auth } from './middlewares/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

// app.use(
//   pino({
//     transport: {
//       target: 'pino-pretty',
//     },
//   }),
// );

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/students', auth, studentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
