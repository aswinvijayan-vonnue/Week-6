import { stdin, stdout } from 'node:process';
import readline from 'node:readline';
import {
  findOsType,
  findCurrentDirectory,
  findMemory,
  findVersion,
  displayCommand,
  findEnvironment,
} from './dataCollection.js';

export function parseCommand(command: string) {
  switch (command) {
    case 'version':
      console.log(`OS Version: ${findVersion()}`);
      break;
    case 'memory':
      console.log(`Memory Used: ${findMemory()}`);
      break;
    case 'os':
      console.log(`OS: ${findOsType()}`);
      break;
    case 'directory':
      console.log(`PWD: ${findCurrentDirectory()}`);
      break;
    case 'environment':
      console.log(`.env: ${findEnvironment()}`);
    default:
      console.log('Invalid command\n');
      displayCommand();
  }
}

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

function waitForInput() {
  console.log('\n');
  rl.question('enter input: ', commandHandling);
}
function commandHandling(command: string) {
  command.trim();
  let val = command.toLowerCase();
  if (val === 'exit' || val === '') rl.close();
  else {
    parseCommand(val);
    waitForInput();
  }
}
if (process.env.NODE_ENV !== 'test') {
  waitForInput();
}
