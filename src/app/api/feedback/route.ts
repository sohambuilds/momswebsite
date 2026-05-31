import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { writeClient, isSanityConfigured } from "@/lib/sanity/client";

// ─── Validation ────────────────────────────────────────────

const feedbackSchema = z.object({
  name: z.string().optional().default(""),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  medium: z.string().optional().default(""),
  pieceTitle: z.string().optional().default(""),
  message: z
    .string()
    .min(10, "Please share at least a sentence. Short feedback isn't useful."),
});

// ─── Handler ───────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = feedbackSchema.parse(body);

    // 1. Save to Sanity if configured (silently no-op if there's no schema yet
    //    — Sanity will reject unknown _type, so we wrap in try/catch).
    if (isSanityConfigured()) {
      try {
        await writeClient.create({
          _type: "feedback",
          name: data.name || "Anonymous",
          email: data.email || "",
          medium: data.medium,
          pieceTitle: data.pieceTitle,
          message: data.message,
          submittedAt: new Date().toISOString(),
          status: "new",
        });
      } catch (e) {
        // Sanity schema may not include `feedback` yet — log and continue
        // so email delivery still works.
        console.warn("[feedback] Sanity write failed, continuing:", e);
      }
    }

    // 2. Email Suhrita (and ack the sender if they gave an email)
    const resendKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (resendKey && resendKey !== "your_resend_api_key" && notificationEmail) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Clay Corner <onboarding@resend.dev>",
        to: [notificationEmail],
        subject: `Honest feedback from ${data.name || "Anonymous"}`,
        html: buildFeedbackHtml(data),
      });

      if (data.email) {
        await resend.emails.send({
          from: "Clay Corner <onboarding@resend.dev>",
          to: [data.email],
          subject: "Thank you for the honest note — Clay Corner",
          html: buildAckHtml(data.name || ""),
        });
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    console.error("Feedback API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");
}

function buildFeedbackHtml(data: z.infer<typeof feedbackSchema>): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a130d;">
      <h1 style="color: #b85a3a; font-size: 22px;">Honest feedback</h1>
      <hr style="border: 1px solid #e6d6ba;" />
      <table style="width: 100%; border-collapse: collapse; margin: 18px 0;">
        <tr><td style="padding: 6px 0; color: #6b5a4a; width: 130px;">From</td><td>${escape(data.name || "Anonymous")}</td></tr>
        ${data.email ? `<tr><td style="padding: 6px 0; color: #6b5a4a;">Email</td><td>${escape(data.email)}</td></tr>` : ""}
        <tr><td style="padding: 6px 0; color: #6b5a4a;">About</td><td>${escape(data.medium || "Not specified")}</td></tr>
        ${data.pieceTitle ? `<tr><td style="padding: 6px 0; color: #6b5a4a;">Piece</td><td>${escape(data.pieceTitle)}</td></tr>` : ""}
      </table>
      <div style="background: #f8f1e6; padding: 18px; border-left: 3px solid #d97757; font-style: italic; line-height: 1.6;">
        ${escape(data.message)}
      </div>
      <p style="color: #6b5a4a; font-size: 12px; margin-top: 18px;">
        Submitted on ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
      </p>
    </div>
  `;
}

function buildAckHtml(name: string): string {
  const greeting = name ? `Thank you, ${escape(name)}` : "Thank you";
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a130d;">
      <h1 style="color: #b85a3a; font-size: 22px;">${greeting}</h1>
      <p style="line-height: 1.7; color: #3a2e24;">
        Your note has reached Suhrita. She reads every one. The harder ones twice.
        If you left an email, she may write back; otherwise, know that it landed.
      </p>
      <hr style="border: 1px solid #e6d6ba; margin: 22px 0;" />
      <p style="color: #6b5a4a; font-size: 12px;">
        — Clay Corner, Lake Town, Kolkata
      </p>
    </div>
  `;
}
