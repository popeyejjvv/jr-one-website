import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, zip, message, page } = body;

    // ── Validate required fields ──
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });

    // ── 1. Send email notification ──
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"JR One Website" <${process.env.GMAIL_USER}>`,
        to: "info@jronegutters.com",
        subject: `New Web Lead: ${name} — ${service || "General"} — ${zip || "N/A"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1B2A4A; border-bottom: 3px solid #C8952E; padding-bottom: 10px;">
              New Lead from jronegutters.com
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Name:</td><td style="padding: 8px;">${name}</td></tr>
              <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Phone:</td><td style="padding: 8px;"><a href="tel:${phone}">${phone}</a></td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email || "Not provided"}</a></td></tr>
              <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Service:</td><td style="padding: 8px;">${service || "Not specified"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">ZIP:</td><td style="padding: 8px;">${zip || "Not provided"}</td></tr>
              <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Message:</td><td style="padding: 8px;">${message || "None"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Page:</td><td style="padding: 8px;">${page || "Unknown"}</td></tr>
              <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Time:</td><td style="padding: 8px;">${timestamp}</td></tr>
            </table>
            <p style="margin-top: 20px; color: #6B7280; font-size: 13px;">
              This lead was submitted via jronegutters.com. Respond within 5 minutes for best conversion.
            </p>
          </div>
        `,
      });
      console.log("✓ Email notification sent");
    } catch (emailErr) {
      console.error("✗ Email notification failed:", emailErr.message);
      // Don't fail the whole request if email fails
    }

    // ── 2. Create lead in Builder Prime ──
    if (process.env.BUILDER_PRIME_API_KEY) {
      try {
        const bpResponse = await fetch(
          "https://api.builderprime.com/v1/leads", // Confirm exact endpoint with BP support
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.BUILDER_PRIME_API_KEY}`,
            },
            body: JSON.stringify({
              contact_name: name,
              phone: phone,
              email: email || "",
              lead_source: "Website",
              lead_type: service || "General Inquiry",
              address_zip: zip || "",
              notes: `Submitted from: ${page || "website"}\nMessage: ${message || "None"}\nTimestamp: ${timestamp}`,
              status: "New",
            }),
          }
        );

        if (bpResponse.ok) {
          console.log("✓ Builder Prime lead created");
        } else {
          console.error("✗ Builder Prime error:", await bpResponse.text());
        }
      } catch (bpErr) {
        console.error("✗ Builder Prime failed:", bpErr.message);
      }
    }

    return NextResponse.json({ success: true, message: "Lead received" });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
