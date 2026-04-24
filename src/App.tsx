import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LenisProvider from "@/components/LenisProvider";
import MagneticCursor from "@/components/MagneticCursor";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index.tsx";
import ThankYou from "./pages/ThankYou.tsx";
import NotFound from "./pages/NotFound.tsx";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import CookieConsent, { getConsent } from "@/components/CookieConsent";
import { CMSProvider } from "@/context/CMSContext";
import { initPixel, trackEvent } from "@/lib/pixel";
import { useTranslation } from "react-i18next";
import { usePerformanceMonitoring } from "@/hooks/use-performance-monitoring";

const Portfolio = React.lazy(() => import(/* webpackChunkName: "portfolio" */ "./pages/Portfolio.tsx"));
const ProjectDetail = React.lazy(() => import(/* webpackChunkName: "project-detail" */ "./pages/ProjectDetail.tsx"));
const Pricing = React.lazy(() => import(/* webpackChunkName: "pricing" */ "./pages/Pricing.tsx"));
const Insights = React.lazy(() => import(/* webpackChunkName: "insights" */ "./pages/Insights.tsx"));
const InsightDetail = React.lazy(() => import(/* webpackChunkName: "insight-detail" */ "./pages/InsightDetail.tsx"));
const AdminLogin = React.lazy(() => import(/* webpackChunkName: "admin-login" */ "./pages/admin/AdminLogin.tsx"));
const AdminDashboard = React.lazy(() => import(/* webpackChunkName: "admin-dashboard" */ "./pages/admin/AdminDashboard.tsx"));

// --- Route Tracker Component for FB Pixel ---
const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackEvent("PageView", { page: location.pathname });
  }, [location]);
  
  return null;
};

const App = () => {
  const { i18n } = useTranslation();

  // Performance monitoring
  usePerformanceMonitoring();

  useEffect(() => {
    // GDPR: Only initialise Pixel if user has already accepted analytics cookies
    if (getConsent() === "all") {
      initPixel();
    }

    // Listen for consent being granted in this session (without page reload)
    const handleConsent = (e: Event) => {
      const level = (e as CustomEvent<{ level: string }>).detail.level;
      if (level === "all") {
        initPixel();
      }
    };

    window.addEventListener("agora:consent", handleConsent);
    return () => window.removeEventListener("agora:consent", handleConsent);
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <RouteTracker />
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <CMSProvider>
                <div className={`min-h-screen bg-background relative overflow-x-hidden selection:bg-accent/30 selection:text-white ${i18n.dir() === 'rtl' ? 'font-arabic' : 'font-display'}`} dir={i18n.dir()}>
                  <LenisProvider>
                    <MagneticCursor />
                    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-background text-accent">Loading...</div>}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/portfolio/:slug" element={<ProjectDetail />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/insights" element={<Insights />} />
                        <Route path="/insights/:slug" element={<InsightDetail />} />
                        <Route path="/thank-you" element={<ThankYou />} />
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                    <WhatsAppWidget />
                    {/* Cookie consent must render after WhatsApp to ensure correct z-index stacking */}
                    <CookieConsent />
                  </LenisProvider>
                </div>
              </CMSProvider>
            </TooltipProvider>
          </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;

