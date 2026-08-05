import {
  findCurrentDirectory,
  findVersion,
  findOsType,
  findMemory,
  findEnvironment,
  displayCommand,
} from './dataCollection';
import { parseCommand } from './commandParsing';

jest.mock('./dataCollection');
describe('Testing parse command funciton', () => {
  test('Version', () => {
    parseCommand('version');
    expect(findVersion).toHaveBeenCalled();
  });
  test('Memory', () => {
    parseCommand('memory');
    expect(findMemory).toHaveBeenCalled();
  });
  test('Directory', () => {
    parseCommand('directory');
    expect(findCurrentDirectory).toHaveBeenCalledTimes(1);
  });
  test('Os testing', () => {
    parseCommand('os');
    expect(findOsType).toHaveBeenCalled();
  });
  test('find environment testing', () => {
    parseCommand('environment');
    expect(findEnvironment).toHaveBeenCalled();
  });
  test('calling display command when invalid command is given', () => {
    parseCommand('hello');
    expect(displayCommand).toHaveBeenCalled();
  });
});
