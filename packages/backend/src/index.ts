import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 