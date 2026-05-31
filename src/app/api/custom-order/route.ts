import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { writeClient, isSanityConfigured } from "@/lib/sanity/client";

// ─── Validation ────────────────────────────────────────────

const customOrderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  description: z.string().min(10, "Please describe your piece in at least a few words"),
  sizePreference: z.string().optional().default(""),
  budgetRange: z.string().optional().default(""),
  referenceInfo: z.string().optional().default(""),
  howDidYouHear: z.string().optional().default(""),
});

// ─── Handler ───────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = customOrderSchema.parse(body);

    // 1. Save to Sanity (if configured)
    if (isSanityConfigured()) {
      await writeClient.create({
        _type: "customOrder",
        name: data.name,
        email: data.email,
        description: data.description,
        sizePreference: data.sizePreference,
        budgetRange: data.budgetRange,
        referenceInfo: data.referenceInfo,
        howDidYouHear: data.howDidYouHear,
        submittedAt: new Date().toISOString(),
        status: "new",
      });
    }

    // 2. Send email notification (if Resend is configured)
    const resendKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (resendKey && resendKey !== "your_resend_api_key" && notificationEmail) {
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: "Clay Corner <onboarding@resend.dev>",
        to: [notificationEmail],
        subject: `New Custom Order Request from ${data.name}`,
        html: buildEmailHtml(data),
      });

      // Send confirmation to the customer
      await resend.emails.send({
        from: "Clay Corner <onboarding@resend.dev>",
        to: [data.email],
        subject: "Your Custom Order Request — Clay Corner",
        html: buildConfirmationHtml(data.name),
      });
    }

    return NextResponse.json(
      { success: true, message: "Custom order submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error("Custom order API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// ─── Email Templates ───────────────────────────────────────

function buildEmailHtml(data: z.infer<typeof customOrderSchema>): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C2420;">
      <h1 style="color: #C2593A; font-size: 24px;">New Custom Order Request</h1>
      <hr style="border: 1px solid #E2D3BF;" />

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 0; color: #78716C; width: 140px;">Name</td>
          <td style="padding: 8px 0; font-weight: 600;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #78716C;">Email</td>
          <td style="padding: 8px 0;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #78716C;">Description</td>
          <td style="padding: 8px 0;">${data.description}</td>
        </tr>
        ${data.sizePreference ? `<tr><td style="padding: 8px 0; color: #78716C;">Size</td><td style="padding: 8px 0;">${data.sizePreference}</td></tr>` : ""}
        ${data.budgetRange ? `<tr><td style="padding: 8px 0; color: #78716C;">Budget</td><td style="padding: 8px 0;">${data.budgetRange}</td></tr>` : ""}
        ${data.referenceInfo ? `<tr><td style="padding: 8px 0; color: #78716C;">Reference</td><td style="padding: 8px 0;">${data.referenceInfo}</td></tr>` : ""}
        ${data.howDidYouHear ? `<tr><td style="padding: 8px 0; color: #78716C;">Source</td><td style="padding: 8px 0;">${data.howDidYouHear}</td></tr>` : ""}
      </table>

      <hr style="border: 1px solid #E2D3BF;" />
      <p style="color: #78716C; font-size: 13px;">
        Submitted on ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
      </p>
    </div>
  `;
}

function buildConfirmationHtml(name: string): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C2420;">
      <h1 style="color: #C2593A; font-size: 24px;">Thank You, ${name}!</h1>
      <p style="line-height: 1.8; color: #57534E;">
        Your custom order request has been received. Suhrita will review your
        idea and get back to you within 2–3 days.
      </p>
      <p style="line-height: 1.8; color: #57534E;">
        In the meantime, feel free to browse more of her work at
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://claycorner.in"}" style="color: #C2593A;">Clay Corner</a>.
      </p>
      <hr style="border: 1px solid #E2D3BF; margin: 24px 0;" />
      <p style="color: #A8A29E; font-size: 13px;">
        This is an automated message. Please do not reply directly to this email.
      </p>
    </div>
  `;
}
