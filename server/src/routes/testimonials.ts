import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../middleware/errorHandler.js";

export const testimonialsRouter = Router();

testimonialsRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.testimonial.findMany({ where: { published: true }, orderBy: { order: "asc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export const adminTestimonialsRouter = Router();

adminTestimonialsRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

const testimonialSchema = z.object({
  order: z.number().int(),
  authorName: z.string().min(1),
  petName: z.string().nullable().optional(),
  rating: z.number().int().min(1).max(5),
  quoteEn: z.string().nullable().optional(),
  quoteKa: z.string().nullable().optional(),
  quoteRu: z.string().nullable().optional(),
  published: z.boolean(),
});

adminTestimonialsRouter.post("/", async (req, res, next) => {
  try {
    const data = testimonialSchema.parse({ order: 0, rating: 5, published: true, ...req.body });
    const row = await prisma.testimonial.create({ data });
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
});

adminTestimonialsRouter.put("/:id", async (req, res, next) => {
  try {
    const data = testimonialSchema.partial().parse(req.body);
    const row = await prisma.testimonial.update({ where: { id: req.params.id }, data });
    res.json(row);
  } catch (err) {
    next(err);
  }
});

adminTestimonialsRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    next(err instanceof Error ? new ApiError(404, "Testimonial not found") : err);
  }
});
