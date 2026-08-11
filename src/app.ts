import express from 'express';
import taskRouter from './routes/tasksRoute.js';
import { requestLogger } from './middleWare/requestLogging.js';
import { type Request, type Response } from 'express';
import { notFoundHandler } from './middleWare/notFoundHandling.js';
import { errorHandler } from './middleWare/errorHandling.js';
const app = express();
app.use(express.json());

app.use(requestLogger);
app.use('/tasks', taskRouter);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ response: 'Ok' });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
