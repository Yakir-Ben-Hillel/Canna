import request from 'supertest';
import express from 'express';
import authRouter from './routes/auth';
import { authMiddleware } from './middleware/auth';

describe('auth routes', () => {
  it('registers and logs in a user', async () => {
    const app = express();
    app.use(express.json());
    app.use('/auth', authRouter);

    const registerRes = await request(app)
      .post('/auth/register')
      .send({ username: 'test', password: 'pass' });
    expect(registerRes.body.token).toBeDefined();

    const loginRes = await request(app)
      .post('/auth/login')
      .send({ username: 'test', password: 'pass' });
    expect(loginRes.body.token).toBeDefined();
  });

  it('protects routes', async () => {
    const app = express();
    app.use(express.json());
    app.use('/auth', authRouter);
    app.post('/reviews', authMiddleware, (req, res) => {
      res.json({ user: (req as any).user });
    });

    const register = await request(app)
      .post('/auth/register')
      .send({ username: 'bob', password: 'secret' });
    const token = register.body.token;

    const reviewRes = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`);
    expect(reviewRes.status).toBe(200);
    expect(reviewRes.body.user).toBe('bob');
  });
});
