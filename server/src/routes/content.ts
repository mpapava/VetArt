import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../middleware/errorHandler.js";

const VALID_KEYS = ["home", "about", "doctors", "gallery", "blog", "contact", "appointment"] as const;

function assertValidKey(key: string): void {
  if (!VALID_KEYS.includes(key as (typeof VALID_KEYS)[number])) {
    throw new ApiError(404, `Unknown content key: ${key}`);
  }
}

export const contentRouter = Router();

contentRouter.get("/:key", async (req, res, next) => {
  try {
    assertValidKey(req.params.key);
    const row = await prisma.pageContent.findUnique({ where: { key: req.params.key } });
    if (!row) return res.json({ key: req.params.key, dataEn: {}, dataKa: {}, dataRu: {} });
    res.json(row);
  } catch (err) {
    next(err);
  }
});

export const adminContentRouter = Router();

adminContentRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.pageContent.findMany({ orderBy: { key: "asc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

const upsertSchema = z.object({
  dataEn: z.record(z.string(), z.any()),
  dataKa: z.record(z.string(), z.any()),
  dataRu: z.record(z.string(), z.any()),
});

adminContentRouter.put("/:key", async (req, res, next) => {
  try {
    assertValidKey(req.params.key);
    const data = upsertSchema.parse(req.body);
    const row = await prisma.pageContent.upsert({
      where: { key: req.params.key },
      create: { key: req.params.key, ...data },
      update: data,
    });
    res.json(row);
  } catch (err) {
    next(err);
  }
});
