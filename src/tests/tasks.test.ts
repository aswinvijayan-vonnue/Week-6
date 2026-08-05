import fs from 'node:fs/promises';
import type { Task } from '../tasks.js';
jest.mock('node:fs/promises');
describe('Testing Reading from file in all edge cases', () => {
  test('Testing readfile functionality', async () => {
    const mockRes = { tasks: [{ id: Date.now(), name: 'Js', type: 'Completed' }] };
    const mockIn = JSON.stringify(mockRes);

    const readSpy = jest.spyOn(fs, 'readFile').mockResolvedValue(mockIn);
    const { readFromFile } = await import('../tasks.js');
    const response = await readFromFile('hey.json');
    expect(response).toEqual(mockRes.tasks);
    expect(readSpy).toHaveBeenCalledTimes(1);
  });
  test('Testing file not found error', async () => {
    const error = new Error('ENOENT:No such file');
    (error as any).code = 'ENOENT';
    jest.spyOn(fs, 'readFile').mockRejectedValue(error);
    const { readFromFile } = await import('../tasks.js');
    const response = await readFromFile('hey.json');
    expect(response).toEqual([]);
  });
  test('Testing throw error', async () => {
    const error = new Error('unexpected error');
    jest.spyOn(fs, 'readFile').mockRejectedValue(error);
    const { readFromFile } = await import('../tasks.js');
    expect(readFromFile()).rejects.toThrow();
  });
});

describe('Testing each edge cases in writing file', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Testing write done successfully', async () => {
    const writeSpy = jest.spyOn(fs, 'writeFile');
    const mockArg: Task[] = [{ id: Date.now(), name: 'Js', type: 'Completed' }];
    const mockRes = { tasks: [{ id: Date.now(), name: 'Js', type: 'Completed' }] };
    const mockIn = JSON.stringify(mockRes);
    const { writeToFile } = await import('../tasks.js');
    await writeToFile(mockArg, 'file1.txt');
    expect(writeSpy).toHaveBeenCalledWith('file1.txt', mockIn);
  });
  test('Testing write function throw error', async () => {
    const error = new Error('unexpected error');
    jest.spyOn(fs, 'writeFile').mockRejectedValue(error);
    const { writeToFile } = await import('../tasks.js');
    expect(writeToFile).rejects.toThrow();
  });
});
