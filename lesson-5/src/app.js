import express from 'express';
import pino from 'pino-http';

import studentRoutes from './routes/students.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use('/students', studentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
