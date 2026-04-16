/**
 * Breadcrumb — Reusable navigation trail component.
 * RTL-aware (arrow direction flips), styled in the glassmorphism system.
 * Also injects JSON-LD BreadcrumbList schema via react-helmet-async.
 */

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Route path — omit for the last (current) item */
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Base URL for JSON-LD schema (default: https://agoramedia.agency) */
  baseUrl?: string;
}

const Breadcrumb = ({ items, baseUrl = "https://agoramedia.agency" }: BreadcrumbProps) => {
  // Build JSON-LD schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className="w-3 h-3 text-muted-foreground/40 flex-shrink-0 rtl:rotate-180"
                  aria-hidden="true"
                />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="text-xs font-display uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`text-xs font-display uppercase tracking-widest ${
                    isLast ? "text-foreground" : "text-muted-foreground"
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
};

export default Breadcrumb;
