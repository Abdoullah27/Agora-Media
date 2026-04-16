import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

// TODO: Replace with the real WhatsApp/phone number before launch
const AGENCY_PHONE = "+201000000000";

type NavLink =
  | { label: string; type: "hash"; href: string }
  | { label: string; type: "route"; href: string };

const navLinks: NavLink[] = [
  { label: "services",  type: "hash",  href: "#services" },
  { label: "projects",  type: "route", href: "/portfolio" },
  { label: "pricing",   type: "route", href: "/pricing" },
  { label: "insights",  type: "route", href: "/insights" },
  { label: "process",   type: "hash",  href: "#process" },
];

// ─── Active-state resolver ───────────────────────────────────────────────────
// Returns true when the current page "belongs" to this nav item.
const isActive = (link: NavLink, pathname: string, isHome: boolean): boolean => {
  if (link.type === "route") {
    // Exact match, or /portfolio/* matches /portfolio
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  }
  // Hash links are only "active" when on the home page
  return isHome;
};

// ─── Component ────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" aria-label="Main navigation">
      <div className="glass-card mx-4 mt-6 !rounded-full px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="font-greek text-xl font-bold tracking-[0.4em] text-white uppercase"
          aria-label="AGORA Media — Home"
        >
          AGORA<span className="text-white/40">Media</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const active = isActive(link, location.pathname, isHome);
            const baseClass = `glass-button !py-2 !px-5 text-[10px] transition-colors relative font-greek tracking-[0.2em] uppercase ${
              active
                ? "text-white !border-white/30 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-white"
                : "text-white/40 hover:text-white"
            }`;

            if (link.type === "route") {
              return (
                <Link key={link.href} to={link.href} className={baseClass}>
                  {t(`nav.${link.label}`) || link.label}
                </Link>
              );
            }

            const resolvedHref = isHome ? link.href : `/${link.href}`;
            return (
              <a key={link.href} href={resolvedHref} className={baseClass}>
                {t(`nav.${link.label}`) || link.label}
              </a>
            );
          })}

          <div className="w-px h-6 bg-border mx-2" aria-hidden="true" />
          <LanguageSwitcher />

          {/* WhatsApp / Tel quick-call link */}
          <a
            href={`tel:${AGENCY_PHONE}`}
            className="glass-button !py-2 !px-4 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5"
            aria-label={`Call us at ${AGENCY_PHONE}`}
          >
            <Phone className="w-3 h-3 text-accent" aria-hidden="true" />
            <span className="hidden lg:inline">{AGENCY_PHONE}</span>
            <span className="inline lg:hidden">Call</span>
          </a>

          {/* Primary CTA */}
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="rounded-full bg-white text-black px-8 py-3 text-[10px] font-greek font-black tracking-[0.3em] hover:bg-zinc-200 transition-all uppercase shadow-[0_0_30px_rgba(255,255,255,0.1)] ml-2"
          >
            {t("nav.contact")}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground p-1"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            className="absolute top-full left-4 right-4 mt-2 glass-card p-6 md:hidden flex flex-col gap-3 z-50"
          >
            {navLinks.map((link) => {
              const active = isActive(link, location.pathname, isHome);
              const mobileClass = `font-greek font-bold text-xs tracking-widest py-3 transition-colors uppercase ${
                active ? "text-white border-b border-white/20" : "text-white/40 hover:text-white"
              }`;

              if (link.type === "route") {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={mobileClass}
                    aria-current={active ? "page" : undefined}
                  >
                    {t(`nav.${link.label}`) || link.label}
                  </Link>
                );
              }

              const resolvedHref = isHome ? link.href : `/${link.href}`;
              return (
                <a
                  key={link.href}
                  href={resolvedHref}
                  onClick={() => setOpen(false)}
                  className={mobileClass}
                >
                  {t(`nav.${link.label}`) || link.label}
                </a>
              );
            })}

            {/* Mobile tel link */}
            <a
              href={`tel:${AGENCY_PHONE}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2 font-display"
              onClick={() => setOpen(false)}
            >
              <Phone className="w-4 h-4 text-accent" aria-hidden="true" />
              <span>{AGENCY_PHONE}</span>
            </a>

            <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
              <LanguageSwitcher />
              <a
                href={isHome ? "#contact" : "/#contact"}
                onClick={() => setOpen(false)}
                className="rounded-full bg-white text-black px-10 py-4 text-[10px] font-greek font-black tracking-[0.3em] hover:bg-zinc-200 transition-all uppercase"
              >
                {t("nav.contact")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
