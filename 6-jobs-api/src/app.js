import express from 'express';
import 'express-async-errors';
import authRouter from './routes/auth.routes.js';
import jobsRouter from './routes/jobs.routes.js';
import usersRouter from './routes/users.routes.js';
import { errorHandler, notFound } from './middlewares/errors.middlewares.js';
import morgan from 'morgan';
import { verifyToken } from './middlewares/auth.middlewares.js';
import { errors as celebrateErrorHandler } from 'celebrate';
import { basePath } from './utils/path.utils.js';
import swaggerUi from 'swagger-ui-express';
import { readJson } from 'fs-extra/esm';
const swaggerDocument = await readJson(basePath('./openapi/openapi.json'));

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', verifyToken, jobsRouter);
app.use('/api/v1/users', verifyToken, usersRouter);

app.use(notFound);
app.use(celebrateErrorHandler());
app.use(errorHandler);

export { app };
