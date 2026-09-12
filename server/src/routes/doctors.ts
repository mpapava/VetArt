import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../middleware/errorHandler.js";

export const doctorsRouter = Router();

doctorsRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.doctor.findMany({ where: { active: true }, orderBy: { order: "asc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export const adminDoctorsRouter = Router();

adminDoctorsRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.doctor.findMany({ orderBy: { order: "asc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

const doctorSchema = z.object({
  order: z.number().int(),
  roleEn: z.string().min(1),
  roleKa: z.string().min(1),
  roleRu: z.string().min(1),
  titleEn: z.string().min(1),
  titleKa: z.string().min(1),
  titleRu: z.string().min(1),
  descEn: z.string().min(1),
  descKa: z.string().min(1),
  descRu: z.string().min(1),
  photoUrl: z.string().nullable().optional(),
  active: z.boolean(),
});

adminDoctorsRouter.post("/", async (req, res, next) => {
  try {
    const data = doctorSchema.parse({ order: 0, active: true, ...req.body });
    const row = await prisma.doctor.create({ data });
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
});

adminDoctorsRouter.put("/:id", async (req, res, next) => {
  try {
    const data = doctorSchema.partial().parse(req.body);
    const row = await prisma.doctor.update({ where: { id: req.params.id }, data });
    res.json(row);
  } catch (err) {
    next(err);
  }
});

adminDoctorsRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.doctor.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    next(err instanceof Error ? new ApiError(404, "Doctor not found") : err);
  }
});
