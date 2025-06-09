import express from 'express';
import prisma from '../models';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello from Express');
});

app.get('/strains', async (_req, res) => {
  const strains = await prisma.strain.findMany();
  res.json(strains);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
