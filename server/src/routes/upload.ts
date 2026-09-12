import { Router } from "express";
import { upload } from "../lib/upload.js";
import { ApiError } from "../middleware/errorHandler.js";

export const uploadRouter = Router();

uploadRouter.post("/", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, "No file uploaded");
    res.status(201).json({ url: `/api/uploads/${req.file.filename}` });
  } catch (err) {
    next(err);
  }
});
