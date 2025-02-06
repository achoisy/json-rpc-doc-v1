import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'healthy' });
});

export default app;
