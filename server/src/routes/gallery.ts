import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../middleware/errorHandler.js";
import { deleteUploadedFile } from "../lib/upload.js";

// ---- Public: categories with their photos nested ----
export const galleryRouter = Router();

galleryRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.galleryCategory.findMany({
      orderBy: { order: "asc" },
      include: { photos: { orderBy: { order: "asc" } } },
    });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// ---- Admin: categories ----
export const adminGalleryCategoriesRouter = Router();

adminGalleryCategoriesRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.galleryCategory.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { photos: true } } },
    });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

const categorySchema = z.object({
  key: z.string().min(1).regex(/^[a-z0-9-]+$/, "Key must be lowercase letters, numbers, and hyphens only"),
  order: z.number().int(),
  labelEn: z.string().min(1),
  labelKa: z.string().min(1),
  labelRu: z.string().min(1),
});

adminGalleryCategoriesRouter.post("/", async (req, res, next) => {
  try {
    const data = categorySchema.parse({ order: 0, ...req.body });
    const existing = await prisma.galleryCategory.findUnique({ where: { key: data.key } });
    if (existing) throw new ApiError(409, "A category with this key already exists");
    const row = await prisma.galleryCategory.create({ data });
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
});

adminGalleryCategoriesRouter.put("/:id", async (req, res, next) => {
  try {
    const data = categorySchema.partial().parse(req.body);
    const row = await prisma.galleryCategory.update({ where: { id: req.params.id }, data });
    res.json(row);
  } catch (err) {
    next(err);
  }
});

adminGalleryCategoriesRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.galleryCategory.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    next(err instanceof Error ? new ApiError(404, "Category not found") : err);
  }
});

// ---- Admin: photos (bulk-addable to any category) ----
export const adminGalleryPhotosRouter = Router();

adminGalleryPhotosRouter.get("/", async (req, res, next) => {
  try {
    const where = req.query.categoryId ? { categoryId: String(req.query.categoryId) } : {};
    const rows = await prisma.galleryPhoto.findMany({ where, orderBy: [{ categoryId: "asc" }, { order: "asc" }] });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

const photoSchema = z.object({
  categoryId: z.string().min(1),
  imageUrl: z.string().min(1),
  thumbUrl: z.string().nullable().optional(),
  order: z.number().int(),
});

adminGalleryPhotosRouter.post("/", async (req, res, next) => {
  try {
    const data = photoSchema.parse({ order: 0, ...req.body });
    const category = await prisma.galleryCategory.findUnique({ where: { id: data.categoryId } });
    if (!category) throw new ApiError(400, "Unknown category");
    const row = await prisma.galleryPhoto.create({ data });
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
});

adminGalleryPhotosRouter.put("/:id", async (req, res, next) => {
  try {
    const data = photoSchema.partial().parse(req.body);
    const row = await prisma.galleryPhoto.update({ where: { id: req.params.id }, data });
    res.json(row);
  } catch (err) {
    next(err);
  }
});

adminGalleryPhotosRouter.delete("/:id", async (req, res, next) => {
  try {
    const photo = await prisma.galleryPhoto.delete({ where: { id: req.params.id } });
    deleteUploadedFile(photo.imageUrl);
    res.status(204).end();
  } catch (err) {
    next(err instanceof Error ? new ApiError(404, "Photo not found") : err);
  }
});
