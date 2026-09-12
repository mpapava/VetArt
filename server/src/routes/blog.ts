import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../middleware/errorHandler.js";

export const blogRouter = Router();

blogRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true, slug: true, tagEn: true, tagKa: true, tagRu: true,
        titleEn: true, titleKa: true, titleRu: true,
        excerptEn: true, excerptKa: true, excerptRu: true,
        coverImageUrl: true, publishedAt: true,
      },
    });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

blogRouter.get("/:slug", async (req, res, next) => {
  try {
    const row = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } });
    if (!row || !row.published) throw new ApiError(404, "Post not found");
    res.json(row);
  } catch (err) {
    next(err);
  }
});

export const adminBlogRouter = Router();

adminBlogRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

const blogSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  tagEn: z.string().min(1),
  tagKa: z.string().min(1),
  tagRu: z.string().min(1),
  titleEn: z.string().min(1),
  titleKa: z.string().min(1),
  titleRu: z.string().min(1),
  excerptEn: z.string().min(1),
  excerptKa: z.string().min(1),
  excerptRu: z.string().min(1),
  bodyEn: z.string().min(1),
  bodyKa: z.string().min(1),
  bodyRu: z.string().min(1),
  coverImageUrl: z.string().nullable().optional(),
  published: z.boolean().default(true),
});

adminBlogRouter.post("/", async (req, res, next) => {
  try {
    const data = blogSchema.parse(req.body);
    const existing = await prisma.blogPost.findUnique({ where: { slug: data.slug } });
    if (existing) throw new ApiError(409, "A post with this slug already exists");
    const row = await prisma.blogPost.create({ data });
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
});

adminBlogRouter.put("/:id", async (req, res, next) => {
  try {
    const data = blogSchema.partial().parse(req.body);
    const row = await prisma.blogPost.update({ where: { id: req.params.id }, data });
    res.json(row);
  } catch (err) {
    next(err);
  }
});

adminBlogRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    next(err instanceof Error ? new ApiError(404, "Post not found") : err);
  }
});
