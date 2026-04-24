import { useEffect } from 'react';

/**
 * Performance monitoring hook for Core Web Vitals and custom metrics
 */
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Core Web Vitals monitoring
    const reportWebVitals = (metric: { name: string; value: number; id: string }) => {
      console.log('Web Vital:', metric);
    };

    // Monitor Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          const lcpEntry = entry as PerformanceEntry & { startTime: number };
          reportWebVitals({
            name: 'LCP',
            value: lcpEntry.startTime,
            id: 'v3-' + Date.now() + '-' + Math.random().toString(36).slice(2, 11),
          });
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observation not supported');
    }

    // Monitor First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        reportWebVitals({
          name: 'FID',
          value: (entry as any).processingStart - entry.startTime,
          id: 'v3-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        });
      }
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (_error) {
      console.warn('FID observation not supported');
    }

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shiftEntry = entry as LayoutShift;
        if (!shiftEntry.hadRecentInput) {
          clsValue += shiftEntry.value;
        }
      }
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (_error) {
      console.warn('CLS observation not supported');
    }

    // Report CLS on page unload
    const reportCLS = () => {
      if (clsValue > 0) {
        reportWebVitals({
          name: 'CLS',
          value: clsValue,
          id: 'v3-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        });
      }
    };

    window.addEventListener('beforeunload', reportCLS);

    return () => {
      observer.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      window.removeEventListener('beforeunload', reportCLS);
    };
  }, []);
};

/**
 * Custom performance measurement utility
 */
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return end - start;
};

/**
 * Bundle size monitoring
 */
export const logBundleSize = () => {
  // This would be populated by build tools
  if (import.meta.env.DEV) {
    console.log('Bundle size monitoring active');
  }
};