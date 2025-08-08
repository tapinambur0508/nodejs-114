import * as fs from 'node:fs';
import path from 'node:path';

import cors from 'cors';
import express from 'express';
// import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';

import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';

import { auth } from './middlewares/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const SWAGGER_DOCUMENT = JSON.parse(
  fs.readFileSync(path.join('docs', 'swagger.json'), 'utf-8'),
);

const app = express();

// app.use(
//   pino({
//     transport: {
//       target: 'pino-pretty',
//     },
//   }),
// );

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCUMENT));

app.use('/avatars', express.static(path.resolve('src/uploads/avatars')));

app.use('/auth', authRoutes);
app.use('/students', auth, studentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
