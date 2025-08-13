const request = require('supertest');
const app = require('../src/index');

describe('Health', () => {
  it('GET /health responde ok:true', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('GET / responde texto de bienvenida', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Backend corriendo/);
  });
});
