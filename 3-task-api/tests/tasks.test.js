import request from 'supertest';
import { app } from '../src/app.js';
import './setup.js';

describe('GET /tasks', () => {
  it('should respond with 200 and array of tasks', async () => {
    const response = await request(app).get('/api/v1/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        description: 'test1',
        isCompleted: false,
      },
    ]);
  });
});

describe('POST /tasks', () => {
  it.each([
    {},
    { description: 'very very very very very very very long description' },
    { description: 'test', isCompleted: 23 },
    { isCompleted: false },
  ])(
    'should respond with 400 and error message if task is in invalid format: %p',
    async (task) => {
      const response = await request(app).post('/api/v1/tasks').send(task);
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        message: expect.any(String),
      });
    }
  );

  it('should respond with 201 and created task if valid task', async () => {
    const task = {
      description: 'test2',
      isCompleted: true,
    };

    const response = await request(app).post('/api/v1/tasks').send(task);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 2,
      ...task,
    });
  });
});

describe('GET /tasks/:id', () => {
  it('should respond with 404 and error message if no task with given id', async () => {
    const response = await request(app).get('/api/v1/tasks/2');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Task with id 2 not found' });
  });

  it('should respond with 200 and given task if task with given id', async () => {
    const response = await request(app).get('/api/v1/tasks/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      description: 'test1',
      isCompleted: false,
    });
  });
});

describe('PATCH /tasks/:id', () => {
  it('should respond with 404 and error message if no task with given id', async () => {
    const response = await request(app).patch('/api/v1/tasks/2').send({
      description: 'test2',
    });
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Task with id 2 not found' });
  });

  it.each([
    {},
    { description: 'very very very very very very very long description' },
    { description: 'test', isCompleted: 23 },
  ])(
    'should respond with 400 if task is in invalid format: %p',
    async (task) => {
      const response = await request(app).patch('/api/v1/tasks/1').send(task);
      expect(response.statusCode).toBe(400);
    }
  );

  it.each([
    { description: 'test2' },
    { isCompleted: true },
    { description: 'test2', isCompleted: true },
  ])(
    'should respond with 200 and updated task if valid task: %p',
    async (task) => {
      const response = await request(app).patch('/api/v1/tasks/1').send(task);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: 1,
        description: expect.any(String),
        isCompleted: expect.any(Boolean),
      });
    }
  );
});

describe('DELETE /tasks/:id', () => {
  it('should respond with 404 and error message if no task with given id', async () => {
    const response = await request(app).delete('/api/v1/tasks/2');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'Task with id 2 not found' });
  });

  it('should respond with 204 if task with given id', async () => {
    const response = await request(app).delete('/api/v1/tasks/1');
    expect(response.statusCode).toBe(204);
  });
});
