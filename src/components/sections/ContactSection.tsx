"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertCircle, ArrowUpRight, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { HighlighterReveal } from "@/components/motion/KineticTypography";
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

/** Renders Scene 07 (Closing Contact Atelier) with selectable scope pills, Noomo underline fields, and honest /api/contact submission handling. */
export function ContactSection({ initialService = "" }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { setActiveSceneIndex } = useCinemaEngine();
  const whatsAppUrl = getWhatsAppUrl();

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

  /** Validates every contact input client-side before sending the request. */
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

  /** Posts validated enquiry data to /api/contact and updates explicit status feedback. */
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
      className="bg-ink py-20 text-paper sm:py-28 xl:pl-11"
    >
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        {/* Dramatic Scene 07 closing banner */}
        <div className="border-b border-paper/15 pb-12">
          <span className="font-mono text-xs tracking-[0.14em] text-amber uppercase">
            [07] · Start Your Project
          </span>
          <HighlighterReveal
            as="h2"
            id="contact-heading"
            lines={[
              "One conversation to bring",
              "your digital presence together.",
            ]}
            barClassName="bg-accent"
            className="mt-3 font-display text-4xl leading-[1.03] font-bold tracking-[-0.035em] text-paper sm:text-6xl lg:text-[4.2rem]"
          />
        </div>

        {/* Two-column editorial underline atelier form */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left direct channel panel */}
          <div className="space-y-7 lg:col-span-5">
            <p className="text-base leading-relaxed text-paper/80 sm:text-lg">
              Share what your business wants to fix, launch, or manage. Our
              four-member team replies directly with plain-English scope
              options—no sales handoff or agency runaround.
            </p>

            <div className="space-y-4 border-t border-paper/15 pt-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] text-paper/55 uppercase">
                    Direct Email
                  </p>
                  {SITE_CONFIG.contact.email ? (
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-sm font-medium text-paper hover:text-amber"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  ) : (
                    <p className="text-xs text-paper/65">
                      {SITE_CONFIG.contact.emailPlaceholder}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] text-paper/55 uppercase">
                    WhatsApp / Phone
                  </p>
                  {whatsAppUrl ? (
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-paper hover:text-amber"
                    >
                      Open WhatsApp Thread
                    </a>
                  ) : (
                    <p className="text-xs text-paper/65">
                      {SITE_CONFIG.contact.whatsappDisplayPlaceholder}
                    </p>
                  )}
                </div>
              </div>

              <div className="border border-paper/15 bg-pine/50 p-4 font-mono text-[11px] text-paper/80">
                <span className="block text-amber uppercase">
                  Studio Availability
                </span>
                <span className="mt-1 block">{SITE_CONFIG.contact.businessHours}</span>
              </div>
            </div>
          </div>

          {/* Right Noomo-inspired underline contact form & clickable scope pills */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-8 lg:col-span-7"
          >
            {/* Scope selector pills (replaces generic budget pills cleanly) */}
            <div>
              <span className="block font-mono text-[11px] tracking-[0.12em] text-paper/65 uppercase">
                01 / Select Primary Need *
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
                      className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                        selected
                          ? "border-accent bg-accent text-paper"
                          : "border-paper/20 bg-paper/[0.04] text-paper/75 hover:border-paper/55 hover:text-paper"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {fieldErrors.serviceRequired && (
                <p className="mt-2 font-mono text-xs text-amber">
                  {fieldErrors.serviceRequired}
                </p>
              )}
            </div>

            {/* Underline inputs row 1 */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="wg-contact-name"
                  className="block font-mono text-[11px] tracking-[0.12em] text-paper/65 uppercase"
                >
                  02 / Your Name *
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
                  className="wg-underline-field mt-2 w-full py-3 text-base text-paper placeholder:text-paper/35"
                />
                {fieldErrors.name && (
                  <p className="mt-1.5 font-mono text-xs text-amber">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="wg-contact-business"
                  className="block font-mono text-[11px] tracking-[0.12em] text-paper/65 uppercase"
                >
                  03 / Business or Company *
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
                  className="wg-underline-field mt-2 w-full py-3 text-base text-paper placeholder:text-paper/35"
                />
                {fieldErrors.businessName && (
                  <p className="mt-1.5 font-mono text-xs text-amber">
                    {fieldErrors.businessName}
                  </p>
                )}
              </div>
            </div>

            {/* Underline inputs row 2 */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="wg-contact-email"
                  className="block font-mono text-[11px] tracking-[0.12em] text-paper/65 uppercase"
                >
                  04 / Your Email *
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
                  className="wg-underline-field mt-2 w-full py-3 text-base text-paper placeholder:text-paper/35"
                />
                {fieldErrors.email && (
                  <p className="mt-1.5 font-mono text-xs text-amber">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="wg-contact-phone"
                  className="block font-mono text-[11px] tracking-[0.12em] text-paper/65 uppercase"
                >
                  05 / Phone or WhatsApp *
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
                  placeholder="+1 555 234 5678"
                  className="wg-underline-field mt-2 w-full py-3 text-base text-paper placeholder:text-paper/35"
                />
                {fieldErrors.phone && (
                  <p className="mt-1.5 font-mono text-xs text-amber">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Underline textarea */}
            <div>
              <label
                htmlFor="wg-contact-description"
                className="block font-mono text-[11px] tracking-[0.12em] text-paper/65 uppercase"
              >
                06 / Project Brief *
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
                placeholder="Tell us about your current online presence, website goals, local visibility challenges, or app needs..."
                className="wg-underline-field mt-2 w-full resize-y py-3 text-base text-paper placeholder:text-paper/35"
              />
              {fieldErrors.projectDescription && (
                <p className="mt-1.5 font-mono text-xs text-amber">
                  {fieldErrors.projectDescription}
                </p>
              )}
            </div>

            {/* Submission feedback status box */}
            {feedback.status !== "idle" && (
              <div
                role="status"
                aria-live="polite"
                className={`flex items-start gap-3 border p-4 text-sm ${
                  feedback.status === "delivered"
                    ? "border-emerald-400/50 bg-emerald-950/50 text-emerald-100"
                    : feedback.status === "unconfigured"
                    ? "border-amber/50 bg-amber/10 text-amber"
                    : feedback.status === "submitting"
                    ? "border-paper/20 bg-paper/5 text-paper/80"
                    : "border-accent bg-accent/15 text-paper"
                }`}
              >
                {feedback.status === "delivered" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <p>{feedback.message}</p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6">
              <p className="font-mono text-[11px] text-paper/55">
                Protected validation · Direct delivery via{" "}
                <code>/api/contact</code>
              </p>

              <MagneticButton>
                <button
                  type="submit"
                  data-cursor="SEND"
                  disabled={feedback.status === "submitting"}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold tracking-[0.04em] text-paper uppercase transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
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
