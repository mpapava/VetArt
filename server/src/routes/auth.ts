import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { signToken } from "../lib/jwt.js";
import { ApiError } from "../middleware/errorHandler.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const admin = await prisma.adminUser.findUnique({ where: { email: data.email.toLowerCase() } });
    if (!admin) throw new ApiError(401, "Invalid email or password");

    const valid = await bcrypt.compare(data.password, admin.passwordHash);
    if (!valid) throw new ApiError(401, "Invalid email or password");

    const token = signToken({ adminId: admin.id, role: admin.role });
    res.json({ token, admin: { id: admin.id, email: admin.email, role: admin.role } });
  } catch (err) {
    next(err);
  }
});

authRouter.get("/me", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const admin = await prisma.adminUser.findUnique({ where: { id: req.adminId } });
    if (!admin) throw new ApiError(404, "Admin not found");
    res.json({ id: admin.id, email: admin.email, role: admin.role });
  } catch (err) {
    next(err);
  }
});
