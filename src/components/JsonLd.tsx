/**
 * JsonLd — Structured data injection component.
 * Renders JSON-LD scripts for SEO (Organization, BreadcrumbList, WebSite schemas).
 * Usage: mount on each page with appropriate props.
 */

import { Helmet } from "react-helmet-async";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface JsonLdProps {
  type: "home" | "portfolio" | "project" | "insights" | "article" | "pricing";
  breadcrumbs?: BreadcrumbItem[];
  articleTitle?: string;
  articleDescription?: string;
  articleImage?: string;
  articleDate?: string;
}

// ─── Schemas ─────────────────────────────────────────────────────────────────

// TODO: Replace placeholder social URLs with real handles before launch
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AGORA Media",
  url: "https://agoramedia.agency",
  logo: "https://agoramedia.agency/og-image.png",
  description:
    "Premium digital marketing agency specializing in performance marketing, creative strategy, and brand growth across Egypt and MENA.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "EG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    // TODO: Replace with real WhatsApp number
    telephone: "+201000000000",
    availableLanguage: ["English", "Arabic"],
  },
  sameAs: [
    // TODO: Replace with real social profile URLs
    "https://www.instagram.com/agoramedia",
    "https://www.facebook.com/agoramedia",
    "https://www.linkedin.com/company/agoramedia",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AGORA Media",
  url: "https://agoramedia.agency",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://agoramedia.agency/insights?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const buildArticleSchema = (
  title: string,
  description: string,
  image?: string,
  date?: string
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  image: image ?? "https://agoramedia.agency/og-image.png",
  datePublished: date ?? new Date().toISOString(),
  author: {
    "@type": "Organization",
    name: "AGORA Media",
  },
  publisher: {
    "@type": "Organization",
    name: "AGORA Media",
    logo: {
      "@type": "ImageObject",
      url: "https://agoramedia.agency/og-image.png",
    },
  },
});

// ─── Component ───────────────────────────────────────────────────────────────

const JsonLd = ({
  type,
  breadcrumbs,
  articleTitle,
  articleDescription,
  articleImage,
  articleDate,
}: JsonLdProps) => {
  const schemas: object[] = [];

  // Organization + WebSite schema on home page
  if (type === "home") {
    schemas.push(ORGANIZATION_SCHEMA, WEBSITE_SCHEMA);
  }

  // Breadcrumb schema on detail pages
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(buildBreadcrumbSchema(breadcrumbs));
  }

  // Article schema on insight detail pages
  if (
    type === "article" &&
    articleTitle &&
    articleDescription
  ) {
    schemas.push(
      buildArticleSchema(
        articleTitle,
        articleDescription,
        articleImage,
        articleDate
      )
    );
  }

  if (schemas.length === 0) return null;

  return (
    <Helmet>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default JsonLd;
