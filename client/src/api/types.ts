export interface Service {
  id: string;
  order: number;
  icon: string;
  titleEn: string; titleKa: string; titleRu: string;
  descEn: string; descKa: string; descRu: string;
  active: boolean;
}

export interface Doctor {
  id: string;
  order: number;
  roleEn: string; roleKa: string; roleRu: string;
  titleEn: string; titleKa: string; titleRu: string;
  descEn: string; descKa: string; descRu: string;
  photoUrl?: string | null;
  photoThumbUrl?: string | null;
  active: boolean;
}

export interface GalleryPhoto {
  id: string;
  categoryId: string;
  imageUrl: string;
  thumbUrl?: string | null;
  order: number;
}

export interface GalleryCategory {
  id: string;
  key: string;
  order: number;
  labelEn: string; labelKa: string; labelRu: string;
  photos: GalleryPhoto[];
}

export interface GalleryCategoryAdmin {
  id: string;
  key: string;
  order: number;
  labelEn: string; labelKa: string; labelRu: string;
  _count: { photos: number };
}

export interface BlogListItem {
  id: string;
  slug: string;
  tagEn: string; tagKa: string; tagRu: string;
  titleEn: string; titleKa: string; titleRu: string;
  excerptEn: string; excerptKa: string; excerptRu: string;
  coverImageUrl?: string | null;
  coverThumbUrl?: string | null;
  publishedAt: string;
}

export interface BlogPost extends BlogListItem {
  bodyEn: string; bodyKa: string; bodyRu: string;
  published: boolean;
}

export interface Testimonial {
  id: string;
  order: number;
  authorName: string;
  petName?: string | null;
  rating: number;
  quoteEn?: string | null; quoteKa?: string | null; quoteRu?: string | null;
  published: boolean;
}

export interface Settings {
  phone: string;
  email: string;
  addressEn: string; addressKa: string; addressRu: string;
  facebookUrl: string;
  mapQuery: string;
  followerCount: string;
  recommendPercent: string;
  reviewCount: string;
}

export interface PageContentRow<T = Record<string, unknown>> {
  key: string;
  dataEn: T;
  dataKa: T;
  dataRu: T;
}

export interface HomeContent {
  eyebrow: string;
  heroTitleBefore: string; heroTitleAccent: string; heroTitleAfter: string;
  lede: string;
  doctorsTeaserTitle: string; doctorsTeaserDesc: string;
  reviewsQuote: string;
  contactDescHome: string;
  finalCtaTitle: string; finalCtaDesc: string;
}

export interface AboutCard { title: string; desc: string; }

export interface AboutContent {
  heroTitle: string; heroDesc: string;
  historyLabel: string; historyTitle: string; historyP1: string; historyP2: string;
  valuesLabel: string; valuesItems: string[];
  aboutLabel: string; aboutTitle: string; aboutP1: string; aboutP2: string;
  cards: AboutCard[];
}

export interface DoctorsPageContent { heroTitle: string; heroDesc: string; note: string; }
export interface GalleryPageContent { heroTitle: string; heroDesc: string; note: string; }
export interface BlogPageContent { heroTitle: string; heroDesc: string; moreComingNote: string; }
export interface ContactPageContent { pageDesc: string; hoursNote: string; }
export interface AppointmentStep { title: string; desc: string; }
export interface AppointmentPageContent {
  heroTitle: string; heroDesc: string;
  stepsLabel: string; stepsTitle: string;
  steps: AppointmentStep[];
  note: string;
}

export type RequestStatus = "NEW" | "CONTACTED" | "DONE";

export interface AppointmentRequest {
  id: string;
  name: string;
  phone: string;
  petName: string;
  service: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  notes?: string | null;
  status: RequestStatus;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: RequestStatus;
  createdAt: string;
}
