import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Sanity webhook handler — triggers on-demand revalidation.
 *
 * Set this as a webhook URL in Sanity → Settings → API → Webhooks:
 *   POST https://yoursite.com/api/revalidate
 *   Secret: same value as SANITY_REVALIDATE_SECRET in .env
 *   Trigger on: Create, Update, Delete
 *   Filter: _type in ["artwork", "blogPost", "category"]
 */
export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get("x-sanity-webhook-secret");

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body = await request.json();
    const type = body?._type;

    // Revalidate affected routes based on content type
    switch (type) {
      case "artwork":
        revalidatePath("/");
        revalidatePath("/gallery");
        revalidatePath("/shop");
        revalidatePath(`/shop/${body?.slug?.current}`);
        break;
      case "blogPost":
        revalidatePath("/");
        revalidatePath("/blog");
        revalidatePath(`/blog/${body?.slug?.current}`);
        break;
      case "category":
        revalidatePath("/gallery");
        revalidatePath("/shop");
        break;
      default:
        // Revalidate everything for unknown types
        revalidatePath("/");
    }

    return NextResponse.json({
      revalidated: true,
      type,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
