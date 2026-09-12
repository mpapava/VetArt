import { Router } from "express";
import path from "node:path";
import sharp from "sharp";
import { upload, uploadsDir } from "../lib/upload.js";
import { ApiError } from "../middleware/errorHandler.js";

export const uploadRouter = Router();

const THUMBNAILABLE = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const THUMB_MAX = 480;

uploadRouter.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, "No file uploaded");

    const ext = path.extname(req.file.filename).toLowerCase();
    const url = `/api/uploads/${req.file.filename}`;
    let thumbUrl = url;

    if (THUMBNAILABLE.has(ext)) {
      const thumbFilename = `${path.basename(req.file.filename, ext)}-thumb${ext}`;
      const thumbPath = path.join(uploadsDir, thumbFilename);
      try {
        await sharp(req.file.path)
          .resize({ width: THUMB_MAX, height: THUMB_MAX, fit: "inside", withoutEnlargement: true })
          .toFile(thumbPath);
        thumbUrl = `/api/uploads/${thumbFilename}`;
      } catch {
        // If thumbnailing fails for any reason, fall back to serving the original everywhere.
        thumbUrl = url;
      }
    }

    res.status(201).json({ url, thumbUrl });
  } catch (err) {
    next(err);
  }
});
