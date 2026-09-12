import type { Request, Response, NextFunction } from "express";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message });
  }
  if (err && typeof err === "object" && "issues" in err) {
    return res.status(400).json({ error: "Invalid request data", details: (err as { issues: unknown }).issues });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
