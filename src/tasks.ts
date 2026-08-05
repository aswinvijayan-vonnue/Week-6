import fs from 'node:fs/promises';
export type Task = {
  id: number;
  name: string;
  type: 'Completed' | 'Pending';
};

const fileName = 'tasks.json';

export async function readFromFile(file: string = fileName): Promise<Task[]> {
  try {
    const content = await fs.readFile(file, 'utf-8');
    const response = JSON.parse(content);
    if (response.tasks) return response.tasks;
    else return [];
  } catch (error) {
    if (error instanceof Error && error && 'code' in error) {
      if (error.code === 'ENOENT') {
        await writeToFile([]);
        return [];
      }
    }
    throw error;
  }
}

export async function writeToFile(arr: Array<Task>, file: string = fileName) {
  try {
    const res = { tasks: arr };
    const stringified = JSON.stringify(res);
    await fs.writeFile(file, stringified);
  } catch (err) {
    throw err;
  }
}

// const arr: Array<Task> = [{ id: Date.now(), name: 'Js', type: 'Completed' }];

export async function addTask(t1: Task) {
  const tasks = await readFromFile();
  const val = [...tasks, t1];
  await writeToFile(val);
  console.log('Successfully entered');
}

export async function listTasks() {
  const tasks = await readFromFile();
  if (tasks.length == 0) console.log('No Tasks');
  else {
    console.log(tasks);
  }
}

export async function completeTask(id: number) {
  const tasks = await readFromFile();
  const task = tasks.find((task) => task.id === id);
  if (tasks.length === 0 || !task) {
    console.log('Not found!');
    return false;
  }
  const updated: Task[] = tasks.map((task) => {
    if (task.id === id && task.type === 'Pending') {
      return { ...task, type: 'Completed' };
    } else return { ...task };
  });
  await writeToFile(updated);
  return true;
}

export async function deleteTask(id: number) {
  const tasks = await readFromFile();
  const task = tasks.find((task) => task.id === id);
  if (tasks.length === 0 || !task) {
    console.log('Not found!');
    return false;
  }
  const updated = tasks.filter((task) => task.id !== id);
  await writeToFile(updated);
}

export async function filterTask() {
  const tasks = await readFromFile();
  if (!tasks) return;
  const completed_Tasks = tasks.filter((task) => task.type === 'Completed');
  const pending_Tasks = tasks.filter((task) => task.type === 'Pending');
  console.log('Completed Tasks: ', completed_Tasks);
  console.log('Pending Tasks: ', pending_Tasks);
}
// addTask({ id: Date.now(), name: 'Js', type: 'Completed' });
// list();
