import express from 'express';
import reviewsRouter from './routes/reviews';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/reviews', reviewsRouter);

app.get('/', (_req, res) => {
  res.send('Hello from Express');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
