import { describe, it, expect } from "vitest";
import {
  sanitizeString,
  sanitizeEmail,
  validateLeadSubmission,
  validateCMSItem,
  sanitizeLeadSubmission
} from "../lib/validation";

describe("Input Validation & Sanitization", () => {
  describe("sanitizeString", () => {
    it("should remove HTML tags", () => {
      expect(sanitizeString("<script>alert('xss')</script>Hello")).toBe("Hello");
    });

    it("should trim whitespace", () => {
      expect(sanitizeString("  hello  ")).toBe("hello");
    });

    it("should limit length", () => {
      const longString = "a".repeat(10000);
      expect(sanitizeString(longString).length).toBeLessThanOrEqual(10000);
    });
  });

  describe("sanitizeEmail", () => {
    it("should convert to lowercase", () => {
      expect(sanitizeEmail("TEST@EXAMPLE.COM")).toBe("test@example.com");
    });

    it("should trim whitespace", () => {
      expect(sanitizeEmail(" test@example.com ")).toBe("test@example.com");
    });
  });

  describe("validateLeadSubmission", () => {
    it("should validate valid lead data", () => {
      // Schema uses name + phone (not email) — updated to match current schema
      const validData = {
        name: "John Doe",
        phone: "+201001234567",
        service: "service_social",
        message: "This is a test message.",
        source: "website"
      };

      const result = validateLeadSubmission(validData);
      expect(result.success).toBe(true);
    });

    it("should reject phone number that is too short", () => {
      const invalidData = {
        name: "John Doe",
        phone: "123",
        message: "Valid message"
      };

      const result = validateLeadSubmission(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject phone number with invalid characters", () => {
      const invalidData = {
        name: "John Doe",
        phone: "abc-not-a-phone",
        message: "Valid message"
      };

      const result = validateLeadSubmission(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject name that is too short", () => {
      const invalidData = {
        name: "J",
        phone: "+201001234567",
        message: "This is a valid message."
      };

      const result = validateLeadSubmission(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("sanitizeLeadSubmission", () => {
    it("should sanitize all fields", () => {
      const dirtyData = {
        name: "  <b>John Doe</b>  ",
        phone: "  +20 100 123 4567  ",
        service: "  service_social  ",
        message: "  <script>alert('xss')</script>Hello World!  ",
        source: "  website  "
      };

      const sanitized = sanitizeLeadSubmission(dirtyData);

      expect(sanitized.name).toBe("John Doe");
      expect(sanitized.phone).toBe("+20 100 123 4567");
      expect(sanitized.message).toBe("Hello World!");
      expect(sanitized.source).toBe("website");
    });
  });

  describe("validateCMSItem", () => {
    it("should validate valid CMS item", () => {
      const validItem = {
        type: "post" as const,
        title: { en: "Test Post", ar: "منشور تجريبي" },
        description: { en: "Description", ar: "وصف" },
        category: "blog",
        slug: "test-post"
      };

      const result = validateCMSItem(validItem);
      expect(result.success).toBe(true);
    });

    it("should reject invalid slug", () => {
      const invalidItem = {
        type: "post" as const,
        title: { en: "Test Post", ar: "منشور تجريبي" },
        description: { en: "Description", ar: "وصف" },
        category: "blog",
        slug: "Test Post With Spaces"
      };

      const result = validateCMSItem(invalidItem);
      expect(result.success).toBe(false);
    });
  });
});