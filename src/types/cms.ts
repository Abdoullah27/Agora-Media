export type ContentType = 'post' | 'video' | 'portfolio';

export interface BilingualString {
  en: string;
  ar: string;
}

export interface SEOFields {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  ogImage?: string;
}

export interface BaseContent {
  id: string;
  slug: string; // Used for dynamic routing (e.g., /portfolio/my-project)
  title: BilingualString;
  description: BilingualString; // Used as summary or short description
  category: string; // The backend strict category
  createdAt: string; // Auto-generated timestamp
  seo?: SEOFields; // Dynamic SEO injection
}

export interface Post extends BaseContent {
  type: 'post';
  imageUrl?: string; // Cover image
  link?: string;
  driveLink?: string;
  content: BilingualString;
  excerpt?: BilingualString; // Short summary
}

export interface Video extends BaseContent {
  type: 'video';
  videoUrl: string; // YouTube or direct link
  thumbnailUrl?: string; // Optional custom thumbnail
}

export interface PortfolioItem extends BaseContent {
  type: 'portfolio';
  challenge?: BilingualString; // The Problem
  strategy?: BilingualString; // The Solution
  result?: BilingualString; // The Outcome / ROAS
  fullDescription?: BilingualString; // Extra case study details
  projectDate: string; // YYYY-MM-DD
  imageUrl: string; // Base64 or URL for the primary project image
  link?: string; // External preview link
  driveLink?: string;
  featured?: boolean; // Pinned to the top of grids
  tags: string[]; // E.g., ['UI/UX', 'Figma']
}

export type CMSItem = Post | Video | PortfolioItem;
