import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt.js";

export interface AuthedRequest extends Request {
  adminId?: string;
  adminRole?: "ADMIN" | "VIEWER";
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
    req.adminRole = payload.role;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

/** Demo VIEWER accounts may only GET. Mount after requireAuth. */
export function blockViewerWrites(req: AuthedRequest, res: Response, next: NextFunction) {
  if (req.adminRole === "VIEWER" && req.method !== "GET") {
    return res.status(403).json({ error: "Demo account is read-only" });
  }
  next();
}

/** Some resources (real customer data) are off-limits to the demo VIEWER entirely. Mount after requireAuth. */
export function blockViewerEntirely(req: AuthedRequest, res: Response, next: NextFunction) {
  if (req.adminRole === "VIEWER") {
    return res.status(403).json({ error: "Not available on the demo account" });
  }
  next();
}
