import app from './app';

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server running on port ${PORT}`);
});
