import cors, { CorsOptions } from 'cors';
import express, { Application, Request, Response } from 'express';
import globalRoutes from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import cookieParser from 'cookie-parser';
import RedisRateLimiterHandler from './app/middlewares/rateLimiter';

const app: Application = express();
const rateLimiter = new RedisRateLimiterHandler();
rateLimiter.connect();
app.use(express.json());
app.use(rateLimiter.rateLimiter());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions: CorsOptions = {
  origin: ['https://apollo-assignment-09.vercel.app', 'http://localhost:3000'],
  // origin: 'https://apollo-assignment-09.vercel.app',
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// App Routes
app.use('/api', globalRoutes);

app.get('/', (_: Request, res: Response) => {
  res.send({ success: true, message: 'Server is UP and RUNNING' });
});

app.use(globalErrorHandler);

export default app;
