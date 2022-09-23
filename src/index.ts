import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import routes from './routes';
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config();

const app: Application = express();

const port = process.env.PORT || 3002;

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.use(routes);

// use the error middleware
app.use(errorMiddleware);

// start express server
app.listen(port, () => {
  console.log(`server currently listening on port ${port}`);
});

export default app;
