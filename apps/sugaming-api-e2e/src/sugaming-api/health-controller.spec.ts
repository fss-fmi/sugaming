import axios, { HttpStatusCode } from 'axios';

describe('HealthController', () => {
  it('GET /api/v1/health should return status OK', async () => {
    const res = await axios.get('/api/v1/health');

    // Verify the API is up
    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data).toHaveProperty('status', 'ok');

    // Verify the database is up
    expect(res.data).toHaveProperty('info', {
      prisma: { status: 'up' },
      steam: { status: 'up' },
      discord: { status: 'up' },
    });
  });
});
