import http from 'http';
import { ServerResponse } from 'http';
import { getAllData, getSpecificData, postData, patchTask } from './endpointHandling.js';
import { deleteTask } from './tasks.js';
import { send } from 'process';
type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/tasks') {
    const tasks = await getAllData();
    sendJSON(res, 200, tasks);
  } else if (req.method === 'POST' && req.url === '/tasks') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const val = JSON.parse(body);
        console.log(val);
        const isOk = postData(val);
        if (!isOk) throw new Error('Invalid data format');
        return sendJSON(res, 201, {
          message: 'Task created',
          task: val,
        });
      } catch (err: unknown) {
        if (err instanceof Error) return sendJSON(res, 400, { message: err.message });
        return sendJSON(res, 400, { message: 'Invalid json format' });
      }
    });
  } else if (req.method === 'GET' && req.url?.includes('/tasks/')) {
    const id = Number(req.url.split('/')[2]);
    const task = await getSpecificData(id);
    if (!task) return sendJSON(res, 400, { message: 'Invalid id' });
    return sendJSON(res, 200, task);
  } else if (req.method === 'PATCH' && req.url?.includes('/tasks/')) {
    const id = Number(req.url.split('/')[2]);
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const result = JSON.parse(body);
        const val = await patchTask(id, result);
        if (!val) return sendJSON(res, 400, { message: 'Invalid json format' });
        return sendJSON(res, 200, val);
      } catch (error: unknown) {
        if (error instanceof Error) return sendJSON(res, 400, { message: error.message });
        return sendJSON(res, 400, { message: 'Invalid json format' });
      }
    });
  } else if (req.method === 'DELETE' && req.url?.includes('/tasks/')) {
    const id = Number(req.url.split('/')[2]);
    const val = await deleteTask(id);
    if (val === false) return sendJSON(res, 400, { message: 'user not found' });
    sendJSON(res, 200, { message: 'Deleted successfully' });
  } else {
    sendJSON(res, 404, { error: 'Page not found' });
  }
});

export function sendJSON(res: ServerResponse, status: number, data: JSONValue) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
