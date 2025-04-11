const request = require('supertest');
const app = require('../index');

describe('GET /example/health', () => {
  it('should return 200 and status OK', async () => {
    const res = await request(app).get('/example/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'OK');
    expect(res.body).toHaveProperty('time');
  });
});
