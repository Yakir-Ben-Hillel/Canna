import express from 'express';
import { mcp } from './middleware/mcp';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello from Express');
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
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
