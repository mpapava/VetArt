import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET environment variable is required");

export interface TokenPayload {
  adminId: string;
  role: "ADMIN" | "VIEWER";
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, secret as string, { expiresIn: "12h" });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, secret as string) as TokenPayload;
}
