// import fs from 'node:fs/promises';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // const fileName = path.join(__dirname, 'tasks.json');
import { addTask, listTasks, completeTask, filterTask, saveTasks } from './tasks.js';

export type TaskData = {
  name: string;
  type: 'Completed' | 'Pending';
};
export type Task = {
  id: number;
  name: string;
  type: 'Completed' | 'Pending';
};

export async function getAllData() {
  const tasks = await listTasks();
  return tasks;
}

export async function getSpecificData(id: number) {
  const tasks = await listTasks();
  const task = tasks.find((ts) => ts.id === id);
  console.log(task);
  return task;
}

export async function postData(data: TaskData) {
  const isOk = isValid(data);
  if (!isOk) return false;
  const inputData: Task = { id: Date.now(), ...data };
  await addTask(inputData);
  return true;
}

export async function patchTask(id: number, data: Partial<TaskData>) {
  try {
    const tasks = await listTasks();
    const taskIdx = tasks.findIndex((ts) => ts.id === id);
    if (taskIdx == -1) return false;
    const updatedData: Task = { ...tasks[taskIdx], ...data };
    tasks[taskIdx] = updatedData;
    saveTasks(tasks);
    return updatedData;
  } catch (error) {
    console.log(error);
  }
}

function isValid(data: TaskData) {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const task = data;
  return typeof task.name === 'string' && (data.type === 'Completed' || data.type === 'Pending');
}

// console.log(getSpecificData(1786084813409));
