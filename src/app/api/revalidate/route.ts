import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();

  // Verify the request came from our configured Prismic webhook
  if (
    !process.env.PRISMIC_WEBHOOK_SECRET ||
    body.secret !== process.env.PRISMIC_WEBHOOK_SECRET
  ) {
    return NextResponse.json(
      { message: "Invalid webhook secret" },
      { status: 401 },
    );
  }

  if (body.type !== "api-update") {
    return NextResponse.json(
      { message: "Invalid webhook event" },
      { status: 400 },
    );
  }

  // Invalidate cached Prismic content
  revalidateTag("prismic");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  });
}
