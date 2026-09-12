import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt.js";

export interface AuthedRequest extends Request {
  adminId?: string;
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const payload = verifyToken(token);
    req.adminId = payload.adminId;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
