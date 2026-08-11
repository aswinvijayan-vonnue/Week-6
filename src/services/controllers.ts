import { type Request, type Response } from 'express';
import { addTask, listTasks, saveTasks } from '../tasks.js';
import { type TaskData, type Task } from '../endpointHandling.js';
import { deleteTask } from '../tasks.js';

export async function getAllTasks(req: Request, res: Response) {
  const tasks: Task[] = await listTasks();
  return res.status(200).json(tasks);
}

export async function getSpecificTask(req: Request, res: Response) {
  const id = Number(req.params.taskId);
  const tasks = await listTasks();
  const taskIdx = tasks.findIndex((ts) => ts.id === id);
  if (taskIdx == -1) return res.status(404).json({ message: `Task with id: ${id} not found !` });
  return res.status(200).json(tasks[taskIdx]);
}

export async function postTask(req: Request, res: Response) {
  const reqData = req.body;
  if (!isValid(reqData)) return res.status(400).json({ message: 'Invalid input' });
  const inputData: Task = { id: Date.now(), ...reqData };
  await addTask(inputData);
  return res.status(201).json({ message: 'New task created' });
}

export async function patchData(req: Request, res: Response) {
  const id = Number(req.params.id);
  console.log('Testing patchdata inn testing', id);
  const data = req.body;
  const tasks = await listTasks();
  const taskIdx = tasks.findIndex((ts) => ts.id === id);
  if (taskIdx == -1)
    return res.status(404).json({
      error: `Task not found id: ${id}`,
    });
  const updatedData: Task = { ...tasks[taskIdx], ...data };
  tasks[taskIdx] = updatedData;
  saveTasks(tasks);
  return res.status(200).json({ success: 'Data updated successfully' });
}

export async function removeTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  const isDone = await deleteTask(id);
  if (isDone === false) return res.status(404).json({ error: 'Task not found to delete' });
  return res.sendStatus(204);
}

function isValid(data: TaskData) {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const task = data;
  return typeof task.name === 'string' && (data.type === 'Completed' || data.type === 'Pending');
}
