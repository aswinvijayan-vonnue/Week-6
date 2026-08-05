import { stdin, stdout } from 'node:process';
import readline from 'node:readline';
import type { Task } from './tasks.js';
import { addTask, listTasks, completeTask, deleteTask, filterTask } from './tasks.js';

function displayCommand() {
  console.log('For adding tasks : add [TASK_NAME]');
  console.log('To get all tasks: get');
  console.log('To mark task as completed: complete [TASK_ID]');
  console.log('To delete task: delete [TASK_ID]');
  console.log('To filter all tasks: filter');
}

async function parseCommandArray(arr: string[]) {
  switch (arr[0]) {
    case 'add':
      if (arr.length < 2) {
        console.log('invalid entry');
        return;
      }
      const task: Task = { id: Date.now(), name: arr[1], type: 'Pending' };
      await addTask(task);
      console.log('Added successfully');
      break;
    case 'get':
      await listTasks();
      break;
    case 'complete': {
      if (arr.length < 2) {
        console.log('invalid entry');
        return;
      }
      const id: number = parseInt(arr[1]);
      await completeTask(id);
      console.log('Completed');
      break;
    }
    case 'delete':
      if (arr.length < 2) {
        console.log('invalid entry');
        return;
      }
      const id: number = parseInt(arr[1]);
      await deleteTask(id);
      break;
    case 'filter':
      await filterTask();
      break;
    default:
      console.log('Incorrect input ');
      displayCommand();
  }
}

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

async function readCommand(command: string) {
  const commandArr = command.trim().split(/\s+/);
  if (commandArr[0] === 'exit') {
    rl.close();
    return;
  } else {
    await parseCommandArray(commandArr);
    waitForInput();
  }

  //   console.log(commandArr);
}

function waitForInput() {
  console.log('\n');
  rl.question('enter input: ', readCommand);
}
if (process.env.NODE_ENV !== 'test') {
  waitForInput();
}
