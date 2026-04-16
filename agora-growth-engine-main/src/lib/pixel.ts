/**
 * Centralized Facebook Pixel & Analytics Hub
 * Helps prevent scattered window.fbq calls across UI components.
 */

import { config } from './config';

interface FBQObject {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: (...args: unknown[]) => void;
}

declare global {
  interface Window {
    fbq?: FBQObject;
    _fbq?: FBQObject;
  }
}

export const initPixel = () => {
  if (!config.fbPixelId) return;
  if (typeof window === 'undefined') return;
  if (window.fbq) return; // Already initialized

  const n: FBQObject = Object.assign(
    function (...args: unknown[]) {
      if (n.callMethod) {
        n.callMethod(...args);
      } else {
        n.queue.push(args);
      }
    },
    {
      callMethod: undefined,
      queue: [] as unknown[][],
      loaded: true,
      version: '2.0',
      push: function (...args: unknown[]) {
        n.queue.push(args);
      },
    }
  );

  window.fbq = n;
  window._fbq ??= n;

  // Inject FB Pixel script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript?.parentNode?.insertBefore(script, firstScript);

  window.fbq('init', config.fbPixelId);
};

export const trackEvent = (eventName: string, data?: object) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const standardEvents = ['PageView', 'Lead', 'Contact', 'CompleteRegistration', 'ViewContent'];
    if (standardEvents.includes(eventName)) {
      window.fbq('track', eventName, data);
    } else {
      window.fbq('trackCustom', eventName, data);
    }
  } else {
    console.debug(`[Analytics Tracker] Event: ${eventName}`, data ?? '');
  }
};
