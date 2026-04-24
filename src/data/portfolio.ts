export type PortfolioCategory = "Social Media Designs" | "Reels" | "Websites" | "Branding" | "3D Work";

export interface PortfolioItem {
  id: string;
  slug?: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  imageUrl: string;
  link?: string;
  tags: string[];
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    slug: "medicare-social-campaign",
    title: "MediCare Social Campaign",
    description: "A complete overhaul of MediCare clinic's social media presence resulting in 3x engagement.",
    category: "Social Media Designs",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173ff9e8eb8?auto=format&fit=crop&q=80&w=800",
    link: "https://instagram.com",
    tags: ["Healthcare", "Instagram", "Ads"]
  },
  {
    id: "2",
    slug: "luxfit-booking-app",
    title: "LuxFit Booking App",
    description: "Fast, conversion-optimized landing page and booking system for a premium gym.",
    category: "Websites",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "UI/UX", "Fitness"]
  },
  {
    id: "3",
    slug: "flavor-house-branding",
    title: "Flavor House Branding",
    description: "Complete visual identity, logo, and packaging design for a modern F&B brand.",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800",
    tags: ["Logo", "Identity", "F&B"]
  },
  {
    id: "4",
    slug: "techflow-launch-video",
    title: "TechFlow Launch Video",
    description: "High-paced reel explaining a B2B SaaS platform, generating thousands of shares.",
    category: "Reels",
    imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800",
    link: "https://tiktok.com",
    tags: ["Video Editing", "Motion", "B2B"]
  },
  {
    id: "5",
    slug: "cairo-dental-hub-seo",
    title: "Cairo Dental Hub SEO",
    description: "Corporate website built for maximum local SEO visibility and patient conversions.",
    category: "Websites",
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "SEO", "Medical"]
  },
  {
    id: "6",
    slug: "urban-style-grid",
    title: "Urban Style Grid",
    description: "Aesthetic IG grid puzzle and story templates for an urban clothing line.",
    category: "Social Media Designs",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    tags: ["Fashion", "Content", "Grid"]
  },
  {
    id: "7",
    slug: "agora-3d-product-launch",
    title: "Agora 3D Product Launch",
    description: "Immersive 3D animation reel for a luxury perfume brand launch across GCC markets.",
    category: "3D Work",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&q=80&w=800",
    tags: ["3D", "Motion", "Luxury"]
  },
  {
    id: "8",
    slug: "expandretail-brand-identity",
    title: "ExpandRetail Brand Identity",
    description: "Full brand identity system for a fast-growing retail chain — logo, guidelines, and packaging.",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    tags: ["Branding", "Retail", "Identity"]
  },
  {
    id: "9",
    slug: "elevatebeauty-reels-campaign",
    title: "ElevateBeauty Reels Campaign",
    description: "Series of 30 high-performance reels that drove 2M+ organic views for a beauty brand.",
    category: "Reels",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
    tags: ["Beauty", "Short-Form", "Viral"]
  }
];
