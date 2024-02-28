import request from 'supertest';
import { app } from '../app.js';
import './setup.js';

test('GET /tasks', async () => {
  const response = await request(app).get('/api/v1/tasks');
  expect(response.statusCode).toBe(200);
});
