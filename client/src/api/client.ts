import type {
  Service, Doctor, GalleryCategory, GalleryCategoryAdmin, GalleryPhoto, BlogListItem, BlogPost, Testimonial, Settings,
  PageContentRow, AppointmentRequest, ContactMessage, RequestStatus,
} from "./types";

const API_BASE = `${import.meta.env.BASE_URL}api`.replace(/\/+$/, "");

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ---- Public endpoints ----
export const getContent = <T,>(key: string) => request<PageContentRow<T>>(`/content/${key}`);
export const getServices = () => request<Service[]>("/services");
export const getDoctors = () => request<Doctor[]>("/doctors");
export const getGallery = () => request<GalleryCategory[]>("/gallery");
export const getBlogList = () => request<BlogListItem[]>("/blog");
export const getBlogPost = (slug: string) => request<BlogPost>(`/blog/${slug}`);
export const getTestimonials = () => request<Testimonial[]>("/testimonials");
export const getSettings = () => request<Settings>("/settings");
export const postAppointment = (data: Record<string, unknown>) =>
  request<{ id: string }>("/appointments", { method: "POST", body: JSON.stringify(data) });
export const postMessage = (data: Record<string, unknown>) =>
  request<{ id: string }>("/messages", { method: "POST", body: JSON.stringify(data) });

// ---- Admin auth ----
const TOKEN_KEY = "vetart-admin-token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function adminRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  return request<T>(path, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${getToken() || ""}` },
  });
}

export type AdminRole = "ADMIN" | "VIEWER";

export const adminLogin = (email: string, password: string) =>
  request<{ token: string; admin: { id: string; email: string; role: AdminRole } }>("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
export const adminMe = () => adminRequest<{ id: string; email: string; role: AdminRole }>("/admin/auth/me");

// ---- Admin content ----
export const adminGetAllContent = () => adminRequest<PageContentRow[]>("/admin/content");
export const adminPutContent = (key: string, data: { dataEn: object; dataKa: object; dataRu: object }) =>
  adminRequest<PageContentRow>(`/admin/content/${key}`, { method: "PUT", body: JSON.stringify(data) });

// ---- Admin settings ----
export const adminGetSettings = () => adminRequest<Settings>("/admin/settings");
export const adminPutSettings = (data: Settings) =>
  adminRequest<Settings>("/admin/settings", { method: "PUT", body: JSON.stringify(data) });

// ---- Generic admin CRUD factory ----
function crud<T extends { id: string }>(resource: string) {
  return {
    list: () => adminRequest<T[]>(`/admin/${resource}`),
    create: (data: Partial<T>) => adminRequest<T>(`/admin/${resource}`, { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<T>) =>
      adminRequest<T>(`/admin/${resource}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: string) => adminRequest<void>(`/admin/${resource}/${id}`, { method: "DELETE" }),
  };
}

export const adminServices = crud<Service>("services");
export const adminDoctors = crud<Doctor>("doctors");
export const adminBlog = crud<BlogPost>("blog");
export const adminTestimonials = crud<Testimonial>("testimonials");

// ---- Admin gallery: categories (albums) + photos ----
export const adminGalleryCategories = crud<GalleryCategoryAdmin>("gallery-categories");

export const adminListGalleryPhotos = (categoryId?: string) =>
  adminRequest<GalleryPhoto[]>(`/admin/gallery-photos${categoryId ? `?categoryId=${categoryId}` : ""}`);
export const adminCreateGalleryPhoto = (data: { categoryId: string; imageUrl: string; thumbUrl?: string; order?: number }) =>
  adminRequest<GalleryPhoto>("/admin/gallery-photos", { method: "POST", body: JSON.stringify(data) });
export const adminDeleteGalleryPhoto = (id: string) =>
  adminRequest<void>(`/admin/gallery-photos/${id}`, { method: "DELETE" });

// ---- Admin messages / appointments ----
export const adminGetAppointments = () => adminRequest<AppointmentRequest[]>("/admin/appointments");
export const adminSetAppointmentStatus = (id: string, status: RequestStatus) =>
  adminRequest<AppointmentRequest>(`/admin/appointments/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
export const adminDeleteAppointment = (id: string) =>
  adminRequest<void>(`/admin/appointments/${id}`, { method: "DELETE" });

export const adminGetMessages = () => adminRequest<ContactMessage[]>("/admin/messages");
export const adminSetMessageStatus = (id: string, status: RequestStatus) =>
  adminRequest<ContactMessage>(`/admin/messages/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
export const adminDeleteMessage = (id: string) =>
  adminRequest<void>(`/admin/messages/${id}`, { method: "DELETE" });

// ---- Admin upload ----
export interface UploadResult { url: string; thumbUrl: string; }
export const adminUpload = async (file: File): Promise<UploadResult> => {
  const form = new FormData();
  form.append("file", file);
  return adminRequest<UploadResult>("/admin/upload", { method: "POST", body: form });
};

export const resolveAssetUrl = (url: string | null | undefined): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith("http") || url.startsWith("data:")) return url;
  // stored as /api/uploads/xxx -> serve relative to our API base's parent (the app base)
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  return `${base}${url}`;
};
