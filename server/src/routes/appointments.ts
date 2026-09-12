import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../middleware/errorHandler.js";

export const appointmentsRouter = Router();

const appointmentSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  petName: z.string().min(1),
  service: z.string().min(1),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
});

appointmentsRouter.post("/", async (req, res, next) => {
  try {
    const data = appointmentSchema.parse(req.body);
    const row = await prisma.appointmentRequest.create({ data });
    res.status(201).json({ id: row.id });
  } catch (err) {
    next(err);
  }
});

export const adminAppointmentsRouter = Router();

adminAppointmentsRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await prisma.appointmentRequest.findMany({ orderBy: { createdAt: "desc" } });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

const statusSchema = z.object({ status: z.enum(["NEW", "CONTACTED", "DONE"]) });

adminAppointmentsRouter.patch("/:id", async (req, res, next) => {
  try {
    const data = statusSchema.parse(req.body);
    const row = await prisma.appointmentRequest.update({ where: { id: req.params.id }, data });
    res.json(row);
  } catch (err) {
    next(err);
  }
});

adminAppointmentsRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.appointmentRequest.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    next(err instanceof Error ? new ApiError(404, "Request not found") : err);
  }
});
