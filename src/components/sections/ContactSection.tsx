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

/** Renders Scene 07 (Closing Contact Atelier) in bold Deep Ink, Signal Orange, Cobalt & Acid Yellow styling while keeping live /api/contact validation intact. */
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
      className="border-t border-ivory/10 bg-[#05091B]/45 py-24 text-ivory sm:py-32"
    >
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14">
        {/* Dramatic cinematic closing banner */}
        <div className="border-b border-ivory/15 pb-12">
          <span className="font-mono text-xs tracking-[0.2em] text-acid/90 uppercase">
            07 · Start Your Project
          </span>
          <HighlighterReveal
            as="h2"
            id="contact-heading"
            lines={[
              "One conversation to bring",
              "your digital presence together.",
            ]}
            barClassName="bg-cobalt"
            className="mt-4 font-display text-4xl leading-[1.0] font-extrabold tracking-[-0.035em] text-ivory uppercase sm:text-6xl lg:text-[4.2rem]"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left direct channel block styled in Electric Cobalt */}
          <div className="space-y-6 lg:col-span-5">
            <div className="border-[3px] border-ivory bg-cobalt p-6 text-ivory shadow-[8px_8px_0px_#E9FF45] sm:p-8">
              <span className="inline-block bg-ink px-2.5 py-1 font-mono text-[10px] font-bold text-acid uppercase">
                Direct Access · Zero Gatekeepers
              </span>
              <p className="mt-4 text-base leading-relaxed sm:text-lg">
                Share what your business wants to fix, launch, or manage. Our
                four-member team replies directly with plain-English scope
                options—no sales handoff or agency runaround.
              </p>

              <div className="mt-6 space-y-4 border-t-2 border-ivory/25 pt-5">
                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-acid"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-[10px] font-bold tracking-[0.1em] text-acid uppercase">
                      Direct Email
                    </p>
                    {SITE_CONFIG.contact.email ? (
                      <a
                        href={`mailto:${SITE_CONFIG.contact.email}`}
                        className="text-sm font-semibold text-ivory underline hover:text-acid"
                      >
                        {SITE_CONFIG.contact.email}
                      </a>
                    ) : (
                      <p className="font-mono text-xs text-ivory/85">
                        {SITE_CONFIG.contact.emailPlaceholder}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare
                    className="mt-0.5 h-4 w-4 shrink-0 text-acid"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-[10px] font-bold tracking-[0.1em] text-acid uppercase">
                      WhatsApp / Phone
                    </p>
                    {whatsAppUrl ? (
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-ivory underline hover:text-acid"
                      >
                        Open WhatsApp Thread
                      </a>
                    ) : (
                      <p className="font-mono text-xs text-ivory/85">
                        {SITE_CONFIG.contact.whatsappDisplayPlaceholder}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 border-ivory bg-ivory p-5 font-mono text-xs text-ink shadow-[6px_6px_0px_#F0522B]">
              <span className="inline-block bg-ink px-2 py-0.5 font-bold text-acid uppercase">
                Studio Hours
              </span>
              <span className="mt-2 block text-sm font-bold">
                {SITE_CONFIG.contact.businessHours}
              </span>
            </div>
          </div>

          {/* Right brutalist atelier enquiry form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-8 border-[3px] border-ivory bg-ink p-6 shadow-[8px_8px_0px_#3155F5] sm:p-8 lg:col-span-7"
          >
            {/* Scope selector rectangular buttons */}
            <div>
              <span className="block font-mono text-[11px] font-bold tracking-[0.12em] text-acid uppercase">
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
                      className={`border-2 px-3.5 py-2 font-mono text-[11px] font-bold uppercase transition-colors ${
                        selected
                          ? "border-ink bg-acid text-ink shadow-[3px_3px_0px_#F0522B]"
                          : "border-ivory/35 bg-ink text-ivory/85 hover:border-acid hover:text-acid"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {fieldErrors.serviceRequired && (
                <p className="mt-2 font-mono text-xs font-bold text-acid">
                  {fieldErrors.serviceRequired}
                </p>
              )}
            </div>

            {/* Underline fields row 1 */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="wg-contact-name"
                  className="block font-mono text-[11px] font-bold tracking-[0.12em] text-ivory/80 uppercase"
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
                  className="wg-underline-field mt-2 w-full py-3 text-base text-ivory placeholder:text-ivory/35"
                />
                {fieldErrors.name && (
                  <p className="mt-1.5 font-mono text-xs font-bold text-acid">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="wg-contact-business"
                  className="block font-mono text-[11px] font-bold tracking-[0.12em] text-ivory/80 uppercase"
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
                  className="wg-underline-field mt-2 w-full py-3 text-base text-ivory placeholder:text-ivory/35"
                />
                {fieldErrors.businessName && (
                  <p className="mt-1.5 font-mono text-xs font-bold text-acid">
                    {fieldErrors.businessName}
                  </p>
                )}
              </div>
            </div>

            {/* Underline fields row 2 */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="wg-contact-email"
                  className="block font-mono text-[11px] font-bold tracking-[0.12em] text-ivory/80 uppercase"
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
                  className="wg-underline-field mt-2 w-full py-3 text-base text-ivory placeholder:text-ivory/35"
                />
                {fieldErrors.email && (
                  <p className="mt-1.5 font-mono text-xs font-bold text-acid">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="wg-contact-phone"
                  className="block font-mono text-[11px] font-bold tracking-[0.12em] text-ivory/80 uppercase"
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
                  className="wg-underline-field mt-2 w-full py-3 text-base text-ivory placeholder:text-ivory/35"
                />
                {fieldErrors.phone && (
                  <p className="mt-1.5 font-mono text-xs font-bold text-acid">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Underline textarea */}
            <div>
              <label
                htmlFor="wg-contact-description"
                className="block font-mono text-[11px] font-bold tracking-[0.12em] text-ivory/80 uppercase"
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
                className="wg-underline-field mt-2 w-full resize-y py-3 text-base text-ivory placeholder:text-ivory/35"
              />
              {fieldErrors.projectDescription && (
                <p className="mt-1.5 font-mono text-xs font-bold text-acid">
                  {fieldErrors.projectDescription}
                </p>
              )}
            </div>

            {/* Submission feedback status box */}
            {feedback.status !== "idle" && (
              <div
                role="status"
                aria-live="polite"
                className={`flex items-start gap-3 border-2 p-4 text-sm font-medium ${
                  feedback.status === "delivered"
                    ? "border-acid bg-cobalt text-ivory"
                    : feedback.status === "unconfigured"
                    ? "border-acid bg-ink text-acid"
                    : feedback.status === "submitting"
                    ? "border-ivory/40 bg-ink text-ivory/80"
                    : "border-orange bg-orange text-ivory"
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

            <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-ivory/25 pt-6">
              <p className="font-mono text-[11px] text-ivory/65">
                Protected validation · Direct delivery via{" "}
                <code>/api/contact</code>
              </p>

              <MagneticButton>
                <button
                  type="submit"
                  data-cursor="SEND"
                  disabled={feedback.status === "submitting"}
                  className="wg-brutal-btn inline-flex items-center gap-2 border-2 border-ivory bg-acid px-7 py-3.5 font-mono text-xs font-extrabold tracking-[0.08em] text-ink uppercase shadow-[5px_5px_0px_#F0522B] hover:bg-orange hover:text-ivory disabled:cursor-not-allowed disabled:opacity-60"
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
