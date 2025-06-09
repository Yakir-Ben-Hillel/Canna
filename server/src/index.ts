import express from 'express';
import dispensaryRouter from './routes/dispensaries';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello from Express');
});

app.use('/dispensaries', dispensaryRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
