import express from 'express';
import dispensaries from '../data/dispensaries';

const router = express.Router();

router.get(
  '/:id/availability',
  ((req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const dispensary = dispensaries.find(d => d.id === id);

    if (!dispensary) {
      return res.status(404).json({ message: 'Dispensary not found' });
    }

    const response = {
      dispensaryId: dispensary.id,
      strains: dispensary.strains,
      delivery: {
        available: dispensary.delivery.available,
        estimatedCost: dispensary.delivery.baseCost
      }
    };

    res.json(response);
  }) as express.RequestHandler
);

export default router;
