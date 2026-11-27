import { NextResponse } from "next/server";

interface ContactRequestBody {
  name?: string;
  businessName?: string;
  email?: string;
  phone?: string;
  serviceRequired?: string;
  projectDescription?: string;
}

/** Validates contact form payloads server-side and forwards enquiries via configured webhook or Resend API. */
export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  const name = (body.name || "").trim();
  const businessName = (body.businessName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const serviceRequired = (body.serviceRequired || "").trim();
  const projectDescription = (body.projectDescription || "").trim();

  // Enforce clean server-side validation regardless of client validation.
  if (
    name.length < 2 ||
    !businessName ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    phone.replace(/[^\d+]/g, "").length < 7 ||
    !serviceRequired ||
    projectDescription.length < 15
  ) {
    return NextResponse.json(
      {
        status: "error",
        message: "Please complete all required enquiry fields accurately.",
      },
      { status: 400 }
    );
  }

  const submittedAt = new Date().toISOString();
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail =
    process.env.CONTACT_FROM_EMAIL || "Web Guru Contact <onboarding@resend.dev>";

  // Option 1: Forward validated payload to a configured webhook (Slack, Formspree, Make, Zapier, custom API).
  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "web-guru-portfolio",
          submittedAt,
          name,
          businessName,
          email,
          phone,
          serviceRequired,
          projectDescription,
        }),
      });

      if (!webhookResponse.ok) {
        return NextResponse.json(
          {
            status: "error",
            message:
              "Enquiry delivery endpoint returned an error. Please try again later.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        status: "delivered",
        message: "Thank you. Your enquiry has been sent to the Web Guru team.",
      });
    } catch {
      return NextResponse.json(
        {
          status: "error",
          message: "Unable to reach the configured enquiry webhook.",
        },
        { status: 502 }
      );
    }
  }

  // Option 2: Forward formatted email via Resend REST API when credentials are configured.
  if (resendApiKey && contactToEmail) {
    try {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: contactFromEmail,
          to: [contactToEmail],
          reply_to: email,
          subject: `[Web Guru Enquiry] ${serviceRequired} — ${businessName}`,
          text: [
            `Submitted: ${submittedAt}`,
            `Name: ${name}`,
            `Business: ${businessName}`,
            `Email: ${email}`,
            `Phone / WhatsApp: ${phone}`,
            `Service Required: ${serviceRequired}`,
            "",
            "Project Description:",
            projectDescription,
          ].join("\n"),
        }),
      });

      if (!resendResponse.ok) {
        return NextResponse.json(
          {
            status: "error",
            message: "Email service rejected the enquiry delivery request.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        status: "delivered",
        message: "Thank you. Your enquiry has been sent to the Web Guru team.",
      });
    } catch {
      return NextResponse.json(
        {
          status: "error",
          message: "Unable to connect to the configured email delivery service.",
        },
        { status: 502 }
      );
    }
  }

  // Honest fallback: never claim an enquiry was delivered if backend delivery isn't configured yet.
  return NextResponse.json(
    {
      status: "not_configured",
      message:
        "Your form inputs are valid, but backend email/webhook delivery is not configured yet on this deployment.",
    },
    { status: 503 }
  );
}
