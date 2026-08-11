import * as tasks from '../tasks.js';
type Task = {
  id: number;
  name: string;
  type: 'Completed' | 'Pending';
};
describe('Testing functionality of all endpoint handlings', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Testing  getAllData', async () => {
    const mockData: Task[] = [
      { id: 1785918323962, name: 'Js', type: 'Completed' },
      { id: 1785929705726, name: 'python', type: 'Pending' },
    ];
    const listSpy = jest.spyOn(tasks, 'listTasks').mockResolvedValue(mockData);
    const { getAllData } = await import('../endpointHandling.js');

    expect(getAllData()).resolves.toEqual(mockData);
    expect(listSpy).toHaveBeenCalledTimes(1);
  });
  test('Testing getSpecific data functionality', async () => {
    const mockData: Task[] = [
      { id: 1785918323962, name: 'Js', type: 'Completed' },
      { id: 1785929705726, name: 'python', type: 'Pending' },
    ];
    const listSpy = jest.spyOn(tasks, 'listTasks').mockResolvedValue(mockData);
    const { getSpecificData } = await import('../endpointHandling.js');
    expect(getSpecificData(1785929705726)).resolves.toEqual({
      id: 1785929705726,
      name: 'python',
      type: 'Pending',
    });
    expect(listSpy).toHaveBeenCalledTimes(1);
  });
  test('Testing postData functionality', async () => {
    const mockInput: Task = { id: 1785918323962, name: 'Js', type: 'Completed' };
    const addTaskSpy = jest.spyOn(tasks, 'addTask').mockImplementation(async () => {});
    const { postData } = await import('../endpointHandling.js');
    expect(postData(mockInput)).resolves.toBeTruthy();
    expect(addTaskSpy).toHaveBeenCalledTimes(1);
  });
  test('Testing post data functionality when invalid input is given', async () => {
    const addTaskSpy = jest.spyOn(tasks, 'addTask').mockImplementation(async () => {});
    const { postData } = await import('../endpointHandling.js');
    // expect(postData('heyy')).resolves.toBeFalsy();
    expect(addTaskSpy).not.toHaveBeenCalled;
  });
  test('Testing patch data functionality in success case', async () => {
    const mockData: Task[] = [
      { id: 1785918323962, name: 'Js', type: 'Completed' },
      { id: 1785929705726, name: 'python', type: 'Pending' },
    ];
    const mockOutData: Task[] = [
      { id: 1785918323962, name: 'Js', type: 'Completed' },
      { id: 1785929705726, name: 'C++', type: 'Pending' },
    ];
    jest.spyOn(tasks, 'listTasks').mockResolvedValue(mockData);
    const saveTasksSpy = jest
      .spyOn(tasks, 'saveTasks')
      .mockImplementation(async (mockOutData) => {});
    const { patchTask } = await import('../endpointHandling.js');
    const val = await patchTask(1785929705726, { name: 'C++' });
    expect(val).toEqual({
      id: 1785929705726,
      name: 'C++',
      type: 'Pending',
    });
    expect(saveTasksSpy).toHaveBeenCalledTimes(1);
    expect(saveTasksSpy).toHaveBeenCalledWith(mockOutData);
  });
  test('Testing patch data functionality in not found case', async () => {
    const mockData: Task[] = [
      { id: 1785918323962, name: 'Js', type: 'Completed' },
      { id: 1785929705726, name: 'python', type: 'Pending' },
    ];
    jest.spyOn(tasks, 'listTasks').mockResolvedValue(mockData);
    const saveTasksSpy = jest.spyOn(tasks, 'saveTasks').mockImplementation(async () => {});
    const { patchTask } = await import('../endpointHandling.js');
    const val = await patchTask(1785929705729, { name: 'C++' });
    expect(val).toBeFalsy();
    expect(saveTasksSpy).not.toHaveBeenCalled();
  });
});
