import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  const productSlug = typeof data.product === "string" ? data.product.trim() : "";
  const product = productSlug ? getProduct(productSlug) : undefined;

  if (
    name.length < 1 ||
    name.length > 120 ||
    !emailPattern.test(email) ||
    email.length > 254 ||
    message.length < 1 ||
    message.length > 5000 ||
    (productSlug && !product)
  ) {
    return NextResponse.json({ error: "Please check the submitted details" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.QUOTATION_TO_EMAIL;
  const sender = process.env.QUOTATION_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    return NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 });
  }

  const text = [
    "A new quotation request was submitted on the VIET ATELIER website.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    ...(product ? [`Product: ${product.name.en} / ${product.name.vi} (${product.slug})`] : []),
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `VIET ATELIER <${sender}>`,
        to: [recipient],
        reply_to: email,
        subject: "New quotation request — VIET ATELIER",
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`Resend rejected a quotation email (HTTP ${response.status})`);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Could not reach Resend to send a quotation email", error);
    return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
