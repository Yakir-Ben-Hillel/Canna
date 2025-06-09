import request from 'supertest';
import { app } from './index';


describe('GET /', () => {
  it('should return greeting', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello from Express');
  });
});

describe('POST /chat', () => {
  it('blocks requests from illegal regions', async () => {
    const response = await request(app)
      .post('/chat')
      .set('x-country', 'XX')
      .send({ message: 'hello' });

    expect(response.status).toBe(403);
  });

  it('allows requests from legal regions and echoes language', async () => {
    const response = await request(app)
      .post('/chat')
      .set('x-country', 'IL')
      .set('Accept-Language', 'he')
      .send({ message: 'hello' });

    expect(response.status).toBe(200);
    expect(response.body.reply).toContain('he');
  });
});
