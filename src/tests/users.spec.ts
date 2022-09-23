import supertest from 'supertest';
import app from '../index';

// create a request object
const request = supertest(app);

describe('Test users endpoint response', () => {
  it('test users endpoint', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(200);
  });
});
