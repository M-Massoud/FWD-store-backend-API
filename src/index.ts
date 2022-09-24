import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes';
import errorMiddleware from './middlewares/errorMiddleware';
import database from './database';

const app: Application = express();

const port = process.env.PORT || 3002;

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.use(routes);

// use the error middleware
app.use(errorMiddleware);

// connect to database
database.connect().then((client) => {
  return client
    .query('SELECT now()')
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err: Error) => {
      client.release();
      console.log(err);
    });
});

// start express server
app.listen(port, () => {
  console.log(`server currently listening on port ${port}`);
});

export default app;
