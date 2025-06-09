import express from 'express';
import authRouter from './routes/auth';
import { authMiddleware } from './middleware/auth';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello from Express');
});

app.use('/auth', authRouter);

app.post('/reviews', authMiddleware, (req, res) => {
  res.json({ message: `Review submitted by ${req.user}` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
