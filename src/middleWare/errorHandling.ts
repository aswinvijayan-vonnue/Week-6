import { type Request, type Response, type NextFunction } from 'express';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Error) res.status(400).json({ error: err.message });
  res.status(500).json({ error: 'Internal server error' });
}
