import express from 'express';
// import pino from 'pino-http';

import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// app.use(
//   pino({
//     transport: {
//       target: 'pino-pretty',
//     },
//   }),
// );

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
