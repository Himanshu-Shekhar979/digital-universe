import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // Honeypot spam check
    if (honeypot) {
      return NextResponse.json(
        { error: "Spam detected." },
        { status: 400 },
      );
    }

    // Input Validation
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Please provide a valid name between 2 and 100 characters." },
        { status: 400 },
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10 || message.length > 3000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 3000 characters." },
        { status: 400 },
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // Check if email transport credentials are configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "himanshu80021@gmail.com";

    // Build fallback mailto link
    const mailtoSubject = encodeURIComponent(`Portfolio Inquiry from ${cleanName}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    );
    const fallbackMailto = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    if (resendApiKey) {
      // Direct live delivery via Resend API
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <contact@resend.dev>",
            to: recipientEmail,
            reply_to: cleanEmail,
            subject: `Portfolio Transmission from ${cleanName}`,
            text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
          }),
        });

        if (res.ok) {
          return NextResponse.json({
            success: true,
            delivered: true,
            message: "Transmission delivered directly to Himanshu Shekhar's inbox.",
          });
        }
      } catch (err) {
        console.error("Failed sending email via Resend:", err);
      }
    }

    // Explicit truthfully unconfigured state
    // Log submission to server console for local inspection
    console.info("[Contact Submission Received]", {
      name: cleanName,
      email: cleanEmail,
      length: cleanMessage.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: false,
      delivered: false,
      code: "TRANSPORT_NOT_CONFIGURED",
      message:
        "Input validated. Server email transport is not configured on this host. Use the direct dispatch button below to send your drafted inquiry.",
      mailto: fallbackMailto,
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your transmission." },
      { status: 500 },
    );
  }
}

