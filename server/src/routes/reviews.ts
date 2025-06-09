import { Router, Request, Response } from 'express';
import { createReview, updateReview, getReviewsForStrain } from '../models/reviewModel';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { strainId, userId, rating, text } = req.body;
  if (!strainId || !userId || typeof rating !== 'number' || !text) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }
  const review = createReview({ strainId, userId, rating, text });
  res.status(201).json(review);
});

router.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const review = updateReview(id, req.body);
  if (!review) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
  res.json(review);
});

router.get('/strain/:strainId', (req: Request, res: Response) => {
  const result = getReviewsForStrain(req.params.strainId);
  res.json(result);
});

export default router;
