import request from 'supertest';
import express from 'express';


describe('GET /', () => {
  it('should return greeting', async () => {
    const app = express();
    app.get('/', (_req: express.Request, res: express.Response) => {
      res.send('Hello from Express');
    });

    const response = await request(app).get('/');
    expect(response.text).toBe('Hello from Express');
  });
});
