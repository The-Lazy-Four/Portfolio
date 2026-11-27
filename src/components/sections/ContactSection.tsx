"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SITE_CONFIG, getWhatsAppUrl } from "@/config/site";
import { SERVICE_CATEGORIES } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  initialService?: string;
}

interface FormState {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  projectDescription: string;
}

interface SubmissionFeedback {
  status: "idle" | "submitting" | "delivered" | "unconfigured" | "error";
  message: string;
}

/** Renders the closing contact section on a dark-purple surface while keeping live /api/contact validation intact. */
export function ContactSection({ initialService = "" }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { setActiveSceneIndex } = useCinemaEngine();
  const whatsAppUrl = getWhatsAppUrl();
  const hasEmail = Boolean(SITE_CONFIG.contact.email);
  const configuredSocials = SITE_CONFIG.socialLinks.filter(
    (s) => s.configured && s.href
  );

  const [formState, setFormState] = useState<FormState>({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    serviceRequired: initialService || SERVICE_CATEGORIES[0].title,
    projectDescription: "",
  });

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const [feedback, setFeedback] = useState<SubmissionFeedback>({
    status: "idle",
    message: "",
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom bottom",
        onEnter: () => setActiveSceneIndex(6),
        onEnterBack: () => setActiveSceneIndex(6),
      });
    }, section);

    return () => ctx.revert();
  }, [setActiveSceneIndex]);

  /** Validates every contact input client-side before posting to the server route. */
  function validateForm(): boolean {
    const errors: Partial<Record<keyof FormState, string>> = {};

    if (!formState.name.trim() || formState.name.trim().length < 2) {
      errors.name = "Please enter your name.";
    }
    if (!formState.businessName.trim()) {
      errors.businessName = "Please share your business or project name.";
    }
    if (
      !formState.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())
    ) {
      errors.email = "Please enter a valid email address.";
    }
    if (
      !formState.phone.trim() ||
      formState.phone.replace(/[^\d+]/g, "").length < 7
    ) {
      errors.phone = "Please provide a reachable phone or WhatsApp number.";
    }
    if (!formState.serviceRequired) {
      errors.serviceRequired = "Please select a primary scope.";
    }
    if (
      !formState.projectDescription.trim() ||
      formState.projectDescription.trim().length < 15
    ) {
      errors.projectDescription =
        "Please include a short description of what you need (at least 15 characters).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  /** Posts validated enquiry payload to /api/contact and reports exact delivery status. */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback({ status: "idle", message: "" });

    if (!validateForm()) {
      return;
    }

    setFeedback({
      status: "submitting",
      message: "Submitting your enquiry...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = (await response.json()) as {
        status?: string;
        message?: string;
      };

      if (response.ok && data.status === "delivered") {
        setFeedback({
          status: "delivered",
          message:
            data.message ||
            "Thank you. Your enquiry has been delivered cleanly to Web Guru.",
        });
        setFormState({
          name: "",
          businessName: "",
          email: "",
          phone: "",
          serviceRequired: SERVICE_CATEGORIES[0].title,
          projectDescription: "",
        });
        setFieldErrors({});
        return;
      }

      if (response.status === 503 && data.status === "not_configured") {
        setFeedback({
          status: "unconfigured",
          message:
            data.message ||
            "Your enquiry passed validation cleanly, but server delivery environment variables are not configured yet.",
        });
        return;
      }

      setFeedback({
        status: "error",
        message:
          data.message ||
          "We could not submit your enquiry right now. Please check inputs and retry.",
      });
    } catch {
      setFeedback({
        status: "error",
        message:
          "Network error while sending enquiry. Please check connection and retry.",
      });
    }
  }

  const scopeOptions = [
    ...SERVICE_CATEGORIES.map((s) => s.title),
    "Multiple Services / Full Digital Partner",
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="border-t border-white/12 bg-[#100B18]/45 py-20 text-[#F5F1FA] sm:py-28"
    >
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left editorial headline & configured direct contact details */}
          <div className="space-y-8 lg:col-span-5">
            <div>
              <h2
                id="contact-heading"
                className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-[#F5F1FA]"
              >
                Let&apos;s build something{" "}
                <span className="font-serif font-normal italic text-[#FF9FFC]">
                  better
                </span>{" "}
                for your business.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[#C7BDD5]">
                Tell us what you&apos;re looking for. We&apos;ll help you
                figure out the right next step.
              </p>
            </div>

            {(hasEmail || whatsAppUrl || configuredSocials.length > 0) && (
              <div className="space-y-4 border-t border-white/12 pt-6 text-sm">
                {hasEmail && (
                  <div className="flex items-center gap-3">
                    <Mail
                      className="h-4 w-4 shrink-0 text-[#B497CF]"
                      aria-hidden="true"
                    />
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="wg-link-underline text-[#F5F1FA] hover:text-[#FF9FFC]"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                )}

                {whatsAppUrl && (
                  <div className="flex items-center gap-3">
                    <MessageSquare
                      className="h-4 w-4 shrink-0 text-[#B497CF]"
                      aria-hidden="true"
                    />
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wg-link-underline text-[#F5F1FA] hover:text-[#FF9FFC]"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                )}

                {configuredSocials.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-1">
                    {configuredSocials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wg-link-underline text-xs font-medium text-[#B497CF] hover:text-[#FF9FFC]"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            <p className="text-xs text-[#91869F]">
              Available {SITE_CONFIG.contact.businessHours}
            </p>
          </div>

          {/* Right minimal accessible enquiry form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-7 lg:col-span-7"
          >
            <div>
              <span className="block text-sm font-medium text-[#F5F1FA]">
                What do you need help with?
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {scopeOptions.map((option) => {
                  const selected = formState.serviceRequired === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setFormState((prev) => ({
                          ...prev,
                          serviceRequired: option,
                        }))
                      }
                      aria-pressed={selected}
                      className={`min-h-[40px] rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                        selected
                          ? "border-[#A78BFA] bg-[#5227FF] text-[#F5F1FA]"
                          : "border-white/15 bg-white/5 text-[#C7BDD5] hover:border-white/30 hover:text-[#F5F1FA]"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {fieldErrors.serviceRequired && (
                <p className="mt-2 text-xs text-[#FF9FFC]">
                  {fieldErrors.serviceRequired}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="wg-contact-name"
                  className="block text-sm font-medium text-[#C7BDD5]"
                >
                  Your name
                </label>
                <input
                  id="wg-contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Alex Morgan"
                  className="wg-underline-field mt-1.5 w-full py-3 text-base text-[#F5F1FA] placeholder:text-[#91869F]"
                />
                {fieldErrors.name && (
                  <p className="mt-1.5 text-xs text-[#FF9FFC]">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="wg-contact-business"
                  className="block text-sm font-medium text-[#C7BDD5]"
                >
                  Business name
                </label>
                <input
                  id="wg-contact-business"
                  name="businessName"
                  type="text"
                  autoComplete="organization"
                  value={formState.businessName}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      businessName: e.target.value,
                    }))
                  }
                  placeholder="Northside Bakery & Cafe"
                  className="wg-underline-field mt-1.5 w-full py-3 text-base text-[#F5F1FA] placeholder:text-[#91869F]"
                />
                {fieldErrors.businessName && (
                  <p className="mt-1.5 text-xs text-[#FF9FFC]">
                    {fieldErrors.businessName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="wg-contact-email"
                  className="block text-sm font-medium text-[#C7BDD5]"
                >
                  Email address
                </label>
                <input
                  id="wg-contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="you@yourbusiness.com"
                  className="wg-underline-field mt-1.5 w-full py-3 text-base text-[#F5F1FA] placeholder:text-[#91869F]"
                />
                {fieldErrors.email && (
                  <p className="mt-1.5 text-xs text-[#FF9FFC]">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="wg-contact-phone"
                  className="block text-sm font-medium text-[#C7BDD5]"
                >
                  Phone or WhatsApp
                </label>
                <input
                  id="wg-contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+91 98765 43210"
                  className="wg-underline-field mt-1.5 w-full py-3 text-base text-[#F5F1FA] placeholder:text-[#91869F]"
                />
                {fieldErrors.phone && (
                  <p className="mt-1.5 text-xs text-[#FF9FFC]">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="wg-contact-description"
                className="block text-sm font-medium text-[#C7BDD5]"
              >
                Short message
              </label>
              <textarea
                id="wg-contact-description"
                name="projectDescription"
                rows={3}
                value={formState.projectDescription}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    projectDescription: e.target.value,
                  }))
                }
                placeholder="Tell us a little about what your business needs next..."
                className="wg-underline-field mt-1.5 w-full resize-y py-3 text-base text-[#F5F1FA] placeholder:text-[#91869F]"
              />
              {fieldErrors.projectDescription && (
                <p className="mt-1.5 text-xs text-[#FF9FFC]">
                  {fieldErrors.projectDescription}
                </p>
              )}
            </div>

            {feedback.status !== "idle" && (
              <div
                role="status"
                aria-live="polite"
                className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
                  feedback.status === "delivered"
                    ? "border-[#A78BFA]/40 bg-[#5227FF]/20 text-[#F5F1FA]"
                    : feedback.status === "unconfigured"
                    ? "border-[#FF9FFC]/40 bg-[#171027]/80 text-[#F5F1FA]"
                    : feedback.status === "submitting"
                    ? "border-white/15 bg-[#171027]/60 text-[#C7BDD5]"
                    : "border-[#FF9FFC]/50 bg-[#241542]/80 text-[#FF9FFC]"
                }`}
              >
                {feedback.status === "delivered" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A78BFA]" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF9FFC]" />
                )}
                <p>{feedback.message}</p>
              </div>
            )}

            <div className="pt-2">
              <MagneticButton>
                <button
                  type="submit"
                  data-cursor="SEND"
                  disabled={feedback.status === "submitting"}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#5227FF] px-8 py-3 font-sans text-xs font-semibold text-[#F5F1FA] transition-colors hover:bg-[#FF9FFC] hover:text-[#100B18] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {feedback.status === "submitting"
                    ? "Sending..."
                    : "Send Enquiry"}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
