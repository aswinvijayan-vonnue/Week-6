import request from 'supertest';
import app from '../app.js';
import * as tasks from '../tasks.js';

describe('Testing all endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('testing GET /tasks', async () => {
    const getSpy = jest.spyOn(tasks, 'listTasks').mockImplementation(async () => []);
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });
  test('Testing endpoint GET /tasks/:id', async () => {
    jest.spyOn(tasks, 'listTasks').mockImplementation(async () => [
      { id: 1786436163623, name: 'Game', type: 'Pending' },
      { id: 1786439388692, name: 'Physics', type: 'Pending' },
    ]);
    const response = await request(app).get('/tasks/1786439388692');
    expect(response.status).toBe(200);
  });
  test('Testing endpoint GET /tasks/:id where id doesnot exists', async () => {
    jest.spyOn(tasks, 'listTasks').mockImplementation(async () => [
      { id: 1786436163623, name: 'Game', type: 'Pending' },
      { id: 1786439388692, name: 'Physics', type: 'Pending' },
    ]);
    const response = await request(app).get('/tasks/123');
    expect(response.status).toBe(404);
  });
  test('testing endpoint POST /tasks in successfull case', async () => {
    const mockData = { name: 'Python Programming', type: 'Pending' };
    const addSpy = jest.spyOn(tasks, 'addTask').mockImplementation(async () => {});
    const response = await request(app).post('/tasks').send(mockData);
    expect(response.status).toBe(201);
    expect(addSpy).toHaveBeenCalled();
  });
  test('Testing endpoint POST /tasks in false case', async () => {
    const addSpy = jest.spyOn(tasks, 'addTask').mockImplementation(async () => {});
    const response = await request(app).post('/tasks').send('hello');
    expect(response.status).toBe(400);
    expect(addSpy).not.toHaveBeenCalled();
  });
  test('Testing patch data in successfull case PATCH /tasks/:id', async () => {
    jest.spyOn(tasks, 'listTasks').mockImplementation(async () => [
      {
        id: 1786439388692,
        name: 'Physics',
        type: 'Pending',
      },
    ]);
    const saveTaskSpy = jest.spyOn(tasks, 'saveTasks');
    const response = await request(app).patch('/tasks/1786439388692').send({ type: 'Completed' });
    expect(response.status).toBe(200);
    expect(saveTaskSpy).toHaveBeenCalledTimes(1);
  });
  test('Testing patch data in invalid id case PATCH /tasks/:id', async () => {
    jest.spyOn(tasks, 'listTasks').mockImplementation(async () => []);
    const saveTaskSpy = jest.spyOn(tasks, 'saveTasks');
    const response = await request(app).patch('/tasks/1234').send({ type: 'Completed' });
    expect(response.status).toBe(404);
    expect(saveTaskSpy).not.toHaveBeenCalled();
  });
  test('Testing delete data in existing id case', async () => {
    jest.spyOn(tasks, 'deleteTask').mockResolvedValue(undefined);
    const response = await request(app).delete('/tasks/1234');
    expect(response.status).toBe(204);
  });
  test('Testing delete data in id doesnot existing case ', async () => {
    jest.spyOn(tasks, 'deleteTask').mockResolvedValue(false);
    const response = await request(app).delete('/tasks/1234');
    expect(response.status).toBe(404);
  });
});
