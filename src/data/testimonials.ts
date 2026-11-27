/**
 * Verified client testimonials data model.
 * Kept empty by default so no fictional reviews are ever displayed as real feedback.
 */

export interface VerifiedTestimonial {
  id: string;
  quote: string;
  authorName: string;
  businessName: string;
  serviceCategory: string;
  verifiedDate: string;
}

// Add verified client quotes here when supplied and approved for publication.
export const VERIFIED_TESTIMONIALS: VerifiedTestimonial[] = [];
