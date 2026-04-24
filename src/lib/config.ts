/**
 * Environment configuration
 * Centralized configuration management for different environments
 */

interface EnvironmentConfig {
  // API Configuration
  apiBaseUrl: string;
  leadWebhookUrl: string;

  // Authentication
  adminPassword: string;

  // Analytics & Tracking
  fbPixelId: string;

  // Feature Flags
  enableAnalytics: boolean;
  enableErrorReporting: boolean;

  // Performance
  enablePerformanceMonitoring: boolean;

  // Development
  isDevelopment: boolean;
  isProduction: boolean;
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = import.meta.env;
  const isDevelopment = env.DEV;
  const isProduction = env.PROD;

  return {
    // API Configuration
    apiBaseUrl: env.VITE_API_BASE_URL ?? '',
    leadWebhookUrl: env.VITE_LEAD_WEBHOOK_URL ?? '',

    // Authentication (use environment variable in production)
    adminPassword: env.VITE_ADMIN_PASSWORD ?? 'admin123',

    // Analytics & Tracking
    fbPixelId: env.VITE_FB_PIXEL_ID ?? '',

    // Feature Flags
    enableAnalytics: env.VITE_ENABLE_ANALYTICS !== 'false',
    enableErrorReporting: env.VITE_ENABLE_ERROR_REPORTING === 'true',

    // Performance
    enablePerformanceMonitoring: env.VITE_ENABLE_PERFORMANCE_MONITORING !== 'false',

    // Environment flags
    isDevelopment,
    isProduction,
  };
};

export const config = getEnvironmentConfig();

// Validation in development
if (config.isDevelopment) {
  console.log('Environment Configuration:', {
    ...config,
    adminPassword: config.adminPassword ? '[REDACTED]' : undefined,
  });
}