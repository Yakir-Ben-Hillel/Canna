import request from 'supertest';
import express from 'express';
import strainRoutes from './strains';
import geoFilter from '../middleware/geoFilter';

describe('Strain routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/strains', geoFilter, strainRoutes);

  it('should perform full CRUD', async () => {
    const postRes = await request(app)
      .post('/strains')
      .set('x-region', 'US')
      .send({ name: 'Test', description: 'A test strain' });
    expect(postRes.status).toBe(201);
    expect(postRes.body.id).toBeDefined();

    const listRes = await request(app)
      .get('/strains')
      .set('x-region', 'US');
    expect(listRes.body.length).toBe(1);

    const putRes = await request(app)
      .put(`/strains/${postRes.body.id}`)
      .set('x-region', 'US')
      .send({ name: 'Updated', description: 'Updated desc' });
    expect(putRes.status).toBe(200);
    expect(putRes.body.name).toBe('Updated');

    const delRes = await request(app)
      .delete(`/strains/${postRes.body.id}`)
      .set('x-region', 'US');
    expect(delRes.status).toBe(204);

    const getRes = await request(app)
      .get(`/strains/${postRes.body.id}`)
      .set('x-region', 'US');
    expect(getRes.status).toBe(404);
  });

  it('should block unsupported regions', async () => {
    const res = await request(app)
      .get('/strains')
      .set('x-region', 'FR');
    expect(res.status).toBe(403);
  });
});
