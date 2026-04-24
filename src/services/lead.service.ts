import { apiClient } from "@/lib/apiClient";
import { trackEvent } from "@/lib/pixel";
import { validateLeadSubmission, sanitizeLeadSubmission } from "@/lib/validation";
import { config } from "@/lib/config";

/**
 * Service to handle Lead Generation submissions.
 * Architecture: Connect this to a Webhook (Make.com, Zapier, or Google Apps Script).
 * This completely secures Google API keys from the frontend client.
 */

export interface LeadSubmissionRequest {
  name: string;
  phone: string;
  service?: string;
  message?: string;
  source?: string;
}

export const submitLead = async (leadData: LeadSubmissionRequest) => {
  // Validate and sanitize input
  const sanitizedData = sanitizeLeadSubmission(leadData);
  const validation = validateLeadSubmission(sanitizedData);

  if (!validation.success) {
    throw new Error(`Validation failed: ${validation.error.errors.map(e => e.message).join(', ')}`);
  }

  const validatedData = validation.data;

  // If no env webhook is provided, use Formspree or generic console debug fallback logic
  const webhookUrl = config.leadWebhookUrl;

  if (!webhookUrl) {
    console.warn("⚠️ No Webhook URL configured (VITE_LEAD_WEBHOOK_URL). Running in dev simulator mode.");

    // Simulate API delay
    await new Promise(res => setTimeout(res, 1200));

    // Track Lead conversion pixel
    trackEvent("Lead", { content_name: 'Contact Form Simulator', currency: 'USD' });

    return { success: true, message: "Lead simulated successfully" };
  }

  // Real secure transmission
  try {
    const response = await apiClient<unknown>(webhookUrl, {
      data: validatedData
    });

    trackEvent("Lead", { content_category: 'Contact Submission' });
    return { success: true, data: response };
  } catch (error: unknown) {
    console.error("Failed to submit lead", error);
    throw error;
  }
};
