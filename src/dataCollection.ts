import os from 'node:os';
import { cwd } from 'node:process';
import { toGB } from './utils.js';
export function findOsType() {
  const osType = os.type();
  if (osType === 'Darwin') return 'macOS';
  else if (osType === 'windows_NT') return 'windows';
  else return osType;
}

export function findCurrentDirectory() {
  return cwd();
}

export function findVersion() {
  return os.version();
}
export function findMemory() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const res = toGB(totalMem - freeMem);
  return `${res} GB`;
}

export function displayCommand() {
  console.log(`version : to log OS version `);
  console.log(`memory: to log free memory `);
  console.log(`os : to get Operating System `);
  console.log(`directory: to get present working directory`);
  console.log(`environment: to get environment info`);
  console.log(`exit: to exit`);
}

export function findEnvironment() {
  return process.env;
}
