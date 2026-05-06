import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        // 2026-04-11: swapped from claude-sonnet-4 → claude-haiku-4-5 after
        // the API credit blowout. Contact form only needs lead routing,
        // not creative writing, Haiku is ~15x cheaper for identical function.
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: body.system || "",
        messages: body.messages || [],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Claude API error:", err);
      return NextResponse.json(
        { error: "AI service error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Claude proxy error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
