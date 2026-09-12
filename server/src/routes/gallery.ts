import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../middleware/errorHandler.js";

export const galleryRouter = Router();

galleryRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export const adminGalleryRouter = Router();

adminGalleryRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

const gallerySchema = z.object({
  order: z.number().int(),
  category: z.string().min(1),
  labelEn: z.string().min(1),
  labelKa: z.string().min(1),
  labelRu: z.string().min(1),
  imageUrl: z.string().nullable().optional(),
});

adminGalleryRouter.post("/", async (req, res, next) => {
  try {
    const data = gallerySchema.parse({ order: 0, ...req.body });
    const row = await prisma.galleryItem.create({ data });
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
});

adminGalleryRouter.put("/:id", async (req, res, next) => {
  try {
    const data = gallerySchema.partial().parse(req.body);
    const row = await prisma.galleryItem.update({ where: { id: req.params.id }, data });
    res.json(row);
  } catch (err) {
    next(err);
  }
});

adminGalleryRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.galleryItem.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    next(err instanceof Error ? new ApiError(404, "Gallery item not found") : err);
  }
});
