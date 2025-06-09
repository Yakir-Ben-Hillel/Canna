import express from 'express';
import strainRoutes from './routes/strains';
import geoFilter from './middleware/geoFilter';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/strains', geoFilter, strainRoutes);

app.get('/', (_req, res) => {
  res.send('Hello from Express');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
