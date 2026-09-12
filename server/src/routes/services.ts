import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../middleware/errorHandler.js";

export const servicesRouter = Router();

servicesRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export const adminServicesRouter = Router();

adminServicesRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.service.findMany({ orderBy: { order: "asc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

const serviceSchema = z.object({
  order: z.number().int().default(0),
  icon: z.string().min(1),
  titleEn: z.string().min(1),
  titleKa: z.string().min(1),
  titleRu: z.string().min(1),
  descEn: z.string().min(1),
  descKa: z.string().min(1),
  descRu: z.string().min(1),
  active: z.boolean().default(true),
});

adminServicesRouter.post("/", async (req, res, next) => {
  try {
    const data = serviceSchema.parse(req.body);
    const row = await prisma.service.create({ data });
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
});

adminServicesRouter.put("/:id", async (req, res, next) => {
  try {
    const data = serviceSchema.partial().parse(req.body);
    const row = await prisma.service.update({ where: { id: req.params.id }, data });
    res.json(row);
  } catch (err) {
    next(err);
  }
});

adminServicesRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    next(err instanceof Error ? new ApiError(404, "Service not found") : err);
  }
});
