import request from 'supertest';
import express from 'express';
import dispensaryRouter from './routes/dispensaries';

describe('GET /dispensaries/:id/availability', () => {
  const app = express();
  app.use('/dispensaries', dispensaryRouter);

  it('should return strain availability with delivery info', async () => {
    const response = await request(app).get('/dispensaries/1/availability');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('dispensaryId', '1');
    expect(response.body).toHaveProperty('strains');
    expect(response.body).toHaveProperty('delivery');
  });

  it('should return 404 for unknown dispensary', async () => {
    const response = await request(app).get('/dispensaries/999/availability');
    expect(response.status).toBe(404);
  });
});
