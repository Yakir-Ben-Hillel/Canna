import request from 'supertest';
import app from '../index';
import { resetReviews } from '../models/reviewModel';

describe('reviews routes', () => {
  beforeEach(() => {
    resetReviews();
  });

  it('creates a review and retrieves stats', async () => {
    await request(app)
      .post('/reviews')
      .send({ strainId: 's1', userId: 'u1', rating: 4, text: 'Great!' })
      .expect(201);

    const res = await request(app).get('/reviews/strain/s1');
    expect(res.body.reviews.length).toBe(1);
    expect(res.body.averageRating).toBe(4);
  });

  it('updates a review', async () => {
    const createRes = await request(app)
      .post('/reviews')
      .send({ strainId: 's1', userId: 'u1', rating: 3, text: 'Ok' });

    await request(app)
      .put(`/reviews/${createRes.body.id}`)
      .send({ rating: 5 });

    const res = await request(app).get('/reviews/strain/s1');
    expect(res.body.averageRating).toBe(5);
  });

  it('filters flagged content', async () => {
    await request(app)
      .post('/reviews')
      .send({ strainId: 's1', userId: 'u1', rating: 2, text: 'badword text' })
      .expect(201);

    const res = await request(app).get('/reviews/strain/s1');
    expect(res.body.reviews.length).toBe(0);
    expect(res.body.averageRating).toBe(0);
  });
});
