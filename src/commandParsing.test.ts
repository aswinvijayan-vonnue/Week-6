import os from 'node:os';
import * as utils from './utils';

describe('Testing each functionality', () => {
  test('testing findOS functionality', async () => {
    const { findOsType } = await import('./dataCollection');
    expect(findOsType()).toBe('Linux');
  });
  test('testing findCurrentDirectory ', async () => {
    const mockDir = '/home/hello';
    const cwdSpy = jest.spyOn(process, 'cwd').mockReturnValueOnce(mockDir);
    const { findCurrentDirectory } = await import('./dataCollection');
    expect(findCurrentDirectory()).toBe(mockDir);
  });
  test('testing findVersion ', async () => {
    const mockVersion = '2.0';
    const mockVer = jest.spyOn(os, 'version').mockReturnValueOnce(mockVersion);
    const { findVersion } = await import('./dataCollection');
    expect(findVersion()).toBe(mockVersion);
  });
  test('testing free memory', async () => {
    jest.spyOn(utils, 'toGB').mockReturnValue('20');
    const { findMemory } = await import('./dataCollection');
    expect(findMemory()).toBe('20 GB');
  });
  test('Testing environment path', async () => {
    const { findEnvironment } = await import('./dataCollection');
    const res = findEnvironment();
    expect(res).toBe(process.env);
  });
});
