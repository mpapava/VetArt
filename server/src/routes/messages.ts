import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../middleware/errorHandler.js";

export const messagesRouter = Router();

const messageSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  message: z.string().min(1),
});

messagesRouter.post("/", async (req, res, next) => {
  try {
    const data = messageSchema.parse(req.body);
    const row = await prisma.contactMessage.create({ data });
    res.status(201).json({ id: row.id });
  } catch (err) {
    next(err);
  }
});

export const adminMessagesRouter = Router();

adminMessagesRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

const statusSchema = z.object({ status: z.enum(["NEW", "CONTACTED", "DONE"]) });

adminMessagesRouter.patch("/:id", async (req, res, next) => {
  try {
    const data = statusSchema.parse(req.body);
    const row = await prisma.contactMessage.update({ where: { id: req.params.id }, data });
    res.json(row);
  } catch (err) {
    next(err);
  }
});

adminMessagesRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.contactMessage.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    next(err instanceof Error ? new ApiError(404, "Message not found") : err);
  }
});
