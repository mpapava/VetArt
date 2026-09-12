import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadsDir = path.join(__dirname, "..", "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

export const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExt.has(ext)) {
      cb(new Error("Unsupported file type"));
      return;
    }
    cb(null, true);
  },
});

/** Delete an uploaded file (by its public /api/uploads/... URL) and its -thumb sibling, if any. Silently no-ops on anything it can't resolve. */
export function deleteUploadedFile(url: string | null | undefined): void {
  if (!url || !url.startsWith("/api/uploads/")) return;
  const filename = url.slice("/api/uploads/".length);
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  for (const name of [filename, `${base}-thumb${ext}`]) {
    const filePath = path.join(uploadsDir, name);
    fs.unlink(filePath, () => {
      /* ignore missing file */
    });
  }
}
