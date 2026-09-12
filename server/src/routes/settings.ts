import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export const settingsRouter = Router();

settingsRouter.get("/", async (_req, res, next) => {
  try {
    const row = await prisma.settings.findUnique({ where: { id: 1 } });
    res.json(row || {});
  } catch (err) {
    next(err);
  }
});

export const adminSettingsRouter = Router();

adminSettingsRouter.get("/", async (_req, res, next) => {
  try {
    const row = await prisma.settings.findUnique({ where: { id: 1 } });
    res.json(row || {});
  } catch (err) {
    next(err);
  }
});

const settingsSchema = z.object({
  phone: z.string().min(1),
  email: z.string().min(1),
  addressEn: z.string().min(1),
  addressKa: z.string().min(1),
  addressRu: z.string().min(1),
  facebookUrl: z.string().min(1),
  mapQuery: z.string().min(1),
  followerCount: z.string().min(1),
  recommendPercent: z.string().min(1),
  reviewCount: z.string().min(1),
});

adminSettingsRouter.put("/", async (req, res, next) => {
  try {
    const data = settingsSchema.parse(req.body);
    const row = await prisma.settings.upsert({
      where: { id: 1 },
      create: { id: 1, ...data },
      update: data,
    });
    res.json(row);
  } catch (err) {
    next(err);
  }
});
