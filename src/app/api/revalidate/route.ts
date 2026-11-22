import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Verify Prismic webhook secret
    if (
      !process.env.PRISMIC_WEBHOOK_SECRET ||
      body.secret !== process.env.PRISMIC_WEBHOOK_SECRET
    ) {
      return NextResponse.json(
        { message: "Invalid webhook secret" },
        { status: 401 },
      );
    }

    // Handle Prismic's connection test
    if (body.type === "test-trigger") {
      return NextResponse.json({
        success: true,
        message: "Prismic webhook connection successful",
      });
    }

    // Handle actual content updates
    if (body.type === "api-update") {
      revalidateTag("prismic");

      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
      });
    }

    return NextResponse.json(
      { message: "Unknown webhook event" },
      { status: 400 },
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid webhook payload" },
      { status: 400 },
    );
  }
}
