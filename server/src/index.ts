import express from 'express';
import authRouter from './routes/auth';
import { authMiddleware } from './middleware/auth';
import prisma from '../models';
import strainRoutes from './routes/strains';
import geoFilter from './middleware/geoFilter';
import reviewsRouter from './routes/reviews';
import { mcp } from './middleware/mcp';
import dispensaryRouter from './routes/dispensaries';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/strains', geoFilter, strainRoutes);
app.use('/reviews', reviewsRouter);

app.get('/', (_req, res) => {
  res.send('Hello from Express');
});

app.use('/auth', authRouter);

app.post('/reviews', authMiddleware, (req, res) => {
  res.json({ message: `Review submitted by ${req.user}` });
});

app.get('/strains', async (_req, res) => {
  const strains = await prisma.strain.findMany();
  res.json(strains);
});

app.post('/chat', mcp, (req, res) => {
  if (!req.mcp?.compliance.isLegal) {
    res.status(403).json({
      error: 'Cannabis-related content is not permitted in your region.',
    });
    return;
  }

  const msg = req.body.message || '';
  res.json({ reply: `Echo (${req.mcp?.language}): ${msg}` });
app.use('/dispensaries', dispensaryRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


export default app;