import "dotenv/config";
import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import { contentRouter, adminContentRouter } from "./routes/content.js";
import { servicesRouter, adminServicesRouter } from "./routes/services.js";
import { doctorsRouter, adminDoctorsRouter } from "./routes/doctors.js";
import { galleryRouter, adminGalleryCategoriesRouter, adminGalleryPhotosRouter } from "./routes/gallery.js";
import { blogRouter, adminBlogRouter } from "./routes/blog.js";
import { testimonialsRouter, adminTestimonialsRouter } from "./routes/testimonials.js";
import { settingsRouter, adminSettingsRouter } from "./routes/settings.js";
import { appointmentsRouter, adminAppointmentsRouter } from "./routes/appointments.js";
import { messagesRouter, adminMessagesRouter } from "./routes/messages.js";
import { uploadRouter } from "./routes/upload.js";
import { requireAuth, blockViewerWrites, blockViewerEntirely } from "./middleware/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { uploadsDir } from "./lib/upload.js";

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use("/api/uploads", express.static(uploadsDir));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Public routes
app.use("/api/content", contentRouter);
app.use("/api/services", servicesRouter);
app.use("/api/doctors", doctorsRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/blog", blogRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/admin/auth", authRouter);

// Admin routes (JWT-protected)
app.use("/api/admin/content", requireAuth, blockViewerWrites, adminContentRouter);
app.use("/api/admin/services", requireAuth, blockViewerWrites, adminServicesRouter);
app.use("/api/admin/doctors", requireAuth, blockViewerWrites, adminDoctorsRouter);
app.use("/api/admin/gallery-categories", requireAuth, blockViewerWrites, adminGalleryCategoriesRouter);
app.use("/api/admin/gallery-photos", requireAuth, blockViewerWrites, adminGalleryPhotosRouter);
app.use("/api/admin/blog", requireAuth, blockViewerWrites, adminBlogRouter);
app.use("/api/admin/testimonials", requireAuth, blockViewerWrites, adminTestimonialsRouter);
app.use("/api/admin/settings", requireAuth, blockViewerWrites, adminSettingsRouter);
// Real customer PII — off-limits to the demo VIEWER account entirely.
app.use("/api/admin/appointments", requireAuth, blockViewerEntirely, adminAppointmentsRouter);
app.use("/api/admin/messages", requireAuth, blockViewerEntirely, adminMessagesRouter);
app.use("/api/admin/upload", requireAuth, blockViewerWrites, uploadRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`vetart-api listening on port ${port}`);
});
