import { z } from 'zod';

/**
 * Input validation and sanitization utilities
 */

// Sanitize string input by removing potentially dangerous characters
export const sanitizeString = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags with content
    .replace(/<[^>]*>/g, '') // Remove remaining HTML tags
    .replace(/[<>]/g, '') // Remove any remaining angle brackets
    .trim()
    .slice(0, 10000); // Limit length to prevent abuse
};

// Sanitize phone number — keep digits, +, -, spaces, parentheses only
export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^\d\s\+\-\(\)]/g, '').trim().slice(0, 20);
};

// Sanitize email input
export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim().slice(0, 254);
};

// Validation schemas
export const leadSubmissionSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z.string()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Phone number contains invalid characters'),
  service: z.string()
    .min(1, 'Please select a service')
    .max(50, 'Service value is too long')
    .optional(),
  message: z.string()
    .max(2000, 'Message must be less than 2000 characters')
    .optional(),
  source: z.string().optional(),
});

export const cmsItemSchema = z.object({
  type: z.enum(['post', 'video', 'portfolio']),
  title: z.object({
    en: z.string().min(1).max(200),
    ar: z.string().min(1).max(200),
  }),
  description: z.object({
    en: z.string().min(1).max(500),
    ar: z.string().min(1).max(500),
  }),
  category: z.string().min(1).max(50),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
export type ValidatedCMSItem = z.infer<typeof cmsItemSchema>;

// Validation functions
export const validateLeadSubmission = (data: unknown) => {
  return leadSubmissionSchema.safeParse(data);
};

export const validateCMSItem = (data: unknown) => {
  return cmsItemSchema.safeParse(data);
};

// Sanitize lead submission data
export const sanitizeLeadSubmission = (data: {
  name: string;
  phone: string;
  service?: string;
  message?: string;
  source?: string;
}): LeadSubmission => {
  return {
    name: sanitizeString(data.name),
    phone: sanitizePhone(data.phone),
    service: data.service ? sanitizeString(data.service) : undefined,
    message: data.message ? sanitizeString(data.message) : undefined,
    source: data.source ? sanitizeString(data.source) : undefined,
  };
};